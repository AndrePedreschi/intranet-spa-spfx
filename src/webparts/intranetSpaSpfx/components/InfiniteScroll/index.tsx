import { ReactNode, useCallback, useEffect, useRef } from "react";

//import { TempoLoading } from '@tempo/dist-react';

import { Container, LoaderContainer, EndOfContentContainer } from "./styles";

type TInfiniteScrollProps = {
  children: ReactNode;
  endOfListMsg?: string;
  page: number | null;
  totalPages: number | null;
  loading?: boolean;
  scrollRequestLoading?: boolean;
  handlerPageChange: (page: number) => void;
};

export const InfiniteScroll = ({
  children,
  endOfListMsg = "Não há mais registros.",
  page,
  totalPages,
  scrollRequestLoading = false,
  handlerPageChange,
}: TInfiniteScrollProps) => {
  /**
   * Height of the functionality's operating range at the end of the list.
   * @constant {number} heightRangeToActivate - Value in pixels that defines the height limit to activate the functionality.
   */
  const heightRangeToActivate = 500;
  const divRef = useRef<HTMLDivElement>(null);
  const requestControllerRef = useRef<number | null>(null);

  const endContentCondition =
    page !== null && totalPages !== null && page === totalPages;

  const handleScroll = useCallback(async () => {
    if (!divRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = divRef.current;
    if (
      page &&
      page !== requestControllerRef.current &&
      totalPages &&
      page < totalPages &&
      scrollTop + clientHeight >= scrollHeight - heightRangeToActivate
    ) {
      handlerPageChange(page + 1);
      requestControllerRef.current = page;
    }
  }, [handlerPageChange, page, totalPages]);

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

      {endContentCondition && (
        <EndOfContentContainer>
          <p>{endOfListMsg}</p>
        </EndOfContentContainer>
      )}
      {scrollRequestLoading && <LoaderContainer>loading</LoaderContainer>}
    </Container>
  );
};
