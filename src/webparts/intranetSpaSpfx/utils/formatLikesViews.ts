export const formatStringToArray = (
  dataReceived: string | null | undefined,
): number[] => {
  if (
    dataReceived === undefined ||
    dataReceived === null ||
    dataReceived === ""
  ) {
    return [];
  } else {
    const parsedLikes = dataReceived.split(",").map((num) => parseInt(num, 10));
    return parsedLikes;
  }
};

export const formatArrayToString = (dataReceived: number[]): string => {
  if (!Array.isArray(dataReceived)) {
    return "";
  } else {
    const parsedLikes = dataReceived.join(",");
    return parsedLikes;
  }
};
