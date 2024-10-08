import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/${text}`);
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Github Résumé Generator</h1>
      <p className="text-lg text-justify mt-2">
        The GitHub-Based Resume Generator is a powerful tool designed to create
        a professional resume by analyzing a user's GitHub profile. Simply input
        your GitHub username, and the program will automatically generate a
        detailed resume highlighting your technical skills, projects,
        contributions, and work experience based on your public repositories and
        activity.
      </p>
      <form onSubmit={handleSubmit} className="max-w-7xl pt-12">
        <label htmlFor="text" className="text-lg">
          Enter your GitHub username and click on generate
        </label>
        <div className="join w-full mt-4">
          <input
            id="text"
            type="text"
            placeholder="Enter your GitHub username"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary join-item" type="submit">
            Generate
          </button>
        </div>
      </form>
    </>
  );
};

export default HomePage;
