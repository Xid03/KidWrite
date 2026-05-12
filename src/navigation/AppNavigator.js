import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { bottomTabs } from '../data/content';
import { colors, radius, shadow } from '../theme';
import { KidText } from '../components/Primitives';
import { useKidWrite } from '../state/KidWriteProvider';
import {
  CategoryScreen,
  GameScreen,
  HomeScreen,
  LetterTracingScreen,
  NumberTracingScreen,
  OnboardingScreen,
  ParentDashboardScreen,
  ProfileScreen,
  ProgressScreen,
  RewardsScreen,
  SplashScreen,
  WordTracingScreen
} from '../screens/KidWriteScreens';

const routeMap = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  home: HomeScreen,
  category: CategoryScreen,
  letterTrace: LetterTracingScreen,
  numberTrace: NumberTracingScreen,
  wordTrace: WordTracingScreen,
  game: GameScreen,
  rewards: RewardsScreen,
  progress: ProgressScreen,
  profile: ProfileScreen,
  parent: ParentDashboardScreen
};

const routesWithTabs = new Set(['home', 'progress', 'rewards', 'profile']);

export function AppNavigator() {
  const { screen, setScreen } = useKidWrite();
  const opacity = useRef(new Animated.Value(1)).current;
  const Screen = routeMap[screen] || HomeScreen;

  useEffect(() => {
    opacity.setValue(0);
    Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: false }).start();
  }, [opacity, screen]);

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.content, { opacity }]}>
        <Screen go={setScreen} />
      </Animated.View>
      {routesWithTabs.has(screen) ? <BottomTabs active={screen} setScreen={setScreen} /> : null}
    </View>
  );
}

function BottomTabs({ active, setScreen }) {
  return (
    <View style={styles.tabShell} pointerEvents="box-none">
      <View style={styles.tabWrap} accessibilityRole="tablist">
        {bottomTabs.map((tab) => {
          const selected = active === tab.key;
          return (
            <Pressable key={tab.key} accessibilityRole="tab" accessibilityState={{ selected }} onPress={() => setScreen(tab.key)} style={styles.tabButton}>
              <Feather name={tab.icon} size={23} color={selected ? colors.purple : '#A7ADC1'} />
              <KidText variant="caption" style={[styles.tabLabel, selected && styles.tabLabelActive]}>{tab.label}</KidText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cloud
  },
  content: {
    flex: 1
  },
  tabShell: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: 'center'
  },
  tabWrap: {
    width: '92%',
    maxWidth: 620,
    minHeight: 72,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(255,255,255,0.93)',
    borderWidth: 1,
    borderColor: 'rgba(114,87,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    ...shadow
  },
  tabButton: {
    minWidth: 64,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  tabLabel: {
    fontSize: 10,
    color: '#8C93AB'
  },
  tabLabelActive: {
    color: colors.purple
  }
});
