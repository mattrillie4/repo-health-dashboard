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
export type GithubSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
};

// type created for the language percentage spread request
// returned from a separate github search query
export type GithubLanguagesResponse = Record<string, number>;
