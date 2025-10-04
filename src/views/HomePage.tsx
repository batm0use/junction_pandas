import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Junction Pandas
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A modern web application built with React, TypeScript, and TailwindCSS.
            Features an integrated LLM service for intelligent interactions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/chat"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 text-center"
            >
              Start Chatting
            </Link>
            <Link
              to="/about"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-lg transition duration-200 text-center"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚛️</div>
              <h3 className="font-semibold text-gray-800 mb-2">React + TypeScript</h3>
              <p className="text-sm text-gray-600">Type-safe component development</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold text-gray-800 mb-2">TailwindCSS</h3>
              <p className="text-sm text-gray-600">Utility-first styling</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-800 mb-2">LLM Integration</h3>
              <p className="text-sm text-gray-600">AI-powered features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
