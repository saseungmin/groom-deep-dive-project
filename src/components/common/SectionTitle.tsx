interface SectionTitleProps {
  title: string;
  description?: string;
}

const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
