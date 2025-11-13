import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import { ChatInterface } from './components/ChatInterface';
import { FileUpload } from './components/FileUpload';
import { BookOpen, MessageSquare, Upload as UploadIcon } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RAG Word Service</h1>
                <p className="text-sm text-gray-600">Ask questions about your documents</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-2">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Chat
              </Link>
              <Link
                to="/upload"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === '/upload'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <UploadIcon className="w-5 h-5" />
                Upload
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-600 text-sm">
        <p>RAG Word Service v1.0.0 • Powered by OpenAI & Qdrant</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/upload" element={<FileUpload onUploadSuccess={() => {}} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;