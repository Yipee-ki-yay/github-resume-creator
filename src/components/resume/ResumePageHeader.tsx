import { UserDataType } from "./ResumePage";

const ResumePageHeader = ({ userData }: { userData: UserDataType }) => {
  return (
    <>
      <header className="text-left">
        <h1 className="text-3xl font-bold uppercase">{userData?.name}</h1>
        <p className="text-base mt-2">{userData?.bio}</p>
      </header>
      <div className="divider"></div>
    </>
  );
};

export default ResumePageHeader;
