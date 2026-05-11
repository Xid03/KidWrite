import React, { useMemo, useState } from 'react';
import { Animated, ImageBackground, Pressable, StyleSheet, Switch, View, useWindowDimensions } from 'react-native';
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

export function SplashScreen({ go }) {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 720;
  const posterWidth = isWide ? Math.min(500, height * 0.62) : width;
  const posterHeight = isWide ? Math.min(height - 32, posterWidth * 1.42) : height;
  const logoScale = Math.max(0.82, Math.min(1.14, posterWidth / 430));
  const ctaScale = Math.max(0.76, Math.min(1, posterWidth / 390));
  const logoTop = posterHeight < 720 ? 56 : 82;

  return (
    <LinearGradient colors={['#F6FAFF', '#E8F1FF']} style={styles.splashRoot}>
      <View style={[styles.splashPosterWrap, { width: posterWidth, height: posterHeight }, isWide && styles.splashPosterWrapWide]}>
        <ImageBackground
          source={require('../../assets/splash-fantasy.png')}
          resizeMode="cover"
          imageStyle={styles.splashSceneImage}
          style={styles.splashScene}
          accessibilityLabel="KidWrite magical learning splash scene with child riding a pencil"
        >
          <View style={styles.musicBubble}>
            <Feather name="music" size={26 * logoScale} color={colors.purple} />
          </View>

          <View style={[styles.logoCluster, { marginTop: logoTop, transform: [{ scale: logoScale }] }]}>
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
              style={({ pressed, hovered }) => [
                styles.referenceCta,
                { width: posterWidth < 380 ? '88%' : '82%' },
                (pressed || hovered) && styles.referenceCtaActive
              ]}
            >
              <View style={[styles.playDisc, { width: 54 * ctaScale, height: 54 * ctaScale, borderRadius: 27 * ctaScale }]}>
                <Feather name="play" size={30 * ctaScale} color={colors.purpleDark} fill={colors.purpleDark} />
              </View>
              <KidText style={[styles.referenceCtaText, { fontSize: 28 * ctaScale, lineHeight: 34 * ctaScale }]}>Start Learning</KidText>
            </Pressable>
            <View style={styles.splashDots}>
              {[0, 1, 2, 3].map((dot) => <View key={dot} style={[styles.splashDot, dot === 0 && styles.splashDotActive]} />)}
            </View>
          </View>
        </ImageBackground>
      </View>
    </LinearGradient>
  );
}

export function OnboardingScreen({ go }) {
  const [index, setIndex] = useState(0);
  const slide = onboarding[index];
  const next = () => (index === onboarding.length - 1 ? go('home') : setIndex(index + 1));
  const art = slide.character === 'apple' ? <AppleArt size={122} /> : slide.character === 'ducks' ? <DucksArt size={160} /> : <CatArt size={142} />;

  return (
    <ScreenScaffold bottomInset={false}>
      <View style={styles.onboardingGrid}>
        {onboarding.map((item, itemIndex) => (
          <GlassCard key={item.title} style={[styles.onboardingCard, itemIndex !== index && styles.slideGhost]}>
            <KidText variant="section" style={styles.center}>{item.title}</KidText>
            <View style={styles.sampleWrap}>
              <LetterTraceArt text={item.sample} accent={item.accent} size={190} />
              <View style={styles.sampleCharacter}>{item.character === 'apple' ? <AppleArt size={92} /> : item.character === 'ducks' ? <DucksArt size={130} /> : <CatArt size={106} />}</View>
            </View>
            <KidText variant="caption" style={styles.center}>{item.subtitle}</KidText>
          </GlassCard>
        ))}
      </View>
      <View style={styles.onboardingActive}>
        <View style={styles.bigArt}>{art}</View>
        <View style={styles.dots}>
          {onboarding.map((_, dot) => <View key={dot} style={[styles.dot, dot === index && styles.dotActive]} />)}
        </View>
        <PrimaryButton title={index === onboarding.length - 1 ? 'Let’s Go' : 'Next'} icon="arrow-right" variant="purple" onPress={next} />
      </View>
    </ScreenScaffold>
  );
}

export function HomeScreen({ go }) {
  const { coins } = useKidWrite();
  const cols = useColumns(280);
  return (
    <ScreenScaffold>
      <View style={styles.topRow}>
        <View style={styles.avatarMini}><CatArt size={52} /></View>
        <KidText variant="section" style={{ flex: 1 }}>Hi, Emma! 👋</KidText>
        <GlassCard style={styles.coinPill} colors={['#FFFFFF', '#FFF5CE']}>
          <Feather name="star" size={22} color={colors.yellow} fill={colors.yellow} />
          <KidText variant="body">{coins}</KidText>
        </GlassCard>
      </View>
      <LinearGradient colors={['#58B8FF', '#8AD4FF']} style={styles.continueCard}>
        <View style={{ flex: 1 }}>
          <KidText variant="section" style={styles.whiteText}>Let’s continue</KidText>
          <KidText style={styles.whiteText}>your learning journey!</KidText>
        </View>
        <MascotImage style={styles.continueMascot} />
      </LinearGradient>
      <View style={[styles.grid, { gridTemplateColumns: undefined }]}>
        {menuItems.map((item) => (
          <View key={item.key} style={{ width: `${100 / cols}%`, padding: 6 }}>
            <CardButton item={item} onPress={() => go(item.key === 'letters' ? 'letterTrace' : item.key === 'numbers' ? 'numberTrace' : item.key === 'words' ? 'wordTrace' : item.key === 'games' ? 'game' : item.key === 'rewards' ? 'rewards' : 'category')} />
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  splashPosterWrap: {
    overflow: 'hidden',
    backgroundColor: '#5C4EFF'
  },
  splashPosterWrapWide: {
    borderRadius: 36,
    ...shadow
  },
  splashScene: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 24
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
  referenceCta: {
    width: '82%',
    maxWidth: 390,
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
  onboardingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'center'
  },
  onboardingCard: {
    width: 300,
    minHeight: 430,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  slideGhost: {
    opacity: 0.72
  },
  sampleWrap: {
    minHeight: 230,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sampleCharacter: {
    position: 'absolute',
    bottom: 12,
    left: 0
  },
  onboardingActive: {
    alignItems: 'center',
    gap: 18
  },
  bigArt: {
    minHeight: 96,
    alignItems: 'center'
  },
  dots: {
    flexDirection: 'row',
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C8C9EA'
  },
  dotActive: {
    width: 22,
    backgroundColor: colors.purple
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
