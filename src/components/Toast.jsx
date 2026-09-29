import { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import './Toast.css';

export default function Toast() {
  const { toast } = useWatchlist();
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === 'info' ? <Info size={16} /> : <CheckCircle size={16} />}
      <span>{toast.msg}</span>
    </div>
  );
}
