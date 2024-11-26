import { ReactElement } from "react";

import { Dots } from "./styles";
export const Loading = (): ReactElement => {
  return (
    <Dots>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </Dots>
  );
};
