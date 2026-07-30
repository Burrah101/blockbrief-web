// Shared data models for every BlockBrief source

export interface Headline {
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;

  importance: number; // 1-100
}

export interface BuilderOpportunity {
  title: string;
  ecosystem: string;
  category:
    | "Grant"
    | "Hackathon"
    | "Job"
    | "Bounty"
    | "Funding"
    | "Event";

  description: string;
  url: string;
  deadline?: string;
}

export interface EcosystemNews {
  ecosystem: string;

  headlines: Headline[];

  builderUpdates: Headline[];

  opportunities: BuilderOpportunity[];

  score: number;

  summary: string;
}

export interface MacroEvent {
  title: string;

  summary: string;

  date: string;

  source: string;

  url: string;
}

export interface NewsletterData {
  generatedAt: string;

  marketPulse: string;

  ecosystems: EcosystemNews[];

  macro: MacroEvent[];

  builderOpportunities: BuilderOpportunity[];
}