import ChatInterface from '../components/ChatInterface';

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Chat Interface</h1>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
