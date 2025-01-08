import { ReactElement } from "react";
import { Carroussel } from "../../components/Carroussel";
import { CardNewsHome } from "./CardNewsHome";

export function Home(): ReactElement {
  return (
    <>
      <Carroussel />
      <CardNewsHome />
    </>
  );
}
