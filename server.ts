import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini client
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Route Optimization Endpoint
app.post("/api/ai/optimize-route", async (req, res) => {
  try {
    const { origin, destination, cargoDescription, weightKg, mode, priority } = req.body;
    const ai = getAIClient();

    if (!ai) {
      // Fallback simulation response if API key is not yet set
      return res.json({
        success: true,
        source: "simulated_fallback",
        analysisSummary: `Synthesized logistics corridor assessment for ${weightKg || 10000}kg of "${cargoDescription || 'General Freight'}" from ${origin} to ${destination}.`,
        options: [
          {
            id: "opt-1",
            title: "Option A: Eco-Express Multi-Modal (Rail + Ocean)",
            modeStrategy: "Rail transport to deepwater hub, ocean super-freighter, electric final mile.",
            totalCostUsd: 14200,
            transitTimeHours: 420,
            reliabilityScore: 94,
            co2EmissionsKg: 3100,
            keyWaypoints: [origin, "Port Rail Terminal", "Rotterdam Gateway", destination],
            pros: ["Lowest carbon footprint (-38% CO2)", "Immune to highway congestion delays"],
            cons: ["Slightly longer transit (+2 days vs air)"],
            riskAnalysis: "Low risk. Customs pre-clearance recommended at departure port."
          },
          {
            id: "opt-2",
            title: "Option B: Priority Direct Freight (Air Express)",
            modeStrategy: "Chartered Boeing 777F widebody air freight direct to regional airport.",
            totalCostUsd: 38500,
            transitTimeHours: 36,
            reliabilityScore: 98,
            co2EmissionsKg: 18400,
            keyWaypoints: [origin, "LAX Air Hub", destination],
            pros: ["Ultra-fast 36hr door-to-door delivery", "Strict temperature continuity"],
            cons: ["Higher premium cost", "Higher carbon footprint"],
            riskAnalysis: "Very low risk. Guaranteed berth at express cargo terminal."
          },
          {
            id: "opt-3",
            title: "Option C: Balanced Direct Truckload (FTL Team Drivers)",
            modeStrategy: "Dedicated team driver tandem sleeper truck with non-stop highway rotation.",
            totalCostUsd: 22100,
            transitTimeHours: 84,
            reliabilityScore: 91,
            co2EmissionsKg: 6800,
            keyWaypoints: [origin, "Interstate Highway Corridor", destination],
            pros: ["Direct door-to-door without transfer handling", "Flexible departure scheduling"],
            cons: ["Susceptible to winter pass mountain weather"],
            riskAnalysis: "Moderate risk due to scheduled highway repaving near state borders."
          }
        ]
      });
    }

    const prompt = `You are Nexus AI, an enterprise freight logistics dispatcher and route optimization engine.
Analyze the following freight transport request:
- Origin: ${origin}
- Destination: ${destination}
- Cargo: ${cargoDescription} (${weightKg} kg)
- Preferred Mode: ${mode}
- Optimization Priority: ${priority} (e.g., speed, cost, eco)

Return a structured JSON object with:
1. "analysisSummary": A concise 2-sentence executive summary of the geographical bottlenecks, weather risks, and fuel/tariff realities for this route.
2. "options": An array of exactly 3 distinct dispatch strategy objects. Each object must have:
   - "id": string (e.g. "opt-1", "opt-2", "opt-3")
   - "title": catchy short strategy name (e.g. "Option A: Eco Rail & Ocean Hybrid")
   - "modeStrategy": 1 sentence explaining vehicle/mode handoffs
   - "totalCostUsd": integer estimated realistic cost in USD
   - "transitTimeHours": integer total door-to-door transit time in hours
   - "reliabilityScore": integer between 80 and 99
   - "co2EmissionsKg": integer estimated carbon footprint in kg
   - "keyWaypoints": array of 3 to 4 string location names along the route
   - "pros": array of 2 string bullet points
   - "cons": array of 1 or 2 string bullet points
   - "riskAnalysis": 1 sentence describing customs, weather, or port congestion risk.

Return ONLY valid JSON matching this structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4
      }
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);

    return res.json({
      success: true,
      source: "gemini_live",
      analysisSummary: parsed.analysisSummary,
      options: parsed.options
    });
  } catch (error: any) {
    console.error("AI Optimize Route Error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate route optimization" });
  }
});

// AI Customs & Compliance Trade Advisor
app.post("/api/ai/customs-advisor", async (req, res) => {
  try {
    const { query, cargoDescription, originCountry, destCountry } = req.body;
    const ai = getAIClient();

    if (!ai) {
      return res.json({
        success: true,
        source: "simulated_fallback",
        advisorResponse: `### Customs & Compliance Assessment\n\n**Trade Corridor:** ${originCountry || 'Origin'} ➔ ${destCountry || 'Destination'}\n**Cargo Subject:** ${cargoDescription || 'General Goods'}\n\n#### Key Regulatory Mandates:\n1. **HS Harmonized Code Classification:** Ensure goods are declared under accurate chapter headings (typically Chapter 84/85 for machinery/electronics or Chapter 30 for pharma).\n2. **Documentation Required:** Commercial Invoice (3 copies), Bill of Lading (BOL), Certificate of Origin, and MSDS (Material Safety Data Sheet) if batteries or chemicals are present.\n3. **Tariffs & Duties:** Standard WTO MFN tariff rates apply unless bilateral free trade agreements (FTAs) are leveraged.\n\n*Tip: Attach API Key in AI Studio Settings to enable live, real-time customs tariff lookup via Gemini.*`
      });
    }

    const prompt = `You are Nexus Customs AI, an international trade compliance lawyer and senior licensed customs broker.
Answer the dispatcher's inquiry regarding trade compliance:
Question: "${query}"
Context: Shipping "${cargoDescription}" from ${originCountry} to ${destCountry}.

Provide a clear, highly structured Markdown response including:
- **Harmonized System (HS) Code Recommendations**
- **Mandatory Import/Export Documentation**
- **Potential Tariffs, Quotas, or Sanctions Screening**
- **Hazmat / Cold Chain Special Handling Compliance (if applicable)**

Keep the tone authoritative, practical, and enterprise-grade.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.3
      }
    });

    return res.json({
      success: true,
      source: "gemini_live",
      advisorResponse: response.text
    });
  } catch (error: any) {
    console.error("AI Customs Advisor Error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate customs advice" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Logistics OS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
