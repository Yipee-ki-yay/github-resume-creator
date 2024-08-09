import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllRepos } from "../../service/github-api";

const RecentRepos = () => {
  const { username = "" } = useParams();
  const [recentRepos, setRecentRepos] = useState<{ [key: string]: string }[]>(
    []
  );
  const [isLoadingRecentRepos, setIsLoadingRecentRepos] = useState(true);

  useEffect(() => {
    const handleRecentRepos = async () => {
      try {
        const userRecentRepos = await getAllRepos({
          username,
          page: 1,
          prevData: [],
          isOnlyRecent: true,
        });
        setRecentRepos(userRecentRepos);
        setIsLoadingRecentRepos(false);
      } catch (error) {
        console.log("error", error);
        setIsLoadingRecentRepos(false);
      }
    };

    handleRecentRepos();
  }, [username]);

  return (
    <div className="flex flex-col md:flex-row text-left">
      <h3 className="font-serif text-2xl italic md:min-w-80">
        Recently edited repositories
      </h3>
      {isLoadingRecentRepos && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {!isLoadingRecentRepos && (
        <ul className="flex flex-col">
          {recentRepos.length &&
            recentRepos.map((repo) => {
              return (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    className="link link-secondary mb-2"
                    target="_blank"
                  >
                    {repo?.name}
                  </a>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default RecentRepos;
