import React, { useState, useMemo } from 'react';

interface StudyMaterial {
  id: number;
  title: string;
  description?: string;
  url: string;
  type: 'documentation' | 'article' | 'video';
}

interface ExamData {
  learningMaterials?: StudyMaterial[];
}

interface StudyMaterialsTabProps {
  exam?: ExamData;
}

export const StudyMaterialsTab: React.FC<StudyMaterialsTabProps> = ({ exam }) => {
  const [filter, setFilter] = useState<string>('all');

  const materials = useMemo(() => {
    return exam?.learningMaterials || [];
  }, [exam]);

  const filteredMaterials = useMemo(() => {
    if (filter === 'all') return materials;
    return materials.filter((m) => m.type === filter);
  }, [materials, filter]);

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      documentation: '📄',
      article: '📝',
      video: '🎥',
    };
    return icons[type.toLowerCase()] || '📚';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      documentation: 'bg-blue-100 text-blue-800',
      article: 'bg-purple-100 text-purple-800',
      video: 'bg-red-100 text-red-800',
    };
    return colors[type.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg font-semibold">No study materials available for this certification yet.</p>
        <p className="text-gray-500 text-sm mt-2">Check back soon for updated resources.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Materials</h2>
        <p className="text-gray-600">Comprehensive learning resources to help you prepare</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Materials
        </button>
        <button
          onClick={() => setFilter('documentation')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'documentation'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📄 Documentation
        </button>
        <button
          onClick={() => setFilter('article')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'article'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📝 Articles
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'video'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎥 Videos
        </button>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-t-4 border-blue-600"
            >
              {/* Type Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(material.type)}`}>
                  {getTypeIcon(material.type)} {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{material.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{material.description || 'No description available'}</p>

              {/* Action Button */}
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                Open Resource <span className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No study materials match your filter.</p>
          <p className="text-gray-500 text-sm mt-2">Try selecting a different category.</p>
        </div>
      )}

      {/* Resources Tips */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <h3 className="font-bold text-yellow-900 mb-2">💡 How to Use Study Materials</h3>
        <ul className="space-y-2 text-yellow-800 text-sm">
          <li>• Start with official documentation to understand core concepts</li>
          <li>• Read articles for practical examples and real-world scenarios</li>
          <li>• Watch video tutorials for visual learning and step-by-step guidance</li>
          <li>• Combine multiple resources for comprehensive understanding</li>
        </ul>
      </div>
    </div>
  );
};
