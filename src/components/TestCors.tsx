import React, { useEffect, useState } from 'react';

const TestCors: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testCors = async () => {
      try {
        const response = await fetch('api/cottages');

        const contentType = response.headers.get("content-type");
        const textData = await response.text(); // get raw text

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}\n\n${textData}`);
        }

        if (contentType && contentType.includes("application/json")) {
          const jsonData = JSON.parse(textData); // parse manually now
          setData(JSON.stringify(jsonData, null, 2));
        } else {
          throw new Error(`Expected JSON response, got:\n\n${textData}`);
        }
      } catch (err: any) {
        console.error("CORS or API error:", err);
        setError(err.message || "Unknown error");
      }
    };

    testCors();
  }, []);

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-lg font-bold mb-2">CORS Test</h2>
      {error ? (
        <pre className="text-red-500 whitespace-pre-wrap break-words">{error}</pre>
      ) : data ? (
        <pre className="whitespace-pre-wrap break-words">{data}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestCors;
