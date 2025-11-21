import { ServiceItem } from './types';
import { 
  Gamepad2, 
  Store, 
  TrendingUp, 
  Users, 
  BrainCircuit, 
  Smartphone 
} from 'lucide-react';

export const APP_NAME = "Retail Next Level";

export const SERVICES: ServiceItem[] = [
  {
    title: "Retail Space Gamification",
    description: "Transforming physical store layouts into immersive, game-like environments that encourage exploration.",
    icon: "Store"
  },
  {
    title: "Loyalty Program 2.0",
    description: "Moving beyond points. We design achievement-based systems that reward engagement, not just spending.",
    icon: "Gamepad2"
  },
  {
    title: "AR & Phygital Experiences",
    description: "Bridging the gap between digital and physical retail with Augmented Reality scavenger hunts and interactions.",
    icon: "Smartphone"
  },
  {
    title: "Consumer Behavior Analysis",
    description: "Using data analytics to understand player types within your customer base and tailoring experiences to them.",
    icon: "TrendingUp"
  },
  {
    title: "Employee Engagement",
    description: "Gamifying the sales floor to motivate staff, improve product knowledge, and enhance customer service.",
    icon: "Users"
  },
  {
    title: "AI-Driven Personalization",
    description: "Implementing smart systems that adapt the retail journey in real-time based on customer actions.",
    icon: "BrainCircuit"
  }
];