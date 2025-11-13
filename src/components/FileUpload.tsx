import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { uploadMultipleDocuments } from '../services/api';
import type { FileUploadResult } from '../types';

interface FileUploadProps {
  onUploadSuccess: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<FileUploadResult[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
    setUploadResults([]);
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadResults([]);

    try {
      const response = await uploadMultipleDocuments(selectedFiles);
      setUploadResults(response.results);
      
      if (response.successful_uploads > 0) {
        onUploadSuccess();
      }
    } catch (error: any) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  });

  const totalSuccess = uploadResults.filter((r) => r.success).length;
  const totalFailed = uploadResults.filter((r) => !r.success).length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Back to Chat Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Chat</span>
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
          <p className="text-gray-600">
            Upload Word documents to add them to your knowledge base. You can then ask questions about them.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} disabled={uploading} />
          
          <div className="flex flex-col items-center gap-4">
            {uploading ? (
              <>
                <Upload className="w-16 h-16 text-blue-500 animate-pulse" />
                <p className="text-lg font-semibold text-gray-700">Uploading {selectedFiles.length} files...</p>
              </>
            ) : (
              <>
                <FileText className="w-16 h-16 text-gray-400" />
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {isDragActive ? 'Drop files here' : 'Upload Word Documents'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Drag & drop multiple files or click to select (.docx, .doc, max 10MB each)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">
                Selected Files ({selectedFiles.length})
              </h3>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}`}
              </button>
            </div>

            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  {!uploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Results */}
        {uploadResults.length > 0 && (
          <div className="mt-6">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-700">Upload Results</h3>
              <p className="text-sm text-gray-500">
                {totalSuccess} successful, {totalFailed} failed
              </p>
            </div>

            <div className="space-y-2">
              {uploadResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg flex items-start gap-3 ${
                    result.success ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                      {result.filename}
                    </p>
                    {result.success ? (
                      <p className="text-xs text-green-600 mt-1">
                        ✅ Processed successfully ({result.chunks_count} chunks)
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 mt-1">
                        ❌ {result.error || 'Upload failed'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {totalSuccess > 0 && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedFiles([]);
                    setUploadResults([]);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Upload More Files
                </button>
                <Link
                  to="/"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Go to Chat
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};