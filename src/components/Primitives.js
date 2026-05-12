import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import { colors, font, gradients, radius, shadow } from '../theme';
import { useFloatAnimation } from '../hooks/useFloatAnimation';

export function KidText({ children, style, variant = 'body', ...props }) {
  return (
    <Text {...props} style={[styles.text, styles[variant], style]}>
      {children}
    </Text>
  );
}

export function ScreenScaffold({ children, bottomInset = true, scroll = true, style, backgroundSource, showDecor = true }) {
  const { width } = useWindowDimensions();
  const content = (
    <View style={[styles.screenInner, width >= 900 && styles.screenInnerWide, style]}>{children}</View>
  );
  return (
    <LinearGradient colors={['#F9FBFF', '#EAF6FF', '#F6EFFF']} style={styles.screen}>
      {backgroundSource ? (
        <ImageBackground source={backgroundSource} resizeMode="cover" style={StyleSheet.absoluteFill} />
      ) : null}
      {showDecor ? <FloatingDecor /> : null}
      {scroll ? (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, bottomInset && { paddingBottom: 104 }]}
        >
          {content}
        </Animated.ScrollView>
      ) : (
        content
      )}
    </LinearGradient>
  );
}

export function FloatingDecor() {
  const lift = useFloatAnimation(12, 2300);
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <Animated.View
          key={item}
          style={[
            styles.decor,
            {
              left: `${8 + item * 16}%`,
              top: `${8 + (item % 3) * 24}%`,
              transform: [{ translateY: lift }, { rotate: `${item * 18}deg` }]
            }
          ]}
        >
          <Feather name={item % 2 ? 'star' : 'cloud'} size={item % 2 ? 18 : 26} color={item % 2 ? '#FFD84D' : '#FFFFFF'} />
        </Animated.View>
      ))}
    </View>
  );
}

export function GlassCard({ children, style, colors: cardColors = gradients.paper, accessibilityLabel }) {
  return (
    <LinearGradient colors={cardColors} style={[styles.glass, style]} accessibilityLabel={accessibilityLabel}>
      {children}
    </LinearGradient>
  );
}

export function PrimaryButton({ title, icon, onPress, style, variant = 'green', accessibilityLabel }) {
  const scale = useRef(new Animated.Value(1)).current;
  const palette = variant === 'purple' ? ['#8E62FF', '#5638EA'] : variant === 'yellow' ? ['#FFE66D', '#FFB833'] : ['#48DF64', '#19B842'];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      onPress={onPress}
      onPressIn={() => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start()}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>
        <LinearGradient colors={palette} style={styles.primaryButton}>
          {icon ? <Feather name={icon} size={20} color={variant === 'yellow' ? colors.ink : colors.white} /> : null}
          <KidText variant="button" style={variant === 'yellow' && { color: colors.ink }}>
            {title}
          </KidText>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export function IconCircle({ icon, onPress, active, label, color = colors.purple }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.iconCircle, active && { backgroundColor: color }]}>
      <Feather name={icon} size={22} color={active ? colors.white : color} />
    </Pressable>
  );
}

export function MascotImage({ style }) {
  const lift = useFloatAnimation(14, 2100);
  return (
    <Animated.Image
      source={require('../../assets/mascot-pencil.png')}
      resizeMode="contain"
      style={[styles.mascot, { transform: [{ translateY: lift }] }, style]}
      accessibilityLabel="KidWrite child mascot riding a pencil"
    />
  );
}

export function ProgressBar({ value = 0.5, color = colors.green, style }) {
  return (
    <View style={[styles.progressTrack, style]} accessibilityRole="progressbar" accessibilityValue={{ now: Math.round(value * 100), min: 0, max: 100 }}>
      <View style={[styles.progressFill, { width: `${Math.max(4, Math.min(100, value * 100))}%`, backgroundColor: color }]} />
    </View>
  );
}

export function StarRow({ count = 3, earned = 2, size = 30 }) {
  return (
    <View style={styles.starRow}>
      {Array.from({ length: count }).map((_, index) => (
        <Feather
          key={index}
          name="star"
          size={size}
          color={index < earned ? colors.yellow : '#B8C4DD'}
          fill={index < earned ? colors.yellow : 'transparent'}
        />
      ))}
    </View>
  );
}

export function HeaderBar({ title, onBack, rightIcon = 'volume-2', onRight }) {
  return (
    <View style={styles.header}>
      <IconCircle icon="arrow-left" onPress={onBack} label="Go back" color={colors.purple} />
      <KidText variant="section" style={styles.headerTitle}>{title}</KidText>
      <IconCircle icon={rightIcon} onPress={onRight} label={rightIcon} color={colors.purple} />
    </View>
  );
}

export function Confetti({ active = true }) {
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1300, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1300, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [active, pulse]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {Array.from({ length: 18 }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.confetti,
            {
              backgroundColor: [colors.yellow, colors.pink, colors.sky, colors.green, colors.orange][index % 5],
              left: `${5 + ((index * 19) % 88)}%`,
              top: `${5 + ((index * 23) % 70)}%`,
              transform: [
                {
                  translateY: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 18 + (index % 4) * 6]
                  })
                },
                { rotate: `${index * 27}deg` }
              ],
              opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.9] })
            }
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  scrollContent: {
    minHeight: '100%'
  },
  screenInner: {
    width: '100%',
    maxWidth: 1060,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.select({ web: 28, default: 54 }),
    gap: 18
  },
  screenInnerWide: {
    paddingHorizontal: 28
  },
  text: {
    color: colors.ink,
    fontFamily: font.regular,
    letterSpacing: 0
  },
  hero: {
    fontSize: 43,
    lineHeight: 47,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: font.rounded
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    fontFamily: font.rounded
  },
  section: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
    fontFamily: font.rounded
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700'
  },
  caption: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
    fontWeight: '700'
  },
  button: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 16
  },
  glass: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardStroke,
    padding: 18,
    overflow: 'hidden',
    ...shadow
  },
  primaryButton: {
    minHeight: 56,
    minWidth: 148,
    borderRadius: radius.pill,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 9,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.65)',
    ...shadow
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(114,87,255,0.18)',
    ...shadow
  },
  mascot: {
    width: '100%',
    height: 240
  },
  progressTrack: {
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: '#DDE8FF',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center'
  },
  decor: {
    position: 'absolute',
    opacity: 0.4
  },
  confetti: {
    position: 'absolute',
    width: 10,
    height: 15,
    borderRadius: 4
  }
});
