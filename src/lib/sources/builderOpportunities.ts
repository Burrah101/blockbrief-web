import { BuilderOpportunity } from "./types";

export async function getBuilderOpportunities(): Promise<BuilderOpportunity[]> {
  try {
    const opportunities: BuilderOpportunity[] = [
      {
        title: "Project Catalyst",
        ecosystem: "Cardano",
        category: "Grant",
        description: "Official Cardano community funding program.",
        url: "https://projectcatalyst.io/",
      },

      {
        title: "ETHGlobal Hackathons",
        ecosystem: "Ethereum",
        category: "Hackathon",
        description:
          "Official Ethereum hackathons for developers and startups.",
        url: "https://ethglobal.com/events",
      },

      {
        title: "Monad Builder Program",
        ecosystem: "Monad",
        category: "Grant",
        description:
          "Official Monad ecosystem grants and builder opportunities.",
        url: "https://www.monad.xyz/",
      },

      {
        title: "Gitcoin Grants",
        ecosystem: "Multi-chain",
        category: "Grant",
        description:
          "Funding opportunities for open-source builders.",
        url: "https://www.gitcoin.co/grants",
      },

      {
        title: "DoraHacks",
        ecosystem: "Multi-chain",
        category: "Hackathon",
        description:
          "Hackathons, grants and bounty opportunities.",
        url: "https://dorahacks.io/",
      },

      {
        title: "Encode Club Bootcamps",
        ecosystem: "Multi-chain",
        category: "Event",
        description:
          "Developer bootcamps, accelerators and educational events.",
        url: "https://www.encode.club/",
      },

      {
        title: "EasyA Competitions",
        ecosystem: "Multi-chain",
        category: "Hackathon",
        description:
          "Student and developer competitions across Web3 ecosystems.",
        url: "https://www.easya.io/",
      },
    ];

    return opportunities;
  } catch (error) {
    console.error("Builder Opportunities:", error);
    return [];
  }
}