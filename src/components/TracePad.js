import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export function TracePad({ children, strokeColor = '#FF5B57', onComplete, resetKey, minPointsToComplete = 28 }) {
  const [paths, setPaths] = useState([]);
  const [sparklePoint, setSparklePoint] = useState(null);
  const current = useRef([]);
  const pointCount = useRef(0);

  useEffect(() => {
    current.current = [];
    pointCount.current = 0;
    setPaths([]);
    setSparklePoint(null);
  }, [resetKey]);

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          current.current = [`M${locationX.toFixed(1)} ${locationY.toFixed(1)}`];
          pointCount.current += 1;
          setSparklePoint({ x: locationX, y: locationY });
          setPaths((prev) => [...prev, current.current.join(' ')]);
        },
        onPanResponderMove: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          current.current.push(`L${locationX.toFixed(1)} ${locationY.toFixed(1)}`);
          pointCount.current += 1;
          setSparklePoint({ x: locationX, y: locationY });
          setPaths((prev) => [...prev.slice(0, -1), current.current.join(' ')]);
        },
        onPanResponderRelease: () => {
          setSparklePoint(null);
          if (pointCount.current >= minPointsToComplete) {
            onComplete?.();
          }
        }
      }),
    [minPointsToComplete, onComplete]
  );

  return (
    <View style={styles.pad} {...responder.panHandlers}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>{children}</View>
      <Svg pointerEvents="none" width="100%" height="100%" style={StyleSheet.absoluteFill}>
        {paths.map((path, index) => (
          <Path key={`${index}-${path.length}`} d={path} stroke={strokeColor} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.86} />
        ))}
        {sparklePoint ? (
          <>
            <Path d={`M${sparklePoint.x - 16} ${sparklePoint.y}L${sparklePoint.x + 16} ${sparklePoint.y}M${sparklePoint.x} ${sparklePoint.y - 16}L${sparklePoint.x} ${sparklePoint.y + 16}`} stroke="#FFD84D" strokeWidth={4} strokeLinecap="round" opacity={0.9} />
            <Path d={`M${sparklePoint.x - 10} ${sparklePoint.y - 10}L${sparklePoint.x + 10} ${sparklePoint.y + 10}M${sparklePoint.x + 10} ${sparklePoint.y - 10}L${sparklePoint.x - 10} ${sparklePoint.y + 10}`} stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.95} />
          </>
        ) : null}
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
