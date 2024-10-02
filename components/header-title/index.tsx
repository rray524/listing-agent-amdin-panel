import React from "react";

interface TitleProps {
  children: React.ReactNode;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  children,
  level = "h1",
  className = "",
}) => {
  const Heading = level;
  return (
    <Heading className={`text-2xl font-bold text-center ${className}`}>
      {children}
    </Heading>
  );
};

export default Title;
