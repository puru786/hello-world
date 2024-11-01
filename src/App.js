// App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [pods, setPods] = useState(null); // Changed to null to indicate no data yet
  const [error, setError] = useState(null);

  // Fetch pods from Kubernetes API
  const fetchPods = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/pods'); // Use relative URL if proxy is set
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setPods(data); // Store the entire JSON response
    } catch (err) {
      setError(err.message);
    }
  };

  // Use effect to call fetchPods on component mount
  useEffect(() => {
    fetchPods();
  }, []);

  return (
    <div className="App">
      <h1>Hello World - Pods List</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {pods && pods.items ? (
        <ul>
          {pods.items.map((pod) => (
            <li key={pod.metadata.name}>
              <strong>Pod Name:</strong> {pod.metadata.name} <br />
              <strong>Namespace:</strong> {pod.metadata.namespace} <br />
              <strong>Status:</strong> {pod.status.phase}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading pods...</p>
      )}
    </div>
  );
}

export default App;