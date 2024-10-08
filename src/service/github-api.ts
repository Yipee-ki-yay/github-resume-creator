import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

octokit.request.defaults({
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  }
})

export const getUser = async (username: string) => {
  const user = await octokit.request(`GET /users/${username}`);

  return user?.data;
};

export const getAllRepos = async ({ username, page = 1, prevData, isOnlyRecent = false }: { username: string, page: number, prevData: { [key: string]: string }[], isOnlyRecent?: boolean }): Promise<{ [key: string]: string; }[]> => {
  const reposPerPage = isOnlyRecent ? 10 : 30;
  let data = prevData ? prevData : [];

  const repos = await octokit.request(`GET /users/${username}/repos?per_page=${reposPerPage}&page=${page}&sort=updated`);

  data = data.concat(repos.data);

  if (repos?.data.length == reposPerPage && !isOnlyRecent) {
    return getAllRepos({ username, page: page + 1, prevData: data });
  }

  return data;
};

export const getAllReposLang = async (username: string) => {
  const repos = await getAllRepos({ username, page: 1, prevData: [] });
  const langs: { [key: string]: number } = {};

  for (let i = 0; i < repos.length; i++) {
    const repoName = repos[i].name;
    const repoLangs = await octokit.request(`GET /repos/${username}/${repoName}/languages`);
    const reposLangsData = repoLangs.data;

    for (const lang of Object.keys(reposLangsData)) {
      if (langs[lang]) {
        langs[lang] = langs[lang] + reposLangsData[lang];
      } else {
        langs[lang] = reposLangsData[lang];
      }
    }
  }

  return langs;
}