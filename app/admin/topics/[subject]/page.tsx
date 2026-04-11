"use client";

import { use, useState, useEffect } from 'react';
import { useTopicContent } from '../../../../lib/hooks/useTopicContent';
import toast from 'react-hot-toast';

export default function AdminTopicPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = use(params);
  const { topicData, loading, saveContent } = useTopicContent(subject);
  
  const [jsonText, setJsonText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (topicData) {
      setJsonText(JSON.stringify(topicData, null, 2));
    } else if (!loading && !topicData) {
      // Empty template
      setJsonText(JSON.stringify([
        {
          month: 'Month 1',
          theme: 'BASICS',
          topics: [
            {
              label: 'Introduction',
              problems: [
                {
                  name: 'Sample Problem',
                  links: [{ l: 'Web', u: 'https://example.com', t: 'web' }],
                  tags: ['concept']
                }
              ]
            }
          ]
        }
      ], null, 2));
    }
  }, [topicData, loading]);

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('Root must result in an array of months.');
      }
      setIsSaving(true);
      await saveContent(parsed);
      setIsSaving(false);
    } catch (e: any) {
      toast.error(`Invalid JSON: ${e.message}`);
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading topic data...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight capitalize">
            {subject.replace('-', ' ')} Curriculum Editor
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Edit the JSON structure of months, topics, and problems. Be careful to maintain the schema.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Curriculum'}
        </button>
      </div>

      <div className="bg-[#16161f] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">topic_data.json</span>
        </div>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full h-[600px] bg-transparent text-emerald-400 font-mono text-sm p-4 focus:outline-none resize-y"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
