import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';

export default function App() {
  const [entered, setEntered] = useState(false);
  return entered ? <Dashboard /> : <Landing onEnter={() => setEntered(true)} />;
}