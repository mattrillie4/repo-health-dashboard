//imports
import type { HealthCheck, HealthResult, RepoApiData } from "@/lib/types";

type RepoHealthInput = Pick<
  RepoApiData,
  "description" | "hasReadme" | "hasLicense" | "updatedAt"
>; // pick only relevant information from repo response

export function calculateRepoHealth(
  repo: RepoHealthInput,
  now = new Date(),
): HealthResult {
  const updatedAt = new Date(repo.updatedAt);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const daysSinceUpdate =
    (now.getTime() - updatedAt.getTime()) / millisecondsPerDay;

  // bool to check if the repo was recently updated
  const wasRecentlyUpdated =
    Number.isFinite(daysSinceUpdate) &&
    daysSinceUpdate >= 0 &&
    daysSinceUpdate <= 180;

  // bool that checks if the repo contains a description
  const hasDescription =
    repo.description !== null && repo.description.trim().length > 0;

  // array of checks for various criteria
  const checks: HealthCheck[] = [
    {
      id: "readme",
      label: "Repository has a README",
      passed: repo.hasReadme,
      points: repo.hasReadme ? 30 : 0,
      maxPoints: 30,
      tip: "Add a README explaining the repository and how to use it.",
    },
    {
      id: "license",
      label: "Repository has a license",
      passed: repo.hasLicense,
      points: repo.hasLicense ? 25 : 0,
      maxPoints: 25,
      tip: "Add a license so others know how they can use the project.",
    },
    {
      id: "description",
      label: "Repository has a description",
      passed: hasDescription,
      points: hasDescription ? 20 : 0,
      maxPoints: 20,
      tip: "Add a concise repository description.",
    },
    {
      id: "recent-activity",
      label: "Repository was updated within 180 days",
      passed: wasRecentlyUpdated,
      points: wasRecentlyUpdated ? 25 : 0,
      maxPoints: 25,
      tip: "Review whether the project is still actively maintained.",
    },
  ];

  const earnedPoints = checks.reduce((total, check) => total + check.points, 0);

  const availablePoints = checks.reduce(
    (total, check) => total + check.maxPoints,
    0,
  );

  const score =
    availablePoints === 0
      ? 0
      : Math.round((earnedPoints / availablePoints) * 100);

  const tips = checks
    .filter((check) => !check.passed && check.tip)
    .map((check) => check.tip as string);

  return {
    score,
    checks,
    tips,
  };
}
