import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { commentFormSchema, TCommentsFormFields } from "./schema";
import {
  Container,
  FormElementSection,
  ErrorContainer,
  UserImg,
  Form,
  InputSection,
  UserSection,
  NotificationSection,
} from "./styles";
import SendIcon from "../../../assets/icon-send.svg";
import { useZustandStore } from "../../../store";

type TCommentFormProps = {
  id?: string;
  msgToEdit?: string;
  formType: "Comment" | "SubComment" | "EditComment";
  submitFunction: ({ msg }: TCommentsFormFields) => void;
};

export function CommentForm({
  id,
  msgToEdit,
  formType,
  submitFunction,
}: TCommentFormProps): ReactElement {
  const { context, urlSite } = useZustandStore();
  const userPhotoUrl = useMemo(() => {
    return `${urlSite}/_layouts/15/userphoto.aspx?UserName=${context?.pageContext.legacyPageContext.userLoginName}&size=L`;
  }, [urlSite, context?.pageContext.legacyPageContext.userLoginName]);

  const [activateCharacterLength, setActivateCharacterLength] =
    useState<boolean>(false);

  const formMethods = useForm<TCommentsFormFields>({
    mode: "onSubmit",
    resolver: zodResolver(commentFormSchema),
  });

  const {
    setValue,
    watch,
    reset,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = formMethods;

  const msg = watch("msg");
  const msgLength = useMemo(() => {
    return msg !== undefined ? `${msg.length}/255` : "0/255";
  }, [msg]);

  const onSubmit: SubmitHandler<TCommentsFormFields> = (): void => {
    const payload = getValues();

    try {
      submitFunction(payload);
      reset();
    } catch (error) {
      console.error("Erro ao salvar msg: ", error);
    }
  };

  const setMsgData = useCallback(() => {
    if (msgToEdit)
      setValue("msg", msgToEdit, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
  }, [msgToEdit, setValue]);

  useEffect(() => {
    setMsgData();
    if (formType === "EditComment" && id) {
      const input = document.getElementById(id);
      input?.focus();
    }
  }, [formType, id, setMsgData]);

  return (
    <Container $formType={formType}>
      {formType !== "EditComment" && (
        <UserSection>
          <UserImg $url={userPhotoUrl} />
        </UserSection>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormElementSection>
          <label>
            <InputSection>
              <input
                id={id}
                {...register("msg")}
                onFocus={() => setActivateCharacterLength(true)}
                onBlur={() => setActivateCharacterLength(false)}
                placeholder="Digite aqui..."
                maxLength={255}
                autoComplete="off"
              />
              <button type="submit" disabled={!isDirty || isSubmitting}>
                <img src={SendIcon} alt="send icone" />
              </button>
            </InputSection>

            {errors.msg || activateCharacterLength ? (
              <NotificationSection>
                <ErrorContainer>
                  {errors.msg ? <p role="alert">{errors.msg.message}</p> : null}
                </ErrorContainer>

                {activateCharacterLength && <p>{msgLength}</p>}
              </NotificationSection>
            ) : null}
          </label>
        </FormElementSection>
      </Form>
    </Container>
  );
}
