//imports
import type { HealthCheck, HealthResult, RepoApiData } from "@/lib/types";

type RepoHealthInput = Pick<
  RepoApiData,
  "description" | "hasReadme" | "hasLicense" | "updatedAt" | "readmeLength"
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
    daysSinceUpdate <= 60;

  function scoreRecentActivity(days: number): {
    points: number;
    message: string;
    passed: boolean;
  } {
    if (days < 10)
      return {
        points: 25,
        message: "Repository has been recently updated",
        passed: true,
      };
    if (days < 30)
      return {
        points: 20,
        message: "Repository has been maintained this month",
        passed: true,
      };
    if (days < 90)
      return {
        points: 10,
        message: "Repo may need need maintenance",
        passed: false,
      };
    if (days > 120)
      return {
        points: 0,
        message:
          "Consider reviewing or updating the code if project is still live",
        passed: false,
      };
    return {
      points: 0,
      message: "default",
      passed: true,
    };
  }
  const recentActivityScore = scoreRecentActivity(daysSinceUpdate); // apply the scoring

  // bool that checks if the repo contains a description
  const hasDescription =
    repo.description !== null && repo.description.trim().length > 0;

  // calculate points based on readme length
  function scoreReadmeLength(len: number): {
    points: number;
    message: string;
    passed: boolean;
  } {
    if (len == 0)
      return { points: 0, message: "Add content to the readme", passed: false };
    if (len < 700)
      return {
        points: 5,
        message: "Explain all features of the repo in the README.",
        passed: false,
      };
    if (len > 10500)
      return {
        points: 10,
        message: "Make sure the README is efficient and not too crowded",
        passed: false,
      };

    if (len >= 700)
      return {
        points: 15,
        message: "Appropriate README length",
        passed: true,
      };
    return { points: 0, message: "default", passed: true };
  }
  const readmeLengthScore = scoreReadmeLength(repo.readmeLength);

  // array of checks for various criteria
  const checks: HealthCheck[] = [
    {
      id: "readme",
      label: "Repository has a README",
      passed: repo.hasReadme,
      points: repo.hasReadme ? 15 : 0,
      maxPoints: 15,
      tip: "Add a README explaining the repository and how to use it.",
    },
    {
      id: "readme length",
      label: "Repository has an adequate README length",
      passed: readmeLengthScore.passed,
      points: readmeLengthScore.points,
      maxPoints: 15,
      tip: readmeLengthScore.message,
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
      label: "Repository is actively being updated",
      passed: recentActivityScore.passed,
      points: recentActivityScore.points,
      maxPoints: 25,
      tip: recentActivityScore.message,
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
