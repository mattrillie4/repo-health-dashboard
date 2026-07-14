import RepoSummary from "@/components/RepoSummary";
import { Repo } from "@/lib/types";

// create dummy repo
const fakeRepo: Repo = {
  owner: "facebook",
  name: "react",
  fullName: "facebook/react",
  description: "The library for web and native user interfaces.",
  stars: 230000,
  forks: 47000,
  primaryLanguage: "JavaScript",
  hasReadme: true,
  hasLicense: true,
  hasCi: true,
  openIssues: 1200,
  openPullRequests: 430,
  updatedAt: "2026-07-01",
  score: 86,
  tips: [
    "Add a short architecture section to the README.",
    "Label beginner-friendly issues to help contributors.",
    "Document the test command clearly.",
  ],
  languages: [
    { name: "JavaScript", percentage: 72 },
    { name: "TypeScript", percentage: 18 },
    { name: "CSS", percentage: 10 },
  ],
};

export default function Home() {
  return (
    <main>
      <h1 className="text-gray-900 text-3xl p-5">Repo Health Dashboard</h1>
      <RepoSummary repo={fakeRepo} />
    </main>
  );
}
