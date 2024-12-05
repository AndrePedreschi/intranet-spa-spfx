import { ReactElement } from "react";

import { Dots } from "./styles";
export const Loader = (): ReactElement => {
  return (
    <Dots>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </Dots>
  );
};
