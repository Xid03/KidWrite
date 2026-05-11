import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function useFloatAnimation(distance = 10, duration = 1900) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(value, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [duration, value]);

  return value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -distance]
  });
}
