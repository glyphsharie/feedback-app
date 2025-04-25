import React, { useState } from 'react';

// TODO: Avoid using any , improve typing of state and event handlers

function App() {
  const [formData, setFormData] = useState<any>({
    name: '',
    feedback: '',
    score: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (
    e : any
  ) => {
    // TODO: Handle form data for submission
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // TODO: Make a successful request to the server
    try {
      const res = await fetch('http://localhost:3000/api/feedback', {
        method: 'PATCH',
        body: JSON.stringify({
          ...formData,
          score: Number(formData.score)
        })
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || 'Something went wrong');
      } else {
        alert('Feedback submitted!');
        setFormData({ name: '', feedback: '', score: '' });
      }
    } catch (err) {
      setError('Failed to submit feedback');
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Submit Feedback</h1>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name (optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Score
          </label>
          <select
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        {/* TODO: Reset error message if a user begins typing */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


export default App;
