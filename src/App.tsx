import  { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ChatInterface } from './components/ChatInterface';
import {  Upload as UploadIcon, MessageSquare } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'chat'>('upload');
  const [hasUploadedDocs, setHasUploadedDocs] = useState(false);

  const handleUploadSuccess = () => {
    setHasUploadedDocs(true);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            {/* <BookOpen className="w-8 h-8 text-blue-600" /> */}
            <img src="logo.png" alt="CBU logo" className='w-20 h-20'/>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Markaziy bank</h1>
              <p className="text-sm text-gray-600">Local Copilot</p>
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
        <p>Markaziy bank Local Copilot v1.0.0</p>
      </footer>
    </div>
  );
}

export default App;