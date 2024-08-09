import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calcReposLangPercent } from "../../utils/repos";

const RepoLanguages = () => {
  const { username = "" } = useParams();
  const [reposLang, setReposLang] = useState<{ [key: string]: number }>({});
  const [isLoadingReposLang, setIsLoadingReposLang] = useState(true);

  useEffect(() => {
    const handleReposLang = async () => {
      try {
        const reposLangPercent = await calcReposLangPercent(username);
        setReposLang(reposLangPercent);
        setIsLoadingReposLang(false);
      } catch (error) {
        console.log("error", error);
        setIsLoadingReposLang(false);
      }
    };

    handleReposLang();
  }, [username]);

  return (
    <>
      <div className="flex flex-col md:flex-row text-left">
        <h3 className="font-serif text-2xl italic md:min-w-80">Languages</h3>
        {isLoadingReposLang && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {!isLoadingReposLang && (
          <ul className="flex flex-col">
            {Object.keys(reposLang).length &&
              Object.keys(reposLang).map((lang) => {
                return (
                  <li key={lang} className="w-56 mt-2">
                    <div className="flex justify-between">
                      <span className="text-xl">{lang}</span>
                      <span>{reposLang[lang]}%</span>
                    </div>
                    <progress
                      className="progress progress-primary"
                      value={reposLang[lang]}
                      max="100"
                    ></progress>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <div className="divider"></div>
    </>
  );
};

export default RepoLanguages;
