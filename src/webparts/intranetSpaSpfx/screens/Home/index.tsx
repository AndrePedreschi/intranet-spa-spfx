import { ReactElement } from "react";
import { Carrousel } from "../../components/Carroussel";
import { CardNews } from "../../components/CardNews";

export function Home(): ReactElement {
  return (
    <div>
      <Carrousel />
      <CardNews />
    </div>
  );
}
