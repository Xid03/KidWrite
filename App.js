import React from 'react';
import { KidWriteProvider } from './src/state/KidWriteProvider';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <KidWriteProvider>
      <AppNavigator />
    </KidWriteProvider>
  );
}
