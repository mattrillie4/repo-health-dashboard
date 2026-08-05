import { Repo } from "@/lib/types";

type RepoSummaryProps = {
  repo: Repo;
};

export default function RepoSummary({ repo }: RepoSummaryProps) {
  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight text-slate-950">
          {repo.fullName}
        </h1>
        <span className="shrink-0 rounded-lg bg-emerald-50 px-3 py-2 text-center text-lg font-semibold leading-none text-emerald-700 ring-1 ring-inset ring-emerald-200">
          {repo.score}
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-wide text-emerald-600">
            Health score
          </span>
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <p>Owner: {repo.owner}</p>
        <p>Repository: {repo.name}</p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Repository overview
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <p className="rounded-lg border border-slate-200 px-3 py-3">
            <span className="block text-lg font-semibold text-slate-900">
              {repo.stars.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">Stars</span>
          </p>
          <p className="rounded-lg border border-slate-200 px-3 py-3">
            <span className="block text-lg font-semibold text-slate-900">
              {repo.forks.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">Forks</span>
          </p>
          <p className="rounded-lg border border-slate-200 px-3 py-3">
            <span className="block text-lg font-semibold text-slate-900">
              {repo.openIssues.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">Open issues</span>
          </p>
          <p className="rounded-lg border border-slate-200 px-3 py-3">
            <span className="block text-lg font-semibold text-slate-900">
              {repo.openPullRequests.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">Open PRs</span>
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <p
            className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${repo.hasReadme ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-amber-50 text-amber-700 ring-amber-200"}`}
          >
            README {repo.hasReadme ? "available" : "missing"}
          </p>
          <p
            className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${repo.hasLicense ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-amber-50 text-amber-700 ring-amber-200"}`}
          >
            License {repo.hasLicense ? "available" : "missing"}
          </p>
          <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
            {repo.primaryLanguage ?? "Language not detected"}
          </p>
        </div>
        <h2 className="mb-2 pt-6 text-sm font-semibold text-slate-900">
          Language breakdown
        </h2>
        {repo.languages.map((lang) => (
          <div
            key={lang.name}
            className="border-b border-slate-100 py-2.5 last:border-0"
          >
            <p className="mb-1.5 flex justify-between">
              <span>{lang.name}</span>
              <span className="font-medium text-slate-700">
                {lang.percentage.toFixed(1)}%
              </span>
            </p>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-600"
                style={{ width: `${lang.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 border-t border-slate-100 pt-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Health tips
        </h2>
        {repo.tips.length > 0 ? (
          repo.tips.map((tip) => (
            <div
              key={tip}
              className="mb-2 border-l-2 border-amber-400 bg-amber-50/60 px-4 py-3 last:mb-0"
            >
              <p className="text-sm leading-6 text-slate-700">{tip}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No tips at the moment.</p>
        )}
      </div>

      <div className="mt-7 rounded-lg bg-slate-50 p-4 ring-1 ring-inset ring-slate-100">
        <h2 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          About this repository
        </h2>
        <p className="text-sm leading-6 text-slate-700">
          {repo.description ?? "No description provided"}
        </p>
      </div>
    </div>
  );
}
