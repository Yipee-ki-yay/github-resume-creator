import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../service/github-api";
import { formatDate } from "../utils/date";
import { calcReposLangPercent } from "../utils/repos";

type UserDataType = {
  avatar_url?: string;
  bio?: string;
  blog?: string;
  company?: string | null;
  created_at: string;
  email?: string;
  events_url?: string;
  followers?: number;
  followers_url?: string;
  following?: number;
  following_url?: string;
  gists_url?: string;
  gravatar_id?: string;
  hireable?: boolean;
  html_url?: string;
  id?: number;
  location?: string;
  login?: string;
  name?: string;
  node_id?: string;
  organizations_url?: string;
  public_gists?: number;
  public_repos?: number;
  received_events_url?: string;
  repos_url?: string;
  site_admin?: false;
  starred_url?: string;
  subscriptions_url?: string;
  twitter_username?: string;
  type?: string;
  updated_at?: string;
  url?: string;
};

const ResumePage = () => {
  const { username = "" } = useParams();
  const [userData, setUserData] = useState<UserDataType>({});
  const [reposLang, setReposLang] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReposLang, setIsLoadingReposLang] = useState(true);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const user = await getUser(username);
        setUserData(user);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };

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

    handleGetUser();
    handleReposLang();
  }, [username]);

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!isLoading && !Object.keys(userData).length) {
    return (
      <>
        <p className="text-2xl">
          User with such username wasn't found, try to enter another username
        </p>
        <Link to="/" className="btn btn-primary mt-4">
          Back to generator
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="card bg-base-300 rounded-box p-10">
        <header className="text-left">
          <h1 className="text-3xl font-bold uppercase">{userData?.name}</h1>
          <p className="text-base mt-2">{userData?.bio}</p>
        </header>
        <div className="divider"></div>
        <div className="flex text-left">
          <h3 className="font-serif text-2xl italic min-w-80">
            Public repositories
          </h3>
          <span className="text-2xl">{userData?.public_repos}</span>
        </div>
        <div className="divider"></div>
        <div className="flex text-left">
          <h3 className="font-serif text-2xl italic min-w-80">Member since</h3>
          <span className="text-2xl">{formatDate(userData?.created_at)}</span>
        </div>
        <div className="divider"></div>

        <div className="flex text-left">
          <h3 className="font-serif text-2xl italic min-w-80">Languages</h3>
          {isLoadingReposLang && (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {!isLoadingReposLang && (
            <div className="flex flex-col">
              {Object.keys(reposLang).length &&
                Object.keys(reposLang).map((lang) => {
                  return (
                    <div key={lang} className="w-56 mt-2">
                      <div className="flex justify-between">
                        <span className="text-xl">{lang}</span>
                        <span>{reposLang[lang]}%</span>
                      </div>
                      <progress
                        className="progress progress-primary"
                        value={reposLang[lang]}
                        max="100"
                      ></progress>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <Link to="/" className="btn btn-primary mt-4">
        Back to generator
      </Link>
    </>
  );
};

export default ResumePage;
