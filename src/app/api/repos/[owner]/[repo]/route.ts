//input validation helper function
function isValidInput(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 100 &&
    !value.includes("/") &&
    !value.includes("\\")
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> },
): Promise<Response> {
  const routeParams = await params; //extract params for input validation

  const owner = routeParams.owner.trim();
  const repo = routeParams.repo.trim();

  if (!isValidInput(owner) || !isValidInput(repo)) {
    return Response.json(
      {
        error: "Invalid repository owner or name",
      },
      { status: 400 },
    );
  }
  try {
    // search for repository summary information
    const githubResponse = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      },
    );

    //validate response
    if (!githubResponse.ok) {
      const githubError = (await githubResponse.json().catch(() => null)) as {
        message?: string;
      } | null;
      //return error response
      return Response.json(
        {
          error: githubError?.message ?? "Github request failed",
        },
        {
          status: githubResponse.status,
        },
      );
    }
    // return response as json if valid
    const repository = await githubResponse.json();

    // search for amount of pull requests
    const pullRequestsResponse = await fetch(
      `https://api.github.com/search/issues?q=repo:${encodeURIComponent(owner)}/${encodeURIComponent(repo)} is:pr is:open`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      },
    );
    if (!pullRequestsResponse.ok) {
      return Response.json(
        {
          error: "Unable to retrieve pull requests",
        },
        { status: pullRequestsResponse.status },
      );
    }
    const pullRequests = await pullRequestsResponse.json();
    const openPullRequests = pullRequests.total_count;

    // return combined object response with all requests
    return Response.json({
      owner: repository.owner.login,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      primaryLanguage: repository.language,
      openIssues: repository.open_issues_count,
      openPullRequests,
      updatedAt: repository.updated_at,
      hasLicense: Boolean(repository.license),
    });
  } catch {
    return Response.json(
      {
        error: "Unable to connect to GitHub",
      },
      {
        status: 502,
      },
    );
  }
}
