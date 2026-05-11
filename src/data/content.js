export const onboarding = [
  {
    title: 'Learn Letters',
    subtitle: 'Trace letters with fun animations.',
    sample: 'A',
    accent: '#FF5B57',
    character: 'apple'
  },
  {
    title: 'Write Numbers',
    subtitle: 'Count, trace, and play.',
    sample: '3',
    accent: '#4FA7FF',
    character: 'ducks'
  },
  {
    title: 'Learn Words',
    subtitle: 'Trace words and build vocabulary.',
    sample: 'CAT',
    accent: '#FF9B33',
    character: 'cat'
  }
];

export const menuItems = [
  { key: 'letters', label: 'Letters', icon: 'type', colors: ['#FFF7CE', '#FFFFFF'] },
  { key: 'numbers', label: 'Numbers', icon: 'hash', colors: ['#DDF7FF', '#FFFFFF'] },
  { key: 'words', label: 'Words', icon: 'book-open', colors: ['#FFE6F7', '#FFFFFF'] },
  { key: 'games', label: 'Games', icon: 'zap', colors: ['#EDE5FF', '#FFFFFF'] },
  { key: 'practice', label: 'Practice', icon: 'edit-3', colors: ['#E8FFEF', '#FFFFFF'] },
  { key: 'rewards', label: 'Rewards', icon: 'award', colors: ['#FFF0D9', '#FFFFFF'] }
];

export const categories = [
  { key: 'letters', title: 'Letters', subtitle: 'Learn A to Z', icon: 'ABC', colors: ['#FFD84D', '#FFF7BD'] },
  { key: 'numbers', title: 'Numbers', subtitle: 'Learn 0 to 9', icon: '123', colors: ['#35D468', '#B8FF76'] },
  { key: 'words', title: 'Words', subtitle: 'Learn new words', icon: 'CAT', colors: ['#FF7BD7', '#FFD2F0'] }
];

export const rewards = [
  { title: 'Star', value: 'x40', icon: 'star', color: '#FFD84D' },
  { title: 'Sticker', value: 'x11', icon: 'smile', color: '#B579FF' },
  { title: 'Coin', value: 'x215', icon: 'disc', color: '#FFB02E' },
  { title: 'Trophy', value: 'x4', icon: 'award', color: '#FFCA3A' }
];

export const progressStats = [
  { label: 'Letters', value: '18/26', icon: 'A', color: '#FF6EC7' },
  { label: 'Numbers', value: '8/10', icon: '1', color: '#FFD84D' },
  { label: 'Words', value: '12/20', icon: 'CAT', color: '#47C8FF' }
];

export const parentSummary = [
  { label: 'Total Time', value: '10h 25m', icon: 'clock', color: '#0BBE82' },
  { label: 'Lessons Done', value: '38', icon: 'clipboard', color: '#FF8A22' },
  { label: 'Accuracy', value: '85%', icon: 'shield', color: '#FF6EC7' }
];

export const bottomTabs = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'progress', label: 'Progress', icon: 'bar-chart-2' },
  { key: 'rewards', label: 'Rewards', icon: 'award' },
  { key: 'profile', label: 'Profile', icon: 'user' }
];

export const firebaseCollections = {
  children: 'children',
  lessonProgress: 'lessonProgress',
  rewards: 'rewards',
  activityEvents: 'activityEvents'
};
