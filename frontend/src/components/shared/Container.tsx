import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className="max-w-full px-5 mx-auto">{children}</div>;
};
export default Container;
