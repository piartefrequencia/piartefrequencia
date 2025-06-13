import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaStop, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Player = () => {
  const playlist = [
    { nome: 'Isaac Rodrigues', arquivo: '/Assets/audio/Isaac_Rodrigues.mp3' },
    { nome: 'Cisne Branco', arquivo: '/Assets/audio/Cisne_Branco.mp3' },
    { nome: 'The Avengers', arquivo: '/Assets/audio/The_Avengers.mp3' },
    { nome: 'Canção da Infantaria', arquivo: '/Assets/audio/Cancao_da_Infantaria.mp3' },
    { nome: 'Suite Nordestina', arquivo: '/Assets/audio/Suite_Nordestina.mp3' },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio.src) {
      audio.src = playlist[currentTrack].arquivo;
    }
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const pararAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const proximaMusica = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };

  const musicaAnterior = () => {
    const prevTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prevTrack);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.src = playlist[currentTrack].arquivo;
      audio.play();
    }
// eslint-disable-next-line
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.muted = muted;
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);

  return (
    <div className="Player">
      <audio ref={audioRef} onEnded={proximaMusica} />

      {/* 🎵 Texto com nome da música */}
      <div className="track-info">
        <span>{playlist[currentTrack].nome}</span>
        {isPlaying && <div className="playing-animation"><div></div><div></div><div></div></div>}
      </div>

      <button onClick={musicaAnterior} title="Anterior"><FaBackward /></button>
      <button onClick={togglePlayPause} title="Play/Pause">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={proximaMusica} title="Próxima"><FaForward /></button>
      <button onClick={toggleMute} title="Mute">
        {muted ? <FaVolumeMute style={{ color: 'red' }} /> : <FaVolumeUp />}
      </button>
      <button onClick={pararAudio} title="Parar"><FaStop /></button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        title="Volume"
      />
    </div>
  );
};

export default Player;


