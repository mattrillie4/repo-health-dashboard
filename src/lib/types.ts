export type Repo = {
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  hasReadme: boolean;
  hasLicense: boolean;
  openIssues: number;
  openPullRequests: number;
  updatedAt: string;
  score: number;
  tips: string[];
  languages: {
    name: string;
    percentage: number;
  }[];
};
