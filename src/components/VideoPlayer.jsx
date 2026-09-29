import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, SkipForward, SkipBack } from 'lucide-react';
import './VideoPlayer.css';

export default function VideoPlayer({ src, title }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const hideTimer = useRef(null);
  const containerRef = useRef(null);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => { if (playing) setShowControls(false); }, 3000);
  };

  useEffect(() => {
    return () => clearTimeout(hideTimer.current);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setShowControls(true); }
    else { v.play(); resetHideTimer(); }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress(v.currentTime);
    if (v.buffered.length > 0) setBuffered(v.buffered.end(v.buffered.length - 1));
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    v.currentTime = val;
    setProgress(val);
  };

  const onVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  const skip = (sec) => {
    const v = videoRef.current;
    if (v) v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec));
  };

  return (
    <div
      ref={containerRef}
      className={`player-container ${showControls ? 'show-controls' : ''}`}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => { if (playing) setShowControls(false); }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="player-video"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => { setPlaying(false); setShowControls(true); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!playing && (
        <div className="player-big-play">
          <Play size={40} fill="white" />
        </div>
      )}

      <div className="player-controls" onClick={e => e.stopPropagation()}>
        <div className="player-progress-wrap">
          <div className="player-buffered" style={{ width: duration ? `${(buffered / duration) * 100}%` : '0%' }} />
          <input
            type="range" min={0} max={duration || 100} step={0.1}
            value={progress} onChange={onSeek}
            className="player-progress"
          />
        </div>
        <div className="player-bottom">
          <div className="player-left">
            <button onClick={() => skip(-10)} className="ctrl-btn" title="Back 10s"><SkipBack size={18} /></button>
            <button onClick={togglePlay} className="ctrl-btn play-btn">
              {playing ? <Pause size={20} /> : <Play size={20} fill="white" />}
            </button>
            <button onClick={() => skip(10)} className="ctrl-btn" title="Forward 10s"><SkipForward size={18} /></button>
            <div className="volume-wrap">
              <button onClick={toggleMute} className="ctrl-btn">
                {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume} onChange={onVolumeChange} className="volume-slider" />
            </div>
            <span className="player-time">{fmt(progress)} / {fmt(duration)}</span>
          </div>
          <div className="player-right">
            <span className="player-title-label">{title}</span>
            <button className="ctrl-btn" title="Settings"><Settings size={18} /></button>
            <button onClick={toggleFullscreen} className="ctrl-btn">
              {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
