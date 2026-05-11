import React, { useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export function TracePad({ children, strokeColor = '#FF5B57', onComplete }) {
  const [paths, setPaths] = useState([]);
  const current = useRef([]);

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          current.current = [`M${locationX.toFixed(1)} ${locationY.toFixed(1)}`];
          setPaths((prev) => [...prev, current.current.join(' ')]);
        },
        onPanResponderMove: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          current.current.push(`L${locationX.toFixed(1)} ${locationY.toFixed(1)}`);
          setPaths((prev) => [...prev.slice(0, -1), current.current.join(' ')]);
        },
        onPanResponderRelease: () => {
          if (paths.length >= 2) {
            onComplete?.();
          }
        }
      }),
    [onComplete, paths.length]
  );

  return (
    <View style={styles.pad} {...responder.panHandlers}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>{children}</View>
      <Svg pointerEvents="none" width="100%" height="100%" style={StyleSheet.absoluteFill}>
        {paths.map((path, index) => (
          <Path key={`${index}-${path.length}`} d={path} stroke={strokeColor} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.86} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: {
    minHeight: 260,
    width: '100%',
    overflow: 'hidden'
  }
});
