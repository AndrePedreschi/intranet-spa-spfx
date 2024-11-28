import { ReactElement } from "react";

import { Container, Input } from "./styles";

type TCommentFormProps = {
  submitFunction: (msg: string) => void;
};

export function CommentForm({
  submitFunction,
}: TCommentFormProps): ReactElement {
  return (
    <Container>
      <Input />
    </Container>
  );
}
