import React from 'react';
import type { Source } from '../types';
import { FileText } from 'lucide-react';

interface SourceCardProps {
  source: Source;
  index: number;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, index }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-left">
      <div className="flex items-start gap-2">
        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-700">
              Source {index + 1}
            </span>
            <span className="text-xs text-gray-500">
              Score: {(source.score * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-3">{source.content}</p>
          <p className="text-xs text-gray-400 mt-1">
            Chunk {source.chunk_index}
          </p>
        </div>
      </div>
    </div>
  );
};