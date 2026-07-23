export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> },
): Promise<Response> {
  const { owner, repo } = await params;
  try {
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
    return Response.json(repository);
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
