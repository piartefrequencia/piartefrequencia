import React, { useRef, useState } from 'react';
import '../../styles/styles.css';

function PlayerAudio() {
  const playlist = [
    '/audio/Isaac_Rodrigues.mp3',
    '/audio/Cisne_Branco.mp3',
    '/audio/The_Avengers.mp3',
    '/audio/Cancao_da_Infantaria.mp3',
    '/audio/Suite_Nordestina.mp3',
  ];

  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio.src) {
      audio.src = playlist[currentTrack];
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
    const audio = audioRef.current;
    const next = (currentTrack + 1) % playlist.length;
    setCurrentTrack(next);
    audio.src = playlist[next];
    audio.play();
    setIsPlaying(true);
  };

  const musicaAnterior = () => {
    const audio = audioRef.current;
    const prev = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prev);
    audio.src = playlist[prev];
    audio.play();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const handleVolume = (e) => {
    const audio = audioRef.current;
    audio.volume = e.target.value;
  };

  return (
    <div className="audio-controls">
      <audio ref={audioRef} src=""></audio>

      <button onClick={musicaAnterior}>
        <i className="fas fa-backward"></i>
      </button>

      <button onClick={togglePlayPause}>
        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>

      <button onClick={pararAudio}>
        <i className="fas fa-stop"></i>
      </button>

      <button onClick={proximaMusica}>
        <i className="fas fa-forward"></i>
      </button>

      <button onClick={toggleMute}>
        <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        onInput={handleVolume}
      />
    </div>
  );
}

export default PlayerAudio;


/*function Player() {
  return (
    <div id="music-controls-wrapper">
      <div id="music-controls">
        <button title="Anterior"><i className="fas fa-backward"></i></button>
        <button title="Play/Pause"><i id="playPauseIcon" className="fas fa-play"></i></button>
        <button title="Próxima"><i className="fas fa-forward"></i></button>
        <button title="Mudo"><i id="muteIcon" className="fas fa-volume-up"></i></button>
        <button title="Parar"><i className="fas fa-stop"></i></button>
        <input type="range" id="volumeSlider" min="0" max="1" step="0.01" defaultValue="1" title="Volume" />
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaStop, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Player = () => {
  const playlist = [
    '/Assets/audio/Isaac_Rodrigues.mp3',
    '/Assets/audio/Cisne_Branco.mp3',
    '/Assets/audio/The_Avengers.mp3',
    '/Assets/audio/Cancao_da_Infantaria.mp3',
    '/Assets/audio/Suite_Nordestina.mp3',
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio.src) {
      audio.src = playlist[currentTrack];
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
      audio.src = playlist[currentTrack];
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
    <div className="player">
      <audio ref={audioRef} onEnded={proximaMusica} />
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

export default Player;*/

