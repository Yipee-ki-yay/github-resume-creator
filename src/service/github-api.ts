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

export const getAllRepos = async (username: string, page: number = 1, prevData: { [key: string]: string }[]): Promise<{ [key: string]: string; }[]> => {
  const reposPerPage = 30;
  let data = prevData ? prevData : [];

  const repos = await octokit.request(`GET /users/${username}/repos?per_page=${reposPerPage}&page=${page}`);

  data = data.concat(repos.data);

  if (repos?.data.length == reposPerPage) {
    return getAllRepos(username, page + 1, data);
  }

  return data;
};

export const getAllReposLang = async (username: string) => {
  const repos = await getAllRepos(username, 1, []);
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