import { ReactElement, ReactNode, useCallback, useEffect, useRef } from "react";

import { Container, LoaderContainer, EndOfContentContainer } from "./styles";
import { Loader } from "../Loader";

type TInfiniteScrollProps = {
  children: ReactNode;
  endOfListMsg?: string;
  endOfListCondition: boolean;
  scrollRequestLoading?: boolean;
  nextUrlRequest: string;
  handlerPageChange: () => void;
};

export const InfiniteScroll = ({
  children,
  endOfListMsg = "Não há mais registros.",
  endOfListCondition,
  scrollRequestLoading = false,
  nextUrlRequest,
  handlerPageChange,
}: TInfiniteScrollProps): ReactElement => {
  /**
   * Height of the functionality's operating range at the end of the list.
   * @constant {number} heightRangeToActivate - Value in pixels that defines the height limit to activate the functionality.
   */
  const heightRangeToActivate = 500;
  const divRef = useRef<HTMLDivElement>(null);
  const requestControllerRef = useRef<string | null>(null);

  const handleScroll = useCallback(async () => {
    if (!divRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = divRef.current;
    if (
      !endOfListCondition &&
      nextUrlRequest !== requestControllerRef.current &&
      scrollTop + clientHeight >= scrollHeight - heightRangeToActivate
    ) {
      handlerPageChange();
      requestControllerRef.current = nextUrlRequest;
    }
  }, [endOfListCondition, handlerPageChange, nextUrlRequest]);

  useEffect(() => {
    const ref = divRef.current;
    ref?.addEventListener("scroll", handleScroll);
    return () => {
      ref?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Container ref={divRef}>
      {children}

      {endOfListCondition && (
        <EndOfContentContainer>
          <p>{endOfListMsg}</p>
        </EndOfContentContainer>
      )}
      {scrollRequestLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </Container>
  );
};
