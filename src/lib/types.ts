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

// type for the normalized response returned by our Next.js API endpoint
export type RepoApiData = {
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  hasReadme: boolean;
  readmeLength: number;
  hasLicense: boolean;
  openIssues: number;
  openPullRequests: number;
  updatedAt: string;
  languagePercentages: {
    name: string;
    percentage: number;
  }[];
};

// type for the general repo response from the Github REST API
export type GitHubRepositoryResponse = {
  name: string;
  owner: {
    login: string;
  };
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  updated_at: string;
  license: {
    key: string;
    name: string;
  } | null;
};

// type created for open issues and open pull requests
// uses github search API structure instead
export type GitHubSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
};

// type created for the language percentage spread request
// returned from a separate github search query
export type GitHubLanguagesResponse = Record<string, number>;

// type for readme response
export type GitHubReadmeResponse = {
  size: number;
};

/*Types for Repo Health Checks */
export type HealthCheck = {
  id: string;
  label: string;
  passed: boolean;
  points: number;
  maxPoints: number;
  tip?: string;
}; // type for each individual check/criteria

export type HealthResult = {
  score: number;
  checks: HealthCheck[];
  tips: string[];
}; // type for the final score outcome for the repo
// contains the array of checks

export type RepoApiResponse = RepoApiData & HealthResult;
