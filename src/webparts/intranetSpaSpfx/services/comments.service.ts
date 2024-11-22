import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TGetCommentsListResponse = {
  Id: number;
  Likes: string;
  IdNoticia: number;
  Comentario: string;
  Created: string;
  AuthorId: number;
};

export const getCommentsList = async (
  context: WebPartContext,
  newsId: number,
): Promise<TGetCommentsListResponse> => {
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Comentarios')/items`;
  const select = `?$select=Id,Likes,IdNoticia,Comentario,Created,AuthorId`;
  const filter = `$filter=IdNoticia eq ${newsId}`;
  const orderBy = `&$orderby=Created asc`;

  const response = await context.spHttpClient.get(
    `${urlBase}${select}&${filter}&${orderBy}`,
    SPHttpClient.configurations.v1,
  );

  if (!response || (response && !response.ok)) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseJson = await response.json();
  return responseJson.value;
};

export const postNewComment = async (
  context: WebPartContext,
  requestBody: any,
): Promise<void> => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Comentarios')/items`;

  //Exemplo de body a ser enviado
  /* const body = JSON.stringify({
    Likes: "[]",
    Comentario:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et est euismod, tristique ante in, vestibulum ligula. Maecenas tempor lacus quam, nec posuere quam laoreet vitae. In mi ligula, pulvinar et mi vel, interdum commodo urna. Donec mauris lacus, placerat quis nisl a, bibendum rhoncus neque. Praesent vel ipsum orci. Integer et turpis vel mauris rhoncus malesuada in eu dolor. Curabitur id ullamcorper arcu.Aliquam erat volutpat. Vivamus et quam elementum, dapibus nisi vel, laoreet ante. Quisque eget maximus mauris, eu tempus nibh. Vestibulum convallis, magna sit amet posuere maximus, nibh ipsum vestibulum libero, a hendrerit felis arcu vitae dolor. Vivamus vel venenatis arcu. Sed vitae ipsum lorem. Maecenas nibh purus, fringilla nec sem a, vestibulum mollis dui. Aliquam tincidunt sapien posuere erat posuere, eu consequat erat tempor. Pellentesque consectetur egestas massa. Curabitur interdum mattis erat. Suspendisse leo leo, suscipit eget sem ac, maximus ultrices sapien. Proin at porta sem. Aliquam in mi viverra, suscipit enim aliquet, vulputate sem. Pellentesque ac efficitur est. Nunc congue arcu sit amet odio dapibus placerat. Pellentesque id sollicitudin neque.Phasellus tincidunt, sapien et laoreet elementum, dui erat condimentum justo, quis vulputate tortor lacus non quam. Vestibulum finibus elementum arcu sit amet efficitur. Vivamus pellentesque, lorem vitae molestie sagittis, lectus massa dignissim ante, at congue sapien est quis eros. Duis pellentesque odio quis molestie condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer et leo lorem. Phasellus semper leo felis, vitae pretium mi blandit ac. Quisque blandit in augue eu eleifend. Ut vulputate purus neque, quis luctus ante bibendum aliquam. Mauris quis efficitur enim. Mauris nibh eros, dignissim at leo vel, pretium suscipit nulla. Quisque in maximus urna, id maximus nisi. Integer ullamcorper ipsum non ante volutpat, facilisis fringilla ex accumsan. Pellentesque id enim in risus elementum tincidunt sed ut leo.Aliquam id lorem sem. Nulla vel libero vel dolor congue vulputate laoreet et arcu. Vestibulum non purus elit. Pellentesque sit amet massa vitae dui commodo ornare quis ut nisi. In quis lobortis odio, in blandit urna. Sed laoreet diam ac aliquam faucibus. Proin eget magna ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur malesuada metus magna, ac sollicitudin nunc pharetra nec. Donec convallis metus et laoreet rutrum. Praesent ultrices justo ac tincidunt iaculis. Mauris interdum convallis fringilla. Donec sagittis nunc vitae velit congue scelerisque.Praesent ut quam posuere tortor elementum blandit. Phasellus fringilla, ex ut tincidunt porta, magna ipsum tempus ipsum, nec posuere massa ligula a ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam auctor tempor mi non aliquam. Suspendisse potenti. Cras lobortis, nisi sit amet pellentesque elementum, augue magna luctus velit, feugiat commodo ante dui in ex. Fusce sodales enim tortor, condimentum egestas ipsum ullamcorper euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc id odio ac massa gravida lacinia vel vitae mauris. In eleifend sit amet arcu id laoreet.",
    IdNoticia: 2,
  }); */

  const body = JSON.stringify(requestBody);

  const headers = {
    "X-HTTP-Method": "POST",
    "IF-MATCH": "*",
  };

  const updateResponse = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};

export const updateCommentLikes = async (
  context: WebPartContext,
  newsId: number,
): Promise<void> => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Comentarios')/items(${newsId})`;
  const getItemResponse = await context.spHttpClient.get(
    url,
    SPHttpClient.configurations.v1,
  );

  if (!getItemResponse.ok) {
    const errorText = await getItemResponse.text();
    throw new Error(`Failed to retrieve item: ${errorText}`);
  }

  const responseJson = await getItemResponse.json();

  const user: string = context.pageContext.legacyPageContext.userId;
  let likes: string[] = JSON.parse(responseJson.Likes);

  if (likes === null) {
    likes = [];
    likes.push(user);
  } else if (!likes.find((userId: string) => userId === user)) {
    likes.push(user);
  } else {
    likes = likes.filter((userId: string) => userId !== user);
  }

  const body = JSON.stringify({
    Likes: JSON.stringify(likes),
  });

  const headers = {
    "X-HTTP-Method": "MERGE",
    "IF-MATCH": (responseJson as any)["@odata.etag"],
  };

  const updateResponse = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};
