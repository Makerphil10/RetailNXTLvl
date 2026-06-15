/**
 * All CV content lives here. Edit this file to update the game's content —
 * stations, skills, achievements, and contact info.
 */

export interface CareerStation {
  id: string;
  year: string;
  period: string;
  title: string;
  company: string;
  location: string;
  /** Short label shown on the in-game signpost */
  sign: string;
  /** Flavor line in the quest modal, written like a quest description */
  quest: string;
  bullets: string[];
  /** Highlighted result, shown as "LOOT" in the modal */
  loot?: string;
  /** Achievement unlocked when this station is visited */
  achievementId: string;
  /** Marks the final "apply here" station */
  isFinal?: boolean;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SkillStat {
  name: string;
  /** 1–10 */
  level: number;
}

export const PLAYER = {
  name: 'PHIL GEBHARDT',
  class: 'MARKETING MANAGER',
  subtitle: 'Indie Game Marketing · Brand Experiences · GTM Strategy',
  tagline: '10+ years of XP. Currently looking for a co-op partner.',
  location: 'Nuremberg, Germany (Berlin? Gladly. Remote? Works too.)',
  email: 'phil.gebhardt@proton.me',
  phone: '+49 177 4333 272',
  linkedin: 'https://www.linkedin.com/in/philipp-gebhardt',
  classicCvUrl: 'https://philgebhardtcv.netlify.app',
  cvPdfUrl: 'https://philgebhardtcv.netlify.app/docs/CV_Philipp_Gebhardt_2026.pdf',
  languages: [
    { name: 'German', level: 'Native' },
    { name: 'English', level: 'Fluent (C1)' },
  ],
  interests: ['Family', 'Hockey', 'Punk Rock', 'Hiking', 'Reading'],
};

export const TARGET = {
  studio: "ByteRockers' Games",
  role: 'Marketing Manager',
  city: 'Berlin',
};

export const STATIONS: CareerStation[] = [
  {
    id: 'cip',
    year: '2007',
    period: 'Oct 2007 – Sep 2010',
    title: 'Junior Project Manager — Gaming Events & Brand Activations',
    company: 'cip Sportsmarketing GmbH',
    location: 'Herzogenaurach',
    sign: 'LVL 1 · GAMING EVENTS',
    quest: 'Tutorial level. Where the gaming career path begins: real controllers, real crowds, real deadlines.',
    bullets: [
      'Managed digital gaming events and brand activations — including EA SPORTS FIFA',
      'Led gaming convention activations and B2C campaign tours',
      'Early immersion in gaming culture, esports crowds, and event logistics',
    ],
    loot: 'Starter item acquired: GAMEPAD OF DESTINY',
    achievementId: 'coin-op',
  },
  {
    id: 'fos',
    year: '2012',
    period: 'Apr 2012 – Aug 2014',
    title: 'Marketing & Event Management',
    company: 'Friends of Sports GmbH (Kastinger)',
    location: 'Nuremberg',
    sign: 'LVL 2 · TRADE SHOWS',
    quest: 'Overworld unlocked. Trade show floors are just convention halls with different loot tables.',
    bullets: [
      'International trade show activations at OutDoor & ISPO: booth design, partnerships, press',
      'B2B and B2C event activations in the sports industry',
      'Community engagement and brand presence on a hands-on budget',
    ],
    loot: 'Skill learned: SMALL BUDGET, BIG STAGE',
    achievementId: 'booth-builder',
  },
  {
    id: 'adidas-dx',
    year: '2015',
    period: 'Mar 2015 – Nov 2016',
    title: 'Manager Digital Experience',
    company: 'adidas AG',
    location: 'Herzogenaurach',
    sign: 'LVL 3 · DIGITAL XP',
    quest: 'Entered the adidas mega-dungeon. First quest line: make flagship stores feel like the future.',
    bullets: [
      'Designed and launched digital brand touchpoints along the consumer journey in flagship stores',
      'Led VR research team; Product Owner for the miadidas customization VR prototype',
      'Managed external agencies and hardware partners for international in-store activations',
    ],
    loot: 'Tech tree unlocked: VR PROTOTYPING',
    achievementId: 'vr-pioneer',
  },
  {
    id: 'adidas-da',
    year: '2016',
    period: 'Nov 2016 – Sep 2020',
    title: 'Manager Digital Activation',
    company: 'adidas AG',
    location: 'Herzogenaurach',
    sign: 'LVL 4 · ACTIVATION',
    quest: 'Campaign grind across EMEA. Many markets, many agencies, one brand voice.',
    bullets: [
      'Planned and executed digital and retail activation campaigns across EMEA flagship stores',
      '+40% in-store brand awareness through integrated launch campaigns',
      'Managed agencies, briefing processes, and international rollouts across multiple markets in parallel',
      'Used consumer insights and market analysis to continuously optimize campaign performance',
    ],
    loot: 'Critical hit: +40% BRAND AWARENESS',
    achievementId: 'awareness-40',
  },
  {
    id: 'adidas-crm',
    year: '2020',
    period: 'Oct 2020 – Aug 2021',
    title: 'Manager CRM / Membership in Retail',
    company: 'adidas AG',
    location: 'Herzogenaurach',
    sign: 'LVL 5 · COMMUNITY',
    quest: 'Side quest turned main quest: turn one-time shoppers into a loyal player base.',
    bullets: [
      'Built the first-ever adidas Membersweek activation for retail from scratch (London flagship): agency search, briefing, concept, on-the-ground execution',
      '+35% membership signups; KPI learnings improved the next Membersweek by +20%',
      'Piloted new membership and engagement services in the Hamburg test market: service flows, partner coordination, staff training',
    ],
    loot: 'Guild grown: +35% MEMBER SIGNUPS',
    achievementId: 'signups-35',
  },
  {
    id: 'adidas-global',
    year: '2021',
    period: 'Aug 2021 – Sep 2025',
    title: 'Global Senior Manager — Retail Marketing & Brand Experiences',
    company: 'adidas AG',
    location: 'Herzogenaurach',
    sign: 'LVL 6 · WORLD TOUR',
    quest: 'Endgame content: global rollouts, raid-size stakeholder groups, and a €1M+ war chest.',
    bullets: [
      'End-to-end owner of the global Run Lab rollout across 11 flagship stores in EMEA, APAC & Americas (London, Seoul, Dubai, Mexico City…) — result: ~40% NPS uplift, >50% sell-through',
      '€1M+ budget responsibility: forecasting, performance reporting, agency management across parallel international projects',
      'Partnership marketing in practice: built the Crep Protect co-marketing service from playbook to launch in Berlin, Dubai & London — strong PR and lifestyle media coverage',
      'Created the adidas Maker Lab partner program: in-store customization workshops with technology partners (Avery Dennison, Epson) and a global rollout playbook',
      'Led cross-functional working groups of 10+ stakeholders across 4 regions — without direct reporting authority',
    ],
    loot: 'Raid cleared: 11 FLAGSHIPS, 3 CONTINENTS',
    achievementId: 'world-tour',
  },
  {
    id: 'indie',
    year: '2025',
    period: 'Oct 2025 – Present',
    title: 'Marketing Consultant — Indie Games & Brand Strategy',
    company: 'Freelance',
    location: 'Nuremberg',
    sign: 'LVL 7 · INDIE MODE',
    quest: 'New game+. Took everything learned in the AAA brand world and respecced into indie games.',
    bullets: [
      'Marketing lead for indie studio Distant Meadows ("Waters of Sal Namena", Godot 4): GTM strategy, Steam positioning, content planning',
      'Community building across Discord, Reddit, and social channels',
      'Steam Next Fest planning, influencer outreach, and gaming press coordination',
      'Certified Game Designer (WBA, 2026): behavioral design, player psychology, community engagement',
      'Hands-on with Unity & Godot through ongoing indie game projects',
    ],
    loot: 'Class change complete: INDIE GAME MARKETER',
    achievementId: 'indie-heart',
  },
  {
    id: 'byterockers',
    year: 'NOW',
    period: '2026 — ???',
    title: 'Marketing Manager',
    company: "ByteRockers' Games",
    location: 'Berlin',
    sign: 'FINAL LEVEL · ???',
    quest: 'The gate is locked. It opens for a marketing manager who breathes indie games and plays co-op, not elbows-out PvP.',
    bullets: [
      'Two games, full lifecycle marketing — strategy AND hands-on execution: that is exactly my build',
      'Partnership marketing is my favorite game mode (see: Crep Protect, Maker Lab, Distant Meadows)',
      'Embedded teamwork with dev teams, partner studios, vendors & media — cross-functional is my main stat',
      'Fluent English, native German, Berlin-compatible, indie at heart',
    ],
    loot: 'NO FORMAL APPLICATION NEEDED — JUST SAY HI',
    achievementId: 'final-gate',
    isFinal: true,
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    icon: '👟',
    title: 'Baby Steps',
    description: 'You moved the character. Bold. Decisive. Exactly the proactive energy this CV promised.',
  },
  {
    id: 'wrong-way',
    icon: '🧭',
    title: 'Market Research',
    description: 'You walked left to check if the world ends there. It does. No stone left unturned — great instinct.',
  },
  {
    id: 'coin-op',
    icon: '🕹️',
    title: 'Coin-Op Origins',
    description: 'Started the career running EA SPORTS FIFA gaming events and convention activations.',
  },
  {
    id: 'booth-builder',
    icon: '🏕️',
    title: 'Booth Builder',
    description: 'Shipped international trade show activations at OutDoor & ISPO on an indie-size budget.',
  },
  {
    id: 'vr-pioneer',
    icon: '🥽',
    title: 'VR Pioneer',
    description: 'Led a VR research team and product-owned the miadidas VR customization prototype.',
  },
  {
    id: 'awareness-40',
    icon: '📣',
    title: '+40% Brand Awareness',
    description: 'EMEA digital activation rollout lifted in-store brand awareness by 40%.',
  },
  {
    id: 'signups-35',
    icon: '🤝',
    title: '+35% Signups',
    description: 'Built the first-ever adidas Retail Membersweek from scratch — +35% membership signups.',
  },
  {
    id: 'world-tour',
    icon: '🌍',
    title: 'World Tour',
    description: 'Rolled out Run Lab across 11 flagship stores on 3 continents: ~40% NPS uplift, >50% sell-through.',
  },
  {
    id: 'budget-boss',
    icon: '💰',
    title: 'Budget Boss',
    description: 'Owned €1M+ marketing budgets across agencies, partners, and parallel international projects.',
  },
  {
    id: 'indie-heart',
    icon: '❤️',
    title: 'Indie at Heart',
    description: 'Marketing lead for an indie studio shipping on Steam — GTM, community, Next Fest, press.',
  },
  {
    id: 'cert-gd',
    icon: '🎓',
    title: 'Certified Game Designer',
    description: 'WBA certification (2026): player psychology, behavioral design, community engagement.',
  },
  {
    id: 'final-gate',
    icon: '🚪',
    title: 'Knock Knock, Berlin',
    description: "Reached the ByteRockers' Games gate. The next level loads when you say hi.",
  },
  {
    id: 'completionist',
    icon: '🏆',
    title: '100% Completion',
    description: 'Explored every station of this CV. Achievement-hunter energy — recruiters love that.',
  },
];

/** Achievements granted alongside specific stations (in addition to the station's own) */
export const BONUS_ACHIEVEMENTS: Record<string, string[]> = {
  'adidas-global': ['budget-boss'],
  indie: ['cert-gd'],
};

export const SKILLS: SkillStat[] = [
  { name: 'Indie Game Marketing', level: 8 },
  { name: 'Go-to-Market Strategy', level: 9 },
  { name: 'Community Building', level: 8 },
  { name: 'Partnership / Co-Marketing', level: 9 },
  { name: 'Campaign Execution', level: 10 },
  { name: 'Budget Management (€1M+)', level: 9 },
  { name: 'Cross-functional Leadership', level: 9 },
  { name: 'Player & Consumer Insights', level: 8 },
  { name: 'Game Design', level: 7 },
  { name: 'Generative AI', level: 8 },
];

export const INVENTORY: { icon: string; name: string; note: string }[] = [
  { icon: '🎮', name: 'Steam Playbook', note: 'Next Fest, store positioning, wishlists' },
  { icon: '💬', name: 'Discord Megaphone', note: 'Community building & care' },
  { icon: '📰', name: 'Press Contact Scroll', note: 'Gaming press & influencer outreach' },
  { icon: '🗺️', name: 'GTM Map', note: 'Full-lifecycle launch planning' },
  { icon: '💶', name: 'Budget Shield (+€1M)', note: 'Forecasting & ROI reporting' },
  { icon: '🎓', name: 'Game Design Diploma', note: 'WBA certified, 2026' },
  { icon: '🧲', name: 'Partnership Magnet', note: 'Co-op > PvP. Always.' },
  { icon: '🇬🇧', name: 'English C1 Badge', note: 'Plus native German' },
];
