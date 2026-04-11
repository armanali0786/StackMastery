import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api';
import toast from 'react-hot-toast';

export function useTopicContent(subject: string) {
  const [topicData, setTopicData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetchWithAuth(`/api/topics/${subject}`);
        if (res.ok) {
          const data = await res.json();
          if (data.topic && data.topic.content) {
            setTopicData(data.topic.content);
          }
        }
      } catch (err) {
        console.error(`Failed to load ${subject} curriculum structure`, err);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [subject]);

  const saveContent = async (newContent: any[]) => {
    try {
      const res = await fetchWithAuth(`/api/admin/topics/${subject}`, {
        method: 'PUT',
        body: JSON.stringify({ content: newContent }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setTopicData(newContent);
      toast.success('Curriculum updating successfully!');
      return true;
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to save curriculum');
      return false;
    }
  };

  return {
    topicData,
    loading,
    saveContent
  };
}
