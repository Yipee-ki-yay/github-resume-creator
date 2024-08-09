import { getAllReposLang } from "../service/github-api"

export const calcReposLangPercent = async (username: string) => {
  const langs = await getAllReposLang(username);
  let langBitesAmount = 0;
  const langsPercent: { [key: string]: number } = {}

  for (const lang of Object.keys(langs)) {
    langBitesAmount += langs[lang];
  }

  for (const lang of Object.keys(langs)) {
    const currentLangPercent = Number((langs[lang] * 100 / langBitesAmount).toFixed(2));
    if (currentLangPercent == 0) {
      continue;
    }
    langsPercent[lang] = currentLangPercent;
  }

  return langsPercent;
}