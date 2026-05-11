import React, { createContext, useContext, useMemo, useState } from 'react';

const KidWriteContext = createContext(null);

export function KidWriteProvider({ children }) {
  const [screen, setScreen] = useState('splash');
  const [coins, setCoins] = useState(1250);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [lessonScore, setLessonScore] = useState(0.68);

  const value = useMemo(
    () => ({
      screen,
      setScreen,
      coins,
      setCoins,
      soundEnabled,
      setSoundEnabled,
      selectedAvatar,
      setSelectedAvatar,
      lessonScore,
      setLessonScore
    }),
    [screen, coins, soundEnabled, selectedAvatar, lessonScore]
  );

  return <KidWriteContext.Provider value={value}>{children}</KidWriteContext.Provider>;
}

export function useKidWrite() {
  const context = useContext(KidWriteContext);
  if (!context) {
    throw new Error('useKidWrite must be used within KidWriteProvider');
  }
  return context;
}
