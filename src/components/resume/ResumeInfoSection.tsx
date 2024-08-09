const ResumeInfoSection = ({
  title,
  description,
}: {
  title: string;
  description?: number | string;
}) => {
  return (
    <>
      <section className="flex flex-col md:flex-row text-left">
        <h3 className="font-serif text-2xl italic md:min-w-80">{title}</h3>
        <span className="text-2xl">{description}</span>
      </section>
      <div className="divider"></div>
    </>
  );
};

export default ResumeInfoSection;
