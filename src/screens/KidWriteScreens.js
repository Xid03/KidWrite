import React, { useMemo, useRef, useState } from 'react';
import { Animated, Easing, Image, ImageBackground, Pressable, StyleSheet, Switch, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import * as Speech from 'expo-speech';
import { categories, menuItems, onboarding, parentSummary, progressStats, rewards } from '../data/content';
import { colors, gradients, radius, shadow } from '../theme';
import {
  Confetti,
  GlassCard,
  HeaderBar,
  IconCircle,
  KidText,
  MascotImage,
  PrimaryButton,
  ProgressBar,
  ScreenScaffold,
  StarRow
} from '../components/Primitives';
import { AppleArt, CatArt, DucksArt, LetterTraceArt, NumberTraceArt, RewardCoin, TrophyArt } from '../components/EducationalArt';
import { TracePad } from '../components/TracePad';
import { useKidWrite } from '../state/KidWriteProvider';

function speak(text, soundEnabled = true) {
  if (!soundEnabled) return;
  Speech.stop();
  Speech.speak(text, { language: 'en-US', pitch: 1.2, rate: 0.86 });
}

function useColumns(min = 340) {
  const { width } = useWindowDimensions();
  return Math.max(1, Math.min(3, Math.floor((Math.min(width, 1060) - 36) / min)));
}

function CardButton({ item, onPress }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={item.label || item.title} onPress={onPress} style={styles.pressGrow}>
      <GlassCard colors={item.colors} style={styles.menuCard}>
        <View style={styles.menuIcon}>
          <Feather name={item.icon || 'star'} size={34} color={colors.purple} />
        </View>
        <KidText variant="section" style={styles.center}>{item.label || item.title}</KidText>
        {item.subtitle ? <KidText variant="caption" style={styles.center}>{item.subtitle}</KidText> : null}
      </GlassCard>
    </Pressable>
  );
}

function ObjectGroup({ count = 5 }) {
  return (
    <View style={styles.objectGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <AppleArt key={index} size={52} />
      ))}
    </View>
  );
}

function HomeMenuTile({ item, onPress, scale = 1 }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={item.label} onPress={onPress} style={styles.homeTilePress}>
      <LinearGradient colors={['#FFFFFF', '#F9FBFF']} style={[styles.homeTile, { minHeight: 124 * scale, borderRadius: 18 * scale, gap: 8 * scale }]}>
        <View style={[styles.homeTileIconWrap, { minHeight: 52 * scale, transform: [{ scale }] }]}>
          {item.key === 'letters' ? (
            <View style={styles.abcIcon}>
              <KidText style={[styles.iconLetter, { color: '#16C4C8', left: 5, top: 6, transform: [{ rotate: '-8deg' }] }]}>A</KidText>
              <KidText style={[styles.iconLetterSmall, { color: '#FF5B57' }]}>B</KidText>
              <KidText style={[styles.iconLetter, { color: '#B85BFF', right: 4, top: 2, transform: [{ rotate: '8deg' }] }]}>C</KidText>
            </View>
          ) : item.key === 'numbers' ? (
            <Image source={require('../../assets/home-number-123.png')} resizeMode="contain" style={styles.homeNumberAsset} />
          ) : item.key === 'words' ? (
            <Image source={require('../../assets/home-word-cat.png')} resizeMode="contain" style={styles.homeWordAsset} />
          ) : item.key === 'games' ? (
            <Image source={require('../../assets/home-game-controller.png')} resizeMode="contain" style={styles.homeGameAsset} />
          ) : item.key === 'practice' ? (
            <Image source={require('../../assets/home-practice-pencil.png')} resizeMode="contain" style={styles.homePracticeAsset} />
          ) : (
            <Image source={require('../../assets/home-reward-trophy.png')} resizeMode="contain" style={styles.homeRewardAsset} />
          )}
        </View>
        <KidText style={[styles.homeTileLabel, { fontSize: 14 * scale, lineHeight: 18 * scale }]}>{item.label === 'Rewards' ? 'My Rewards' : item.label}</KidText>
      </LinearGradient>
    </Pressable>
  );
}

export function SplashScreen({ go }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 700 || height >= 1000;
  const isDesktop = width >= 1200;
  const shortSide = Math.min(width, height);
  const logoScale = Math.max(0.82, Math.min(isTablet ? 1.34 : 1.1, shortSide / 430));
  const ctaScale = Math.max(0.78, Math.min(isTablet ? 1.16 : 1, shortSide / 390));
  const logoTop = height < 720 ? 48 : isTablet ? Math.max(72, height * 0.09) : 82;
  const ctaWidth = Math.min(width * (isDesktop ? 0.36 : isTablet ? 0.54 : 0.82), isTablet ? 460 : 390);
  const ctaHover = useRef(new Animated.Value(0)).current;
  const ctaAnimatedStyle = {
    backgroundColor: ctaHover.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFD84D', '#FFE86C']
    }),
    shadowOpacity: ctaHover.interpolate({
      inputRange: [0, 1],
      outputRange: [0.32, 0.54]
    }),
    shadowRadius: ctaHover.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 30]
    }),
    transform: [
      {
        scale: ctaHover.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.045]
        })
      },
      {
        translateY: ctaHover.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -3]
        })
      }
    ]
  };
  const animateCtaHover = (toValue) => {
    Animated.timing(ctaHover, {
      toValue,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
  };

  return (
    <ImageBackground
      source={require('../../assets/splash-fantasy.png')}
      resizeMode="cover"
      imageStyle={styles.splashSceneImage}
      style={styles.splashRoot}
      accessibilityLabel="KidWrite magical learning splash scene with child riding a pencil"
    >
      <View style={[styles.splashShade, { paddingTop: logoTop }]}>
        <View style={styles.musicBubble}>
          <Feather name="music" size={26 * logoScale} color={colors.purple} />
        </View>

        <View style={[styles.logoCluster, { transform: [{ scale: logoScale }] }]}>
          <View style={styles.kidwriteLogo} accessible accessibilityRole="header">
            {'KidWrite'.split('').map((letter, index) => (
              <KidText
                key={`${letter}-${index}`}
                variant="hero"
                style={[
                  styles.logoLetter,
                  { color: ['#FF3DA4', '#FF7D2A', '#FFBB35', '#19AFFF', '#1889F7', '#6852F4', '#8A44F6', '#7C35E8'][index] }
                ]}
              >
                {letter}
              </KidText>
            ))}
          </View>
          <View style={styles.taglineRow}>
            <KidText style={[styles.taglineWord, { color: colors.yellow }]}>Learn.</KidText>
            <KidText style={[styles.taglineWord, { color: colors.white }]}>Trace.</KidText>
            <KidText style={[styles.taglineWord, { color: '#8BEE72' }]}>Grow!</KidText>
          </View>
        </View>

        <View style={styles.splashButtonArea}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start Learning"
            onPress={() => go('onboarding')}
            onHoverIn={() => animateCtaHover(1)}
            onHoverOut={() => animateCtaHover(0)}
            onPressIn={() => animateCtaHover(1)}
            onPressOut={() => animateCtaHover(0)}
            style={[styles.referenceCtaHitArea, { width: ctaWidth }]}
          >
            <Animated.View style={[styles.referenceCta, ctaAnimatedStyle]}>
              <View style={[styles.playDisc, { width: 54 * ctaScale, height: 54 * ctaScale, borderRadius: 27 * ctaScale }]}>
                <Feather name="play" size={30 * ctaScale} color={colors.purpleDark} fill={colors.purpleDark} />
              </View>
              <KidText style={[styles.referenceCtaText, { fontSize: 28 * ctaScale, lineHeight: 34 * ctaScale }]}>Start Learning</KidText>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

export function OnboardingScreen({ go }) {
  const [index, setIndex] = useState(0);
  const { width, height } = useWindowDimensions();
  const slide = onboarding[index];
  const isTablet = width >= 700 || height >= 980;
  const isDesktop = width >= 1180;
  const cardWidth = Math.min(
    Math.max(width * (isDesktop ? 0.38 : isTablet ? 0.62 : 0.84), 260),
    isDesktop ? 620 : isTablet ? 560 : 420
  );
  const cardHeight = Math.min(
    Math.max(height * (isTablet ? 0.78 : 0.72), isTablet ? 680 : 540),
    isDesktop ? 820 : isTablet ? 780 : 680
  );
  const cardScale = Math.max(1, Math.min(isDesktop ? 1.35 : isTablet ? 1.28 : 1, cardWidth / 390));
  const artSize = Math.min(cardWidth * 0.82, isTablet ? 390 : 292);
  const nextSize = 62 * cardScale;
  const title = index === 0 ? 'Learn to Write\nLetters' : index === 1 ? 'Write Numbers' : 'Learn Words';
  const next = () => (index === onboarding.length - 1 ? go('home') : setIndex(index + 1));

  return (
    <ScreenScaffold scroll={false} bottomInset={false} style={styles.onboardingRoot}>
      <View style={[styles.onboardingSingleCard, { width: cardWidth, minHeight: cardHeight, paddingHorizontal: 28 * cardScale, paddingTop: 34 * cardScale, paddingBottom: 18 * cardScale }]}>
        <KidText variant="title" style={[styles.onboardingSingleTitle, { fontSize: 27 * cardScale, lineHeight: 34 * cardScale }]}>{title}</KidText>
        <View style={[styles.onboardingSingleArt, { minHeight: Math.max(300, cardHeight * 0.48) }]}>
          {index === 0 ? (
            <Image
              source={require('../../assets/onboarding-letter-apple.png')}
              resizeMode="contain"
              style={[styles.onboardingGeneratedArt, { width: artSize * 1.08, height: artSize * 1.08 }]}
              accessibilityLabel="Traceable letter A with a smiling apple"
            />
          ) : index === 1 ? (
            <Image
              source={require('../../assets/onboarding-number-ducks.png')}
              resizeMode="contain"
              style={[styles.onboardingGeneratedArt, { width: artSize * 1.08, height: artSize * 1.08 }]}
              accessibilityLabel="Traceable number 3 with three ducklings"
            />
          ) : (
            <Image
              source={require('../../assets/onboarding-word-cat.png')}
              resizeMode="contain"
              style={[styles.onboardingGeneratedArt, { width: artSize * 1.08, height: artSize * 1.08 }]}
              accessibilityLabel="Traceable word CAT with a cute kitten"
            />
          )}
        </View>
        <KidText style={[styles.onboardingSingleCopy, { fontSize: 18 * cardScale, lineHeight: 24 * cardScale, maxWidth: 250 * cardScale }]}>{slide.subtitle}</KidText>
        <View style={[styles.onboardingSingleFooter, { minHeight: 56 * cardScale }]}>
          <View style={styles.onboardingSingleDots}>
            {onboarding.map((_, dot) => <View key={dot} style={[styles.onboardingSingleDot, { width: 12 * cardScale, height: 12 * cardScale, borderRadius: 6 * cardScale }, dot === index && styles.onboardingSingleDotActive]} />)}
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Next onboarding slide" onPress={next} style={[styles.onboardingSingleNext, { width: nextSize, height: nextSize, borderRadius: nextSize / 2 }]}>
            <Feather name="arrow-right" size={30 * cardScale} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </ScreenScaffold>
  );
}

export function HomeScreen({ go }) {
  const { coins } = useKidWrite();
  const { width } = useWindowDimensions();
  const isTablet = width >= 700;
  const isDesktop = width >= 1180;
  const homeScale = isDesktop ? 1.24 : isTablet ? 1.18 : 1;
  const cols = isTablet ? 3 : 2;
  const contentMaxWidth = isDesktop ? 980 : isTablet ? Math.min(width - 48, 860) : 620;
  return (
    <ScreenScaffold style={[styles.homeScreenInner, { maxWidth: contentMaxWidth, gap: isTablet ? 18 : 14, paddingTop: isTablet ? 42 : 36 }]}>
      <View style={[styles.homeTopRow, { minHeight: 54 * homeScale }]}>
        <View style={[styles.homeAvatar, { width: 48 * homeScale, height: 48 * homeScale, borderRadius: 24 * homeScale }]}>
          <Image source={require('../../assets/app-icon.png')} resizeMode="cover" style={styles.homeAvatarImage} />
        </View>
        <KidText style={[styles.homeGreeting, { fontSize: 18 * homeScale, lineHeight: 24 * homeScale }]}>Hi, Emma! 👋</KidText>
        <View style={[styles.homeCoinPill, { minHeight: 42 * homeScale, borderRadius: 21 * homeScale, paddingHorizontal: 14 * homeScale }]}>
          <Feather name="star" size={22 * homeScale} color={colors.yellow} fill={colors.yellow} />
          <KidText style={[styles.homeCoinText, { fontSize: 15 * homeScale }]}>{coins}</KidText>
        </View>
      </View>

      <ImageBackground
        source={require('../../assets/home-continue-banner.png')}
        resizeMode="cover"
        imageStyle={styles.homeContinueBannerImage}
        style={[styles.homeContinueCard, isTablet && styles.homeContinueCardWide, { minHeight: isTablet ? 218 : 124 }]}
      >
        <View style={styles.homeContinueTextBlock}>
          <KidText style={[styles.homeContinueTitle, { fontSize: (isTablet ? 26 : 20), lineHeight: (isTablet ? 32 : 25) }]}>Let’s continue</KidText>
          <KidText style={[styles.homeContinueSubtitle, { fontSize: (isTablet ? 19 : 15), lineHeight: (isTablet ? 25 : 20) }]}>your learning journey!</KidText>
        </View>
      </ImageBackground>

      <View style={styles.homeGrid}>
        {menuItems.map((item) => (
          <View key={item.key} style={{ width: `${100 / cols}%`, padding: 6 }}>
            <HomeMenuTile item={item} scale={homeScale} onPress={() => go(item.key === 'letters' ? 'letterTrace' : item.key === 'numbers' ? 'numberTrace' : item.key === 'words' ? 'wordTrace' : item.key === 'games' ? 'game' : item.key === 'rewards' ? 'rewards' : 'category')} />
          </View>
        ))}
      </View>
    </ScreenScaffold>
  );
}

export function CategoryScreen({ go }) {
  return (
    <ScreenScaffold>
      <HeaderBar title="Choose What You Want to Learn" onBack={() => go('home')} />
      <GlassCard style={styles.categoryHero}>
        <KidText variant="title" style={styles.center}>Choose What You Want to Learn</KidText>
        <CatArt size={120} />
      </GlassCard>
      {categories.map((category) => (
        <Pressable key={category.key} accessibilityRole="button" onPress={() => go(category.key === 'letters' ? 'letterTrace' : category.key === 'numbers' ? 'numberTrace' : 'wordTrace')}>
          <LinearGradient colors={category.colors} style={styles.categoryCard}>
            <KidText variant="hero" style={styles.categoryIcon}>{category.icon}</KidText>
            <View style={{ flex: 1 }}>
              <KidText variant="section">{category.title}</KidText>
              <KidText variant="caption">{category.subtitle}</KidText>
            </View>
            <Feather name="arrow-right" size={28} color={colors.ink} />
          </LinearGradient>
        </Pressable>
      ))}
    </ScreenScaffold>
  );
}

export function LetterTracingScreen({ go }) {
  const { soundEnabled, setCoins } = useKidWrite();
  const [completed, setCompleted] = useState(false);
  return (
    <ScreenScaffold>
      <HeaderBar title="Letter A" onBack={() => go('home')} onRight={() => speak('A is for apple', soundEnabled)} />
      <StarRow earned={completed ? 3 : 1} />
      <GlassCard style={styles.traceCard}>
        <TracePad onComplete={() => { setCompleted(true); setCoins((value) => value + 5); }}>
          <View style={styles.traceContent}>
            <LetterTraceArt text="A" size={260} />
            <View style={styles.exampleBlock}>
              <AppleArt size={112} />
              <KidText variant="section" style={styles.center}>A is for Apple</KidText>
            </View>
          </View>
        </TracePad>
      </GlassCard>
      <LessonActions onReplay={() => setCompleted(false)} onSpeak={() => speak('A. Apple.', soundEnabled)} onNext={() => go('numberTrace')} />
    </ScreenScaffold>
  );
}

export function NumberTracingScreen({ go }) {
  const { soundEnabled, setCoins } = useKidWrite();
  const [completed, setCompleted] = useState(false);
  return (
    <ScreenScaffold>
      <HeaderBar title="Number 5" onBack={() => go('home')} onRight={() => speak('Five apples', soundEnabled)} />
      <StarRow earned={completed ? 3 : 2} />
      <GlassCard style={styles.traceCard}>
        <TracePad strokeColor="#FF5B57" onComplete={() => { setCompleted(true); setCoins((value) => value + 5); }}>
          <View style={styles.traceContent}>
            <NumberTraceArt number="5" size={260} />
            <View style={styles.exampleBlock}>
              <ObjectGroup count={5} />
              <KidText variant="section" style={styles.center}>5 Apples</KidText>
            </View>
          </View>
        </TracePad>
      </GlassCard>
      <LessonActions onReplay={() => setCompleted(false)} onSpeak={() => speak('Five', soundEnabled)} onNext={() => go('wordTrace')} />
    </ScreenScaffold>
  );
}

export function WordTracingScreen({ go }) {
  const { soundEnabled, setCoins } = useKidWrite();
  const [completed, setCompleted] = useState(false);
  return (
    <ScreenScaffold>
      <HeaderBar title="Word CAT" onBack={() => go('home')} onRight={() => speak('Cat', soundEnabled)} />
      <StarRow earned={completed ? 3 : 3} />
      <GlassCard style={styles.traceCard}>
        <TracePad strokeColor="#FF5B57" onComplete={() => { setCompleted(true); setCoins((value) => value + 8); }}>
          <View style={styles.wordTraceContent}>
            <LetterTraceArt text="CAT" size={330} />
            <CatArt size={156} />
          </View>
        </TracePad>
      </GlassCard>
      <LessonActions onReplay={() => setCompleted(false)} onSpeak={() => speak('C A T. Cat.', soundEnabled)} onNext={() => go('game')} />
    </ScreenScaffold>
  );
}

function LessonActions({ onReplay, onSpeak, onNext }) {
  return (
    <View style={styles.lessonActions}>
      <PrimaryButton title="Replay" icon="rotate-ccw" variant="purple" onPress={onReplay} />
      <IconCircle icon="mic" onPress={onSpeak} label="Speak" active />
      <PrimaryButton title="Next" icon="arrow-right" onPress={onNext} />
    </View>
  );
}

export function GameScreen({ go }) {
  const [selected, setSelected] = useState('DOG');
  const [matched, setMatched] = useState(['DOG']);
  const progress = matched.length / 3;
  const words = ['DOG', 'BALL', 'FISH'];
  const images = [
    { key: 'DOG', icon: '🐶' },
    { key: 'BALL', icon: '🏀' },
    { key: 'FISH', icon: '🐟' }
  ];
  const chooseImage = (key) => {
    if (key === selected && !matched.includes(key)) setMatched((items) => [...items, key]);
  };

  return (
    <ScreenScaffold>
      <HeaderBar title="Match the Picture" onBack={() => go('home')} onRight={() => speak('Match the word with the correct picture')} />
      <GlassCard style={styles.gameCard}>
        <KidText variant="section" style={styles.center}>Match the word with the correct picture</KidText>
        <View style={styles.matchGrid}>
          <View style={styles.wordColumn}>
            {words.map((word) => (
              <Pressable key={word} onPress={() => setSelected(word)} accessibilityRole="button" accessibilityLabel={`Select ${word}`}>
                <GlassCard style={[styles.wordChip, selected === word && styles.wordChipActive, matched.includes(word) && styles.wordChipDone]}>
                  <KidText variant="section" style={styles.center}>{word}</KidText>
                </GlassCard>
              </Pressable>
            ))}
          </View>
          <View style={styles.imageColumn}>
            {images.map((item) => (
              <Pressable key={item.key} onPress={() => chooseImage(item.key)} accessibilityRole="button" accessibilityLabel={`Match ${item.key}`}>
                <GlassCard style={[styles.imageChip, matched.includes(item.key) && styles.imageChipDone]}>
                  <KidText style={styles.emoji}>{item.icon}</KidText>
                  {matched.includes(item.key) ? <Feather name="check-circle" size={22} color={colors.greenDark} /> : null}
                </GlassCard>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.rewardProgress}>
          <ProgressBar value={progress} color={colors.green} style={{ flex: 1 }} />
          <Feather name="gift" size={34} color={colors.orange} />
        </View>
      </GlassCard>
      {progress === 1 ? <PrimaryButton title="Claim Reward" icon="gift" onPress={() => go('rewards')} /> : null}
    </ScreenScaffold>
  );
}

export function RewardsScreen({ go }) {
  return (
    <ScreenScaffold>
      <Confetti />
      <HeaderBar title="Rewards" onBack={() => go('home')} rightIcon="gift" />
      <LinearGradient colors={gradients.royal} style={styles.rewardHero}>
        <KidText variant="title" style={styles.rewardTitle}>Great Job! 🎉</KidText>
        <KidText style={styles.whiteText}>You earned</KidText>
        <RewardCoin size={136} />
        <GlassCard colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.12)']} style={styles.plusCoin}>
          <KidText variant="section" style={styles.whiteText}>+20</KidText>
        </GlassCard>
      </LinearGradient>
      <View style={styles.rewardGrid}>
        {rewards.map((reward) => (
          <GlassCard key={reward.title} style={styles.rewardTile}>
            <Feather name={reward.icon} size={36} color={reward.color} fill={reward.icon === 'star' ? reward.color : 'transparent'} />
            <KidText variant="section">{reward.value}</KidText>
            <KidText variant="caption">{reward.title}</KidText>
          </GlassCard>
        ))}
      </View>
      <PrimaryButton title="Collect" icon="check" onPress={() => go('home')} />
    </ScreenScaffold>
  );
}

export function ProgressScreen({ go }) {
  const { lessonScore } = useKidWrite();
  return (
    <ScreenScaffold>
      <HeaderBar title="Your Progress" onBack={() => go('home')} rightIcon="calendar" />
      <View style={styles.statRow}>
        {progressStats.map((stat) => (
          <GlassCard key={stat.label} style={[styles.statCard, { borderBottomColor: stat.color, borderBottomWidth: 4 }]}>
            <KidText variant="title" style={[styles.center, { color: stat.color }]}>{stat.icon}</KidText>
            <KidText variant="body" style={styles.center}>{stat.label}</KidText>
            <KidText variant="caption" style={styles.center}>{stat.value}</KidText>
          </GlassCard>
        ))}
      </View>
      <GlassCard>
        <KidText variant="section">Overall Progress</KidText>
        <ProgressBar value={lessonScore} color={colors.green} style={{ marginTop: 14 }} />
        <KidText variant="caption" style={styles.progressPercent}>{Math.round(lessonScore * 100)}%</KidText>
      </GlassCard>
      <LinearGradient colors={['#D9F3FF', '#AEE1FF']} style={styles.motivation}>
        <View style={{ flex: 1 }}>
          <KidText variant="section">Keep practicing!</KidText>
          <KidText>You’re doing amazing!</KidText>
        </View>
        <TrophyArt size={120} />
      </LinearGradient>
    </ScreenScaffold>
  );
}

export function ProfileScreen({ go }) {
  const { selectedAvatar, setSelectedAvatar, soundEnabled, setSoundEnabled } = useKidWrite();
  return (
    <ScreenScaffold>
      <HeaderBar title="My Profile" onBack={() => go('home')} rightIcon="settings" />
      <GlassCard style={styles.profileHeader}>
        <View style={styles.profileAvatar}><CatArt size={72} /></View>
        <View style={{ flex: 1 }}>
          <KidText variant="section">Emma</KidText>
          <KidText variant="caption">Level 5</KidText>
          <ProgressBar value={0.5} color={colors.green} style={{ marginTop: 10 }} />
        </View>
        <Feather name="star" size={34} color={colors.yellow} fill={colors.yellow} />
      </GlassCard>
      <GlassCard>
        <KidText variant="section">My Avatar</KidText>
        <View style={styles.avatarRow}>
          {[0, 1, 2, 3, 4].map((item) => (
            <Pressable key={item} onPress={() => setSelectedAvatar(item)} accessibilityRole="button" accessibilityLabel={`Choose avatar ${item + 1}`}>
              <View style={[styles.avatarChoice, selectedAvatar === item && styles.avatarChoiceActive]}>
                {item < 3 ? <CatArt size={48} /> : <Feather name="lock" size={24} color="#8D95B7" />}
              </View>
            </Pressable>
          ))}
        </View>
      </GlassCard>
      <GlassCard>
        <KidText variant="section">Settings</KidText>
        <View style={styles.settingRow}>
          <Feather name="volume-2" size={22} color={colors.purple} />
          <KidText style={{ flex: 1 }}>Sound</KidText>
          <Switch value={soundEnabled} onValueChange={setSoundEnabled} trackColor={{ true: colors.green }} />
        </View>
        <View style={styles.settingRow}>
          <Feather name="globe" size={22} color={colors.purple} />
          <KidText style={{ flex: 1 }}>Language</KidText>
          <GlassCard style={styles.languagePill}><KidText variant="caption">English</KidText></GlassCard>
        </View>
      </GlassCard>
      <PrimaryButton title="Parent Dashboard" icon="shield" variant="purple" onPress={() => go('parent')} />
    </ScreenScaffold>
  );
}

export function ParentDashboardScreen({ go }) {
  return (
    <ScreenScaffold>
      <HeaderBar title="Parent Dashboard" onBack={() => go('profile')} rightIcon="user-check" />
      <GlassCard style={styles.parentHeader}>
        <View style={styles.profileAvatar}><CatArt size={62} /></View>
        <View style={{ flex: 1 }}>
          <KidText variant="section">Emma</KidText>
          <KidText variant="caption">Age 5</KidText>
        </View>
        <PrimaryButton title="View Child Profile" variant="purple" icon="user" onPress={() => go('profile')} style={styles.smallButton} />
      </GlassCard>
      <GlassCard>
        <KidText variant="section">Learning Summary</KidText>
        <View style={styles.parentSummary}>
          {parentSummary.map((item) => (
            <View key={item.label} style={styles.summaryTile}>
              <Feather name={item.icon} size={24} color={item.color} />
              <KidText variant="caption">{item.label}</KidText>
              <KidText variant="body">{item.value}</KidText>
            </View>
          ))}
        </View>
      </GlassCard>
      <View style={styles.parentTwoCol}>
        <GlassCard style={styles.parentPanel}>
          <KidText variant="section">Weak Areas</KidText>
          <WeakArea label="Letter: Q, X, Z" color={colors.purple} />
          <WeakArea label="Number: 7, 9" color={colors.red} />
        </GlassCard>
        <GlassCard style={styles.parentPanel}>
          <KidText variant="section">Recent Activity</KidText>
          <WeakArea label="Practiced Letter A" detail="2 mins ago" color={colors.green} />
          <WeakArea label="Completed Word CAT" detail="Today" color={colors.orange} />
        </GlassCard>
      </View>
    </ScreenScaffold>
  );
}

function WeakArea({ label, detail, color }) {
  return (
    <View style={styles.weakRow}>
      <Feather name="star" size={18} color={color} />
      <View style={{ flex: 1 }}>
        <KidText variant="body">{label}</KidText>
        {detail ? <KidText variant="caption">{detail}</KidText> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    justifyContent: 'center',
    paddingTop: 28
  },
  splashRoot: {
    flex: 1,
    backgroundColor: '#5C4EFF'
  },
  splashShade: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 24,
    backgroundColor: 'rgba(28, 21, 120, 0.04)'
  },
  splashSceneImage: {
    width: '100%',
    height: '100%'
  },
  musicBubble: {
    position: 'absolute',
    top: 42,
    left: 34,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  },
  logoCluster: {
    alignItems: 'center'
  },
  kidwriteLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  logoLetter: {
    fontSize: 54,
    lineHeight: 62,
    marginHorizontal: -1,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8
  },
  taglineRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: -2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taglineWord: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    textShadowColor: 'rgba(72,42,171,0.36)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4
  },
  splashButtonArea: {
    width: '100%',
    alignItems: 'center',
    gap: 14
  },
  referenceCtaHitArea: {
    width: '82%',
    maxWidth: 390,
    alignItems: 'center',
    justifyContent: 'center'
  },
  referenceCta: {
    width: '100%',
    minHeight: 82,
    borderRadius: 42,
    backgroundColor: '#FFD84D',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.72)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    shadowColor: '#B96F1D',
    shadowOpacity: 0.32,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 11 },
    elevation: 12
  },
  referenceCtaActive: {
    transform: [{ translateY: 2 }, { scale: 0.985 }],
    shadowOpacity: 0.22
  },
  playDisc: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  referenceCtaText: {
    color: colors.purpleDark,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    textShadowColor: 'rgba(255,255,255,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2
  },
  splashDots: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  splashDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.86)'
  },
  splashDotActive: {
    backgroundColor: colors.purple
  },
  splashPanel: {
    minHeight: '92%',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    overflow: 'hidden',
    ...shadow
  },
  logo: {
    color: colors.white,
    textShadowColor: 'rgba(21,17,87,0.22)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10
  },
  logoSub: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 8
  },
  splashMascot: {
    height: 360,
    maxHeight: '52%',
    marginVertical: 14
  },
  onboardingRoot: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14
  },
  onboardingSingleCard: {
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.82)',
    paddingHorizontal: 28,
    paddingTop: 34,
    paddingBottom: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6150C9',
    shadowOpacity: 0.14,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10
  },
  onboardingSingleTitle: {
    color: '#2419D8',
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8
  },
  onboardingSingleArt: {
    flex: 1,
    width: '100%',
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  onboardingGeneratedArt: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  onboardingSingleCharacter: {
    position: 'absolute',
    left: 6,
    bottom: 72
  },
  onboardingSingleDucks: {
    position: 'absolute',
    bottom: 58
  },
  onboardingSingleCat: {
    position: 'absolute',
    bottom: 42
  },
  onboardingSingleCopy: {
    color: colors.ink,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 250,
    marginBottom: 18
  },
  onboardingSingleFooter: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  onboardingSingleDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  onboardingSingleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#DFDDF2'
  },
  onboardingSingleDotActive: {
    backgroundColor: colors.purple
  },
  onboardingSingleNext: {
    position: 'absolute',
    right: 0,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.purpleDark,
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 9
  },
  homeScreenInner: {
    gap: 14,
    paddingTop: 36,
    width: '100%',
    maxWidth: 620
  },
  homeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 54
  },
  homeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE4F2',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.white,
    ...shadow
  },
  homeAvatarImage: {
    width: '100%',
    height: '100%'
  },
  homeGreeting: {
    flex: 1,
    color: colors.ink,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900'
  },
  homeCoinPill: {
    minHeight: 42,
    borderRadius: 21,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(114,87,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    ...shadow
  },
  homeCoinText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900'
  },
  homeContinueCard: {
    minHeight: 124,
    borderRadius: 22,
    paddingLeft: 18,
    paddingVertical: 16,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    ...shadow
  },
  homeContinueBannerImage: {
    borderRadius: 22
  },
  homeContinueCardWide: {
    minHeight: 168,
    paddingLeft: 24,
    paddingRight: 24
  },
  homeContinueTextBlock: {
    flex: 1,
    zIndex: 2
  },
  homeContinueTitle: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900'
  },
  homeContinueSubtitle: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800'
  },
  homeContinueMascot: {
    width: 156,
    height: 116,
    marginRight: -8
  },
  homeContinueMascotWide: {
    width: 300,
    height: 216,
    marginRight: -18
  },
  homeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  },
  homeTilePress: {
    flex: 1
  },
  homeTile: {
    minHeight: 124,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(114,87,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6A5EE8',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5
  },
  homeTileIconWrap: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeTileLabel: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
    textAlign: 'center'
  },
  abcIcon: {
    width: 78,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconLetter: {
    position: 'absolute',
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    textShadowColor: 'rgba(21,17,87,0.15)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4
  },
  iconLetterSmall: {
    position: 'absolute',
    left: 32,
    top: 22,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900'
  },
  homeNumberAsset: {
    width: 92,
    height: 52
  },
  homeWordAsset: {
    width: 104,
    height: 58
  },
  homeGameAsset: {
    width: 104,
    height: 62
  },
  homePracticeAsset: {
    width: 94,
    height: 66
  },
  homeRewardAsset: {
    width: 94,
    height: 72
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatarMini: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow
  },
  coinPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  continueCard: {
    minHeight: 150,
    borderRadius: radius.lg,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    ...shadow
  },
  continueMascot: {
    width: 170,
    height: 140
  },
  whiteText: {
    color: colors.white
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  },
  pressGrow: {
    flex: 1
  },
  menuCard: {
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  menuIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.72)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  center: {
    textAlign: 'center'
  },
  categoryHero: {
    alignItems: 'center',
    gap: 6
  },
  categoryCard: {
    minHeight: 112,
    borderRadius: radius.lg,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    ...shadow
  },
  categoryIcon: {
    width: 112,
    fontSize: 40,
    color: colors.white,
    textShadowColor: 'rgba(21,17,87,0.24)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6
  },
  traceCard: {
    minHeight: 330,
    padding: 10
  },
  traceContent: {
    minHeight: 290,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 12
  },
  wordTraceContent: {
    minHeight: 290,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exampleBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minWidth: 160
  },
  objectGrid: {
    width: 180,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4
  },
  lessonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    flexWrap: 'wrap'
  },
  gameCard: {
    gap: 18
  },
  matchGrid: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  wordColumn: {
    gap: 14,
    minWidth: 180
  },
  imageColumn: {
    gap: 14,
    minWidth: 180
  },
  wordChip: {
    minHeight: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wordChipActive: {
    borderColor: colors.purple,
    borderWidth: 3
  },
  wordChipDone: {
    backgroundColor: '#DEFFD8'
  },
  imageChip: {
    minHeight: 72,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  imageChipDone: {
    backgroundColor: '#E7FFEE'
  },
  emoji: {
    fontSize: 42
  },
  rewardProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  rewardHero: {
    minHeight: 360,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadow
  },
  rewardTitle: {
    color: colors.yellow,
    textAlign: 'center'
  },
  plusCoin: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: radius.pill
  },
  rewardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center'
  },
  rewardTile: {
    width: 145,
    minHeight: 130,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  statRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  statCard: {
    flex: 1,
    minWidth: 120,
    alignItems: 'center',
    gap: 4
  },
  progressPercent: {
    alignSelf: 'flex-end',
    marginTop: 8
  },
  motivation: {
    minHeight: 170,
    borderRadius: radius.lg,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    ...shadow
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  profileAvatar: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#FFE2F3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 14
  },
  avatarChoice: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EEF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  avatarChoiceActive: {
    borderColor: colors.purple,
    backgroundColor: '#EFEAFF'
  },
  settingRow: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  languagePill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill
  },
  parentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  smallButton: {
    transform: [{ scale: 0.82 }]
  },
  parentSummary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 14
  },
  summaryTile: {
    flex: 1,
    minWidth: 140,
    minHeight: 106,
    borderRadius: 18,
    backgroundColor: '#F4F2FF',
    padding: 14,
    justifyContent: 'center',
    gap: 5
  },
  parentTwoCol: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14
  },
  parentPanel: {
    flex: 1,
    minWidth: 280,
    gap: 12
  },
  weakRow: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#F7F3FF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});
