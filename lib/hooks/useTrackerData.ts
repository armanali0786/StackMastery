import { useState, useEffect, useRef } from 'react';
import { fetchWithAuth } from '../api';
import toast from 'react-hot-toast';

export function useTrackerData<S = any, F = any, N = any>(subject: string) {
  const [state, setState] = useState<S>({} as S);
  const [favs, setFavs] = useState<F>({} as F);
  const [notes, setNotes] = useState<N>({} as N);
  const [globalNote, setGlobalNote] = useState("");
  const [loading, setLoading] = useState(true);

  const isInitialMount = useRef(true);

  // Load from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchWithAuth(`/api/tracker/${subject}`);
        if (res.ok) {
          const data = await res.json();
          if (data.tracker) {
            setState(data.tracker.states || {});
            setFavs(data.tracker.favs || {});
            setNotes(data.tracker.notes || {});
            setGlobalNote(data.tracker.globalNote || "");
          }
        }
      } catch (err) {
        console.error(`Failed to load ${subject} tracker state`, err);
        toast.error("Failed to load your progress.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [subject]);

  // Sync back to API with debounce
  useEffect(() => {
    if (isInitialMount.current) {
      if (!loading) {
        isInitialMount.current = false;
      }
      return;
    }

    const handler = setTimeout(() => {
      fetchWithAuth(`/api/tracker/${subject}`, {
        method: 'PUT',
        body: JSON.stringify({ states: state, favs, notes, globalNote }),
      }).catch(err => {
        console.error('Failed to sync to API', err);
        toast.error("Connection lost. Progress not saved!");
      });
    }, 1000);

    return () => clearTimeout(handler);
  }, [state, favs, notes, globalNote, subject, loading]);

  return {
    state, setState,
    favs, setFavs,
    notes, setNotes,
    globalNote, setGlobalNote,
    loading,
  };
}
