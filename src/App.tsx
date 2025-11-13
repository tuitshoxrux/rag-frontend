import  { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ChatInterface } from './components/ChatInterface';
import { Login } from './components/Login';
import { useAuth } from './hooks/useAuth';
import { BookOpen, Upload as UploadIcon, MessageSquare, LogOut } from 'lucide-react';

function App() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'upload' | 'chat'>('upload');
  const [hasUploadedDocs, setHasUploadedDocs] = useState(false);

  const handleUploadSuccess = () => {
    setHasUploadedDocs(true);
    setActiveTab('chat');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // Main App (after login)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RAG Word Service</h1>
                <p className="text-sm text-gray-600">Upload documents and ask questions</p>
              </div>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user?.username}</p>
                <p className="text-xs text-gray-500">Logged in</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UploadIcon className="w-5 h-5" />
            Upload
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            disabled={!hasUploadedDocs}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'chat'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            } ${!hasUploadedDocs ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <MessageSquare className="w-5 h-5" />
            Chat
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'upload' ? (
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        ) : (
          <ChatInterface />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-600 text-sm">
        <p>RAG Word Service v1.0.0 • Powered by OpenAI & Qdrant</p>
      </footer>
    </div>
  );
}

export default App;