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
      <form onSubmit={handleSubmit} className="max-w-7xl pt-12">
        <label htmlFor="text" className="text-1xl">
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
          <button
            className="btn btn-primary join-item"
            type="submit"
          >
            Generate
          </button>
        </div>
      </form>
    </>
  );
}

export default HomePage