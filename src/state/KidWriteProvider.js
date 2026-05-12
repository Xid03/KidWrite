import React, { createContext, useContext, useMemo, useState } from 'react';

const KidWriteContext = createContext(null);

export function KidWriteProvider({ children }) {
  const [screen, setScreen] = useState('splash');
  const [coins, setCoins] = useState(1250);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [lessonScore, setLessonScore] = useState(0.68);
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [letterCase, setLetterCase] = useState('upper');
  const [letterProgress, setLetterProgress] = useState({
    'upper:A': 2,
    'upper:B': 1,
    'upper:C': 2,
    'upper:D': 3,
    'lower:a': 1
  });

  const completeLetter = (letter, mode = letterCase, stars = 3) => {
    const displayLetter = mode === 'lower' ? letter.toLowerCase() : letter.toUpperCase();
    setLetterProgress((value) => ({
      ...value,
      [`${mode}:${displayLetter}`]: Math.max(value[`${mode}:${displayLetter}`] || 0, stars)
    }));
  };

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
      setLessonScore,
      selectedLetter,
      setSelectedLetter,
      letterCase,
      setLetterCase,
      letterProgress,
      setLetterProgress,
      completeLetter
    }),
    [screen, coins, soundEnabled, selectedAvatar, lessonScore, selectedLetter, letterCase, letterProgress]
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
