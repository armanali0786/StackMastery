import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchWithAuth } from '../api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import React from 'react';

// Session key for guest data: "guest_tracker_dsa", etc.
const guestKey = (subject: string) => `guest_tracker_${subject}`;

function showLoginNudge() {
  toast(
    (t) =>
      React.createElement(
        'div',
        { className: 'flex flex-col gap-1' },
        React.createElement(
          'span',
          { className: 'text-sm font-semibold text-slate-100' },
          '👋 You\'re in guest mode'
        ),
        React.createElement(
          'span',
          { className: 'text-xs text-slate-400' },
          'Progress is temporary. Login to save permanently.'
        ),
        React.createElement(
          'a',
          {
            href: '/login',
            onClick: () => toast.dismiss(t.id),
            className: 'mt-2 text-xs font-mono font-bold text-emerald-400 underline underline-offset-2 hover:text-emerald-300',
          },
          'Login to save your progress →'
        )
      ),
    {
      id: 'guest-nudge', // Prevent duplicate toasts
      duration: 5000,
      style: {
        background: '#16161f',
        color: '#f8fafc',
        border: '1px solid #1e293b',
      },
    }
  );
}

function loadGuestData(subject: string) {
  try {
    const raw = sessionStorage.getItem(guestKey(subject));
    if (!raw) return { states: {}, favs: {}, notes: {}, globalNote: '' };
    return JSON.parse(raw);
  } catch {
    return { states: {}, favs: {}, notes: {}, globalNote: '' };
  }
}

function saveGuestData(
  subject: string,
  data: { states: any; favs: any; notes: any; globalNote: string }
) {
  try {
    sessionStorage.setItem(guestKey(subject), JSON.stringify(data));
  } catch {}
}

function clearGuestData(subject: string) {
  try {
    sessionStorage.removeItem(guestKey(subject));
  } catch {}
}

export function useTrackerData<S = any, F = any, N = any>(subject: string) {
  const { user, loading: authLoading } = useAuth();
  const isGuest = !user;

  const [state, setState] = useState<S>({} as S);
  const [favs, setFavs] = useState<F>({} as F);
  const [notes, setNotes] = useState<N>({} as N);
  const [globalNote, setGlobalNote] = useState('');
  const [loading, setLoading] = useState(true);

  const isInitialMount = useRef(true);
  const nudgeShown = useRef(false);

  // Trigger guest nudge (once per page visit)
  const triggerGuestNudge = useCallback(() => {
    if (isGuest && !nudgeShown.current) {
      nudgeShown.current = true;
      showLoginNudge();
    }
  }, [isGuest]);

  // Intent-specific action functions with toast feedback
  const markState = useCallback((key: string, value: string) => {
    if (isGuest) {
      triggerGuestNudge();
    } else {
      if (value === 'done') toast.success('✅ Marked as Done!', { duration: 1500 });
      else if (value === 'review') toast('🔁 Added to Review.', { duration: 1500, icon: '📌' });
      else toast('↩ Unmarked.', { duration: 1000 });
    }
    setState((prev: any) => ({ ...prev, [key]: value }));
  }, [isGuest, triggerGuestNudge]);

  const toggleFavMark = useCallback((key: string) => {
    const next = !(favs as any)[key];

    if (isGuest) {
      triggerGuestNudge();
    } else {
      if (next) toast('⭐ Added to Favourites!', { duration: 1500, icon: '❤️' });
      else toast('💔 Removed from Favourites.', { duration: 1200 });
    }
    setFavs((prev: any) => ({ ...prev, [key]: next }));
  }, [isGuest, triggerGuestNudge, favs]);

  // Manual trigger to sync notes only onBlur
  const syncNotes = useCallback(() => {
    if (isGuest) return;
    
    // Although the general sync handles state and favs, we'll send the entire object here
    // to ensure notes are saved exactly when requested.
    fetchWithAuth(`/api/tracker/${subject}`, {
      method: 'PUT',
      body: JSON.stringify({ states: state, favs, notes, globalNote }),
    }).then(() => {
       toast.success('📝 Notes saved!', { duration: 1500 });
    }).catch((err) => {
      console.error('Failed to save notes', err);
      toast.error('Failed to save notes. Check your connection.');
    });
  }, [isGuest, subject, state, favs, notes, globalNote]);

  // Load data based on auth state
  useEffect(() => {
    if (authLoading) return; // Wait for auth to resolve

    if (isGuest) {
      // Guest: load from sessionStorage
      const saved = loadGuestData(subject);
      setState(saved.states || {});
      setFavs(saved.favs || {});
      setNotes(saved.notes || {});
      setGlobalNote(saved.globalNote || '');
      setLoading(false);
    } else {
      // Logged-in: load from API
      const loadData = async () => {
        try {
          const res = await fetchWithAuth(`/api/tracker/${subject}`);
          if (res.ok) {
            const data = await res.json();
            if (data.tracker) {
              setState(data.tracker.states || {});
              setFavs(data.tracker.favs || {});
              setNotes(data.tracker.notes || {});
              setGlobalNote(data.tracker.globalNote || '');
            }
          }
        } catch (err) {
          console.error(`Failed to load ${subject} tracker state`, err);
          toast.error('Failed to load your progress.');
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }

    isInitialMount.current = true; // Reset on auth change
  }, [subject, isGuest, authLoading]);

  // Sync data based on auth state - OPTIMIZED: only state and favs are synced automatically
  useEffect(() => {
    if (loading) return;
    if (authLoading) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isGuest) {
      // Guest: persist to sessionStorage immediately (including notes)
      saveGuestData(subject, { states: state, favs, notes, globalNote });
    } else {
      // Logged-in: debounced API sync for state and favs only
      // Notes are handled via syncNotes() manually
      const handler = setTimeout(() => {
        fetchWithAuth(`/api/tracker/${subject}`, {
          method: 'PUT',
          body: JSON.stringify({ states: state, favs, notes, globalNote }),
        }).catch((err) => {
          console.error('Failed to sync to API', err);
        });
      }, 1000);

      return () => clearTimeout(handler);
    }
  }, [state, favs, subject, loading, isGuest, authLoading]);

  // Clear guest data on tab close
  useEffect(() => {
    if (!isGuest) return;

    const handleUnload = () => clearGuestData(subject);
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [isGuest, subject]);

  return {
    state,
    setState, // kept for raw updates (like typing in textarea)
    favs,
    setFavs,
    notes,
    setNotes,
    globalNote,
    setGlobalNote,
    markState,      // helper with toasts
    toggleFavMark,  // helper with toasts
    syncNotes,      // manual sync for notes
    loading: authLoading || loading,
    isGuest,
  };
}
