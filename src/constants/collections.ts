import { DEFAULT_METADATA } from '@/constants/metadata';

import DefaultPostHeroImage from '@/assets/images/default/default-post-hero-image.jpg';
import DefaultProjectHeroImage from '@/assets/images/default/default-project-hero-image.jpg';

export const BASE_FOLDERS = {
  POST: 'src/content/post',
  PROJECT: 'src/content/project',
} as const;

export const COLLECTIONS = {
  POST: 'post',
  PROJECT: 'project',
} as const;

export const TAGS = [
  'next.js',
  'react',
  'Astro',
  'node.js',
  'javascript',
  'css',
  'python',
  'devops',
  'devcontainers',
  'automation',
  'self-hosting',
  'coding',
  'estimations',
  'software quality',
  'code quality',
  'test automation',
  'testing',
  'best practices',
  'QA management',
  'QA roles',
  'test framework',
  'architecture',
  'distributed',
  'JAX London',
  'Microservices',
  'JAVA',
  'innovation',
  'cqrs',
  'event sourcing',
  'aggregates',
  'resilience',
  'culture',
  'events',
  'developers',
  'happines',
  'goals',
  'complexity',
  'cynefin',
  'streaming',
  'dsl',
  'junit',
  'infrastructure',
  'principles',
  'failure',
  'strategy',
  'efficiency',
  'recruitment',
  'software',
  'cybersecuity',
  'CIA triad',
  'information security',
  'vpn',
  'proxmox',
  'virtual',
  'virtualization',
  'safe box',
  'web development',
  'android',
  'expo',
  'error handling',
  'local environment',
  'google-sheets',
  'framework',
  'CMS',
  'Mermaid Diagrams',
  'MDX',
  'Docker',
  'Static Site Generation',
  'Proxmox',
  'Home Lab',
  'Ai',
  'Raspberry Pi',
  'Wake-on-LAN',
  'Zerotier',
  'VNC',
] as const;

/** adjust this later */
export const CATEGORIES = [
  // add color here
  // extract find function
  {
    name: 'Tutorials',
    icon: 'mdi:teach',
  },
  {
    name: 'Tips&Tricks',
    icon: 'mdi:lightbulb-outline',
  },
  {
    name: 'news',
    icon: 'mdi:announcement-outline',
  },
  {
    name: 'Q.Assistance',
    icon: 'mdi:presentation',
  },
  {
    name: 'AppSec',
    icon: 'mdi:security',
  },
  {
    name: 'tools',
    icon: 'mdi:tools',
  },
  {
    name: 'Article',
    icon: 'mdi:book-open-variant-outline',
  },
] as const;

// use imported images here
export const DEFAULTS_POST = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: DefaultPostHeroImage,
  HERO_ALT: 'Hero image',
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;

export const DEFAULTS_PROJECT = {
  TITLE: DEFAULT_METADATA.title,
  DESCRIPTION: DEFAULT_METADATA.description,
  NO_HERO: false,
  HERO_IMAGE: DefaultProjectHeroImage,
  HERO_ALT: 'Hero image',
  DRAFT: false,
  CATEGORY: CATEGORIES[0].name,
  TOC: true,
} as const;
