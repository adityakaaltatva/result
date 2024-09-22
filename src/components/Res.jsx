/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'totalScore', direction: 'descending' });

  const fetchEvaluations = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://result-510q.onrender.com/api/evaluations');
      setEvaluations(response.data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error fetching evaluations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const sortedEvaluations = React.useMemo(() => {
    let sortableItems = [...evaluations];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [evaluations, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-6">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Teams Evaluation Portal</h1>
        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-yellow-100 border border-gray-200 rounded-lg">
              <thead className="bg-blue-100">
                <tr>
                  <th
                    className="py-2 px-4 border-b text-left text-blue-600 cursor-pointer"
                    onClick={() => requestSort('_id')}
                  >
                    Team Name
                  </th>
                  <th
                    className="py-2 px-4 border-b text-left text-blue-600 cursor-pointer"
                    onClick={() => requestSort('totalScore')}
                  >
                    Total Score
                  </th>
                  <th
                    className="py-2 px-4 border-b text-left text-blue-600 cursor-pointer"
                    onClick={() => requestSort('numberOfEvaluations')}
                  >
                    Evaluations
                  </th>
                  <th className="py-2 px-4 border-b text-left text-blue-600">Evaluators</th>
                </tr>
              </thead>
              <tbody>
                {sortedEvaluations.map((evaluation, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="py-2 px-4 border-b">{evaluation._id}</td>
                    <td className="py-2 px-4 border-b">{evaluation.totalScore}</td>
                    <td className="py-2 px-4 border-b">{evaluation.numberOfEvaluations}</td>
                    <td className="py-2 px-4 border-b">
                      {evaluation.evaluators.map((evaluator, i) => (
                        <div key={i} className="text-gray-700">
                          {evaluator.username}: {evaluator.scores.join(', ')}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-sm text-gray-600">
              Tap a header to sort by that column.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
