import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
};

type CardHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
};

export const CardHeader = ({
  children,
  className = "",
  icon,
  title,
}: CardHeaderProps) => {
  if (icon && title) {
    return (
      <div
        className={`flex items-center gap-2 border-b border-neutral-200 px-6 py-4 h-[72px] ${className}`}
      >
        {icon}
        <h2 className="text-xl font-medium text-primary">{title}</h2>
      </div>
    );
  }

  return (
    <div
      className={`border-b border-neutral-200 px-6 py-4 h-[72px] ${className}`}
    >
      {children}
    </div>
  );
};

type CardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardBody = ({ children, className = "" }: CardBodyProps) => {
  return <div className={`p-4 md:p-6 ${className}`}>{children}</div>;
};

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardFooter = ({ children, className = "" }: CardFooterProps) => {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
};
