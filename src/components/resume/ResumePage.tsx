import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../service/github-api";
import { formatDate } from "../../utils/date";
import ResumePageHeader from "./ResumePageHeader";
import ResumeInfoSection from "./ResumeInfoSection";
import RepoLanguages from "./RepoLanguages";
import RecentRepos from "./RecentRepos";

export type UserDataType = {
  avatar_url?: string;
  bio?: string;
  blog?: string;
  company?: string | null;
  created_at?: string;
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
  const [isLoading, setIsLoading] = useState(true);

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

    handleGetUser();
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
        <ResumePageHeader userData={userData} />
        <ResumeInfoSection
          title="Public repositories"
          description={userData?.public_repos}
        />
        <ResumeInfoSection
          title="Member since"
          description={formatDate(userData?.created_at)}
        />
        <RepoLanguages />
        <RecentRepos />
      </div>

      <Link to="/" className="btn btn-primary mt-4">
        Back to generator
      </Link>
    </>
  );
};

export default ResumePage;
