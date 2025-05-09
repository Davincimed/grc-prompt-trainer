import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  const [role, setRole] = useState('');
  const [scenario, setScenario] = useState('');
  const [response, setResponse] = useState('');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (count >= 3) {
      setResponse("You've reached your free simulation limit. Visit www.grcprompt.com to unlock full access.");
      return;
    }
    setLoading(true);
    const res = await axios.post('/api/gpt', { role, scenario });
    setResponse(res.data.reply);
    setCount(count + 1);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>GRC Prompt Trainer</title>
      </Head>
      <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
        <img src="/logo.png" alt="GRC Prompt" className="h-16 mb-4" />
        <h1 className="text-2xl font-bold text-blue-900 mb-2">GRC Prompt Trainer</h1>
        <p className="text-sm text-gray-600 mb-6">Smart Prompts for Smarter Compliance</p>

        <div className="w-full max-w-md space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter your role (ISSO, Assessor, etc.)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter your scenario type (POA&M, Audit, etc.)"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />
          <button
            className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Simulating...' : 'Start Simulation'}
          </button>
        </div>

        <div className="mt-6 w-full max-w-2xl">
          <pre className="bg-white p-4 border rounded text-sm whitespace-pre-wrap">
            {response}
          </pre>
        </div>
      </main>
    </>
  );
}
