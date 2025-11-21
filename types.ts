export enum ViewState {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  AI_LAB = 'AI_LAB',
  CONTACT = 'CONTACT'
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface GamificationIdea {
  conceptName: string;
  mechanic: string;
  expectedOutcome: string;
}

export interface AIResponseState {
  isLoading: boolean;
  data: GamificationIdea[] | null;
  error: string | null;
}