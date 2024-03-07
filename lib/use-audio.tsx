import React, { createContext, useContext, useState, useEffect, FC } from 'react';

// 定义 Context 中的值的类型
interface AudioContextType {
  playing: boolean;
  toggle: () => void;
  setUrl: (url: string) => void;
}

// 创建带有初始值的 Context
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// 定义使用 Audio Player 的 Hook
export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioProvider');
  }
  return context;
};

// AudioProvider 组件的 Props 类型
interface AudioProviderProps {
  children: React.ReactNode;
}

// AudioProvider 组件
export const AudioProvider: FC<AudioProviderProps> = ({ children }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (audio) {
      playing ? audio.play().catch((e) => console.error(e)) : audio.pause();
    }
  }, [playing, audio]);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (!audio) return;

    const handlePause = () => setPlaying(false);
    const handlePlay = () => setPlaying(true);

    window.addEventListener('blur', handlePause);
    window.addEventListener('focus', handlePlay);

    audio.addEventListener('ended', () => setPlaying(false));

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('blur', handlePause);
      window.removeEventListener('focus', handlePlay);
      if (audio) audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  const setUrl = (url: string) => {
    if (!audio) {
      const _ = new Audio(url);
      _.loop = true;
      setAudio(_);
    }
  };

  return (
    <AudioContext.Provider value={{ playing, toggle, setUrl }}>{children}</AudioContext.Provider>
  );
};
