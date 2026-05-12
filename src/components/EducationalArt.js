import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Polygon, Rect, Stop, Text as SvgText } from 'react-native-svg';

export function AppleArt({ size = 96 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="appleRed" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FF7A6E" />
          <Stop offset="1" stopColor="#E92B31" />
        </LinearGradient>
      </Defs>
      <Ellipse cx="50" cy="86" rx="32" ry="7" fill="#D8C4BE" opacity="0.26" />
      <Path d="M48 25C36 12 18 22 15 43C12 66 27 88 44 82C48 80 52 80 56 82C73 88 88 66 85 43C82 22 64 12 52 25Z" fill="url(#appleRed)" />
      <Path d="M51 27C52 16 57 10 68 9" stroke="#5E3A18" strokeWidth="6" strokeLinecap="round" />
      <Path d="M62 16C74 12 82 19 83 29C72 30 64 26 62 16Z" fill="#43D35F" />
      <Circle cx="35" cy="48" r="6" fill="#FFFFFF" opacity="0.85" />
      <Circle cx="42" cy="53" r="6" fill="#24124D" />
      <Circle cx="67" cy="53" r="6" fill="#24124D" />
      <Circle cx="40" cy="50" r="2" fill="#FFFFFF" />
      <Circle cx="65" cy="50" r="2" fill="#FFFFFF" />
      <Ellipse cx="32" cy="64" rx="7" ry="5" fill="#FF8A99" opacity="0.64" />
      <Ellipse cx="76" cy="64" rx="7" ry="5" fill="#FF8A99" opacity="0.64" />
      <Path d="M47 65C51 72 60 72 64 65" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function CatArt({ size = 130 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Path d="M34 45L23 25L48 37Z" fill="#FF9B33" />
      <Path d="M86 45L97 25L72 37Z" fill="#FF9B33" />
      <Circle cx="60" cy="62" r="38" fill="#FFB13B" />
      <Circle cx="46" cy="59" r="6" fill="#17114F" />
      <Circle cx="74" cy="59" r="6" fill="#17114F" />
      <Circle cx="48" cy="56" r="2" fill="#FFF" />
      <Circle cx="76" cy="56" r="2" fill="#FFF" />
      <Path d="M57 69Q60 73 63 69" stroke="#17114F" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Path d="M43 78Q60 90 77 78" stroke="#17114F" strokeWidth="4" strokeLinecap="round" fill="none" />
      <Ellipse cx="34" cy="68" rx="7" ry="5" fill="#FF7FAF" opacity="0.75" />
      <Ellipse cx="86" cy="68" rx="7" ry="5" fill="#FF7FAF" opacity="0.75" />
      <Path d="M89 80C105 83 107 101 91 103" stroke="#FF9B33" strokeWidth="8" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function DucksArt({ size = 128 }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[0, 1, 2].map((item) => (
        <Svg key={item} width={size / 3} height={size / 3} viewBox="0 0 60 60">
          <Circle cx="30" cy="28" r="18" fill="#FFD84D" />
          <Circle cx="23" cy="24" r="3" fill="#161052" />
          <Path d="M43 29L56 34L43 40Z" fill="#FF8A22" />
          <Path d="M13 43C25 51 38 51 50 43" stroke="#FFB833" strokeWidth="5" strokeLinecap="round" />
        </Svg>
      ))}
    </View>
  );
}

export function TrophyArt({ size = 116 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Path d="M35 28H85V59C85 73 74 84 60 84S35 73 35 59Z" fill="#FFD84D" />
      <Path d="M37 35H20C20 55 27 65 39 66" stroke="#FFB833" strokeWidth="10" strokeLinecap="round" fill="none" />
      <Path d="M83 35H100C100 55 93 65 81 66" stroke="#FFB833" strokeWidth="10" strokeLinecap="round" fill="none" />
      <Rect x="52" y="83" width="16" height="17" rx="5" fill="#FFB833" />
      <Rect x="36" y="98" width="48" height="11" rx="5" fill="#FF9B33" />
      <Path d="M60 39L66 51L80 53L70 63L72 77L60 70L48 77L50 63L40 53L54 51Z" fill="#FFF4A3" />
    </Svg>
  );
}

export function RewardCoin({ size = 116 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Circle cx="60" cy="60" r="46" fill="#FFB833" />
      <Circle cx="60" cy="60" r="36" fill="#FFD84D" />
      <Path d="M60 32L68 51L89 53L73 67L78 88L60 77L42 88L47 67L31 53L52 51Z" fill="#FFF5A8" />
    </Svg>
  );
}

export function LetterTraceArt({ text = 'A', size = 220, accent = '#FF5B57' }) {
  return (
    <Svg width={size} height={size * 0.82} viewBox="0 0 260 210">
      <SvgText x="34" y="170" fontSize="164" fontWeight="900" fill="none" stroke="#C8CBD5" strokeWidth="9" strokeDasharray="12 14">
        {text}
      </SvgText>
      <Path d="M62 170L119 42" stroke={accent} strokeWidth="18" strokeLinecap="round" />
      <Circle cx="122" cy="41" r="11" fill="#7257FF" />
      <SvgText x="117" y="46" fontSize="14" fontWeight="900" fill="#fff">1</SvgText>
      <Polygon points="54,174 68,168 59,158" fill="#151157" opacity="0.7" />
    </Svg>
  );
}

export function NumberTraceArt({ number = '5', size = 220 }) {
  return (
    <Svg width={size} height={size * 0.82} viewBox="0 0 260 210">
      <SvgText x="40" y="170" fontSize="168" fontWeight="900" fill="none" stroke="#BFC2CD" strokeWidth="10" strokeDasharray="12 14">
        {number}
      </SvgText>
      <Path d="M88 45H158M88 45V91M88 91C165 79 177 173 99 166" stroke="#FF5B57" strokeWidth="18" strokeLinecap="round" fill="none" />
      <Circle cx="88" cy="45" r="11" fill="#7257FF" />
      <SvgText x="83" y="50" fontSize="14" fontWeight="900" fill="#fff">1</SvgText>
    </Svg>
  );
}
