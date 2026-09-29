import './SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster shimmer" />
      <div className="skeleton-line shimmer" style={{ width: '80%', marginTop: 10 }} />
      <div className="skeleton-line shimmer" style={{ width: '50%', marginTop: 6 }} />
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
