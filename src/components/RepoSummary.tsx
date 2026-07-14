import { Repo } from "@/lib/types";

export default function RepoSummary({ repo }: { repo: Repo }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <h1 className="font-semibold text-lg">{repo.fullName}</h1>
        <span className="text-sm font-medium px-2 py-1 rounded bg-green-100 text-green-700">
          {repo.score}
        </span>
      </div>
      <div className="text-xs mt-2">
        <p className="italic">Owner: {repo.owner}</p>
        <p className="italic">Name: {repo.name}</p>
      </div>

      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <h1 className="text-black">Primary Language: {repo.primaryLanguage}</h1>
        <p>⭐ {repo.stars} stars</p>
        <p>🐛 {repo.openIssues} open issues</p>
        <p>🍴 {repo.forks} forks</p>
        <p>🔀 {repo.openPullRequests} open PRs</p>
        <p>Contains README? {repo.hasReadme ? "✅" : "❌"}</p>
        <p>Contains License? {repo.hasLicense ? "✅" : "❌"}</p>
      </div>

      <div className="text-s mt-3 bg-gray-50 rounded-lg p-4">
        <p className="text-gray-900 text-sm">{repo.description}</p>
      </div>
    </div>
  );
}
