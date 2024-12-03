import { ReactElement, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { commentFormSchema, TCommentsFormFields } from "./schema";
import {
  Container,
  InputsSection,
  ErrorContainer,
  UserImg,
  Form,
  ActionSection,
  UserSection,
} from "./styles";
import SendIcon from "../../../assets/icon-send.svg";
import { useZustandStore } from "../../../store";

type TCommentFormProps = {
  formType: "Comment" | "SubComment";
  submitFunction: ({ msg }: TCommentsFormFields) => void;
};

export function CommentForm({
  formType,
  submitFunction,
}: TCommentFormProps): ReactElement {
  const { context, urlSite } = useZustandStore();
  const [user, setUser] = useState<string>("");
  const formMethods = useForm<TCommentsFormFields>({
    mode: "onSubmit",
    resolver: zodResolver(commentFormSchema),
  });

  const {
    reset,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = formMethods;
  const onSubmit: SubmitHandler<TCommentsFormFields> = (): void => {
    const payload = getValues();
    try {
      submitFunction(payload);
      reset();
    } catch (error) {
      console.error("Erro ao salvar msg: ", error);
    }
  };

  useEffect(() => {
    if (
      !context ||
      context === undefined ||
      context.pageContext === undefined ||
      context.pageContext.legacyPageContext === undefined
    )
      return;
    const user: string = context.pageContext.legacyPageContext.userLoginName;
    const userPhotoUrl = `${urlSite}/_layouts/15/userphoto.aspx?UserName=${user}&size=L`;

    setUser(userPhotoUrl);
  }, [context, urlSite]);

  return (
    <Container $formType={formType}>
      <UserSection>
        <UserImg $url={user} />
      </UserSection>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputsSection>
          <label>
            <ActionSection>
              <input {...register("msg")} placeholder="Digite aqui..." />
              <button type="submit" disabled={!isDirty || isSubmitting}>
                <img src={SendIcon} alt="send icone" />
              </button>
            </ActionSection>

            {errors.msg && (
              <ErrorContainer>
                <p role="alert">{errors.msg.message}</p>
              </ErrorContainer>
            )}
          </label>
        </InputsSection>
      </Form>
    </Container>
  );
}
