import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Junction Pandas</h1>
          
          <div className="prose prose-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Architecture</h2>
            <p className="text-gray-600 mb-4">
              This application follows the Model-View-Controller (MVC) architectural pattern:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold text-indigo-600 mr-2">Model:</span>
                  <span className="text-gray-600">Data types and structures defined in the types directory</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-indigo-600 mr-2">View:</span>
                  <span className="text-gray-600">React components in views and components directories</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-indigo-600 mr-2">Controller:</span>
                  <span className="text-gray-600">Business logic in the controller directory</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>React 18</strong> - Modern UI library</li>
              <li><strong>TypeScript</strong> - Type-safe JavaScript</li>
              <li><strong>TailwindCSS</strong> - Utility-first CSS framework</li>
              <li><strong>React Router</strong> - Client-side routing</li>
              <li><strong>Vite</strong> - Fast build tool and dev server</li>
              <li><strong>Axios</strong> - HTTP client for API calls</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">External Services</h2>
            <p className="text-gray-600 mb-4">
              The application integrates with external LLM providers (like OpenAI) for AI-powered features.
              Configure your API credentials in the environment variables to enable these features.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
