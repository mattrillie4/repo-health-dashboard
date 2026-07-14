export type Repo = {
  owner: string;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  primaryLanguage: string;
  hasReadme: boolean;
  hasLicense: boolean;
  hasCi: boolean;
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
