import { ReactElement } from "react";
import { Carrousel } from "../../components/Carroussel";
import { CardNewsHome } from "./CardNewsHome";

export function Home(): ReactElement {
  return (
    <div>
      <Carrousel />
      <CardNewsHome />
    </div>
  );
}
