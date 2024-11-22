import { ReactElement, useCallback, useEffect } from "react";

import {
  getCommentsList,
  postNewComment,
  updateCommentLikes,
} from "../../services/comments.service";
import {
  getMostViewedNewsList,
  updateNewsLikes,
  updateNewsViews,
} from "../../services/news.service";
import { useZustandStore } from "../../store";

export function InternalNews(): ReactElement {
  const { context } = useZustandStore();
  const body = {
    Likes: "[]",
    Comentario:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et est euismod, tristique ante in, vestibulum ligula. Maecenas tempor lacus quam, nec posuere quam laoreet vitae. In mi ligula, pulvinar et mi vel, interdum commodo urna. Donec mauris lacus, placerat quis nisl a, bibendum rhoncus neque. Praesent vel ipsum orci. Integer et turpis vel mauris rhoncus malesuada in eu dolor. Curabitur id ullamcorper arcu.Aliquam erat volutpat. Vivamus et quam elementum, dapibus nisi vel, laoreet ante. Quisque eget maximus mauris, eu tempus nibh. Vestibulum convallis, magna sit amet posuere maximus, nibh ipsum vestibulum libero, a hendrerit felis arcu vitae dolor. Vivamus vel venenatis arcu. Sed vitae ipsum lorem. Maecenas nibh purus, fringilla nec sem a, vestibulum mollis dui. Aliquam tincidunt sapien posuere erat posuere, eu consequat erat tempor. Pellentesque consectetur egestas massa. Curabitur interdum mattis erat. Suspendisse leo leo, suscipit eget sem ac, maximus ultrices sapien. Proin at porta sem. Aliquam in mi viverra, suscipit enim aliquet, vulputate sem. Pellentesque ac efficitur est. Nunc congue arcu sit amet odio dapibus placerat. Pellentesque id sollicitudin neque.Phasellus tincidunt, sapien et laoreet elementum, dui erat condimentum justo, quis vulputate tortor lacus non quam. Vestibulum finibus elementum arcu sit amet efficitur. Vivamus pellentesque, lorem vitae molestie sagittis, lectus massa dignissim ante, at congue sapien est quis eros. Duis pellentesque odio quis molestie condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer et leo lorem. Phasellus semper leo felis, vitae pretium mi blandit ac. Quisque blandit in augue eu eleifend. Ut vulputate purus neque, quis luctus ante bibendum aliquam. Mauris quis efficitur enim. Mauris nibh eros, dignissim at leo vel, pretium suscipit nulla. Quisque in maximus urna, id maximus nisi. Integer ullamcorper ipsum non ante volutpat, facilisis fringilla ex accumsan. Pellentesque id enim in risus elementum tincidunt sed ut leo.Aliquam id lorem sem. Nulla vel libero vel dolor congue vulputate laoreet et arcu. Vestibulum non purus elit. Pellentesque sit amet massa vitae dui commodo ornare quis ut nisi. In quis lobortis odio, in blandit urna. Sed laoreet diam ac aliquam faucibus. Proin eget magna ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur malesuada metus magna, ac sollicitudin nunc pharetra nec. Donec convallis metus et laoreet rutrum. Praesent ultrices justo ac tincidunt iaculis. Mauris interdum convallis fringilla. Donec sagittis nunc vitae velit congue scelerisque.Praesent ut quam posuere tortor elementum blandit. Phasellus fringilla, ex ut tincidunt porta, magna ipsum tempus ipsum, nec posuere massa ligula a ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam auctor tempor mi non aliquam. Suspendisse potenti. Cras lobortis, nisi sit amet pellentesque elementum, augue magna luctus velit, feugiat commodo ante dui in ex. Fusce sodales enim tortor, condimentum egestas ipsum ullamcorper euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc id odio ac massa gravida lacinia vel vitae mauris. In eleifend sit amet arcu id laoreet.",
    IdNoticia: 2,
  };

  const getData = useCallback(async () => {
    if (context) {
      const responseNews = await getMostViewedNewsList(context);
      console.log(responseNews);

      const responseComments = await getCommentsList(context, 2);
      console.log("Comentários", responseComments);
    }
  }, [context]);
  useEffect(() => {
    getData();
  }, [context, getData]);
  return (
    <div>
      {context && (
        <div>
          <button onClick={() => updateNewsViews(context, 5)}>Views</button>
          <button onClick={() => updateNewsLikes(context, 1)}>Like</button>
          <button onClick={() => postNewComment(context, body)}>
            Postar um comentário
          </button>
          <button onClick={() => updateCommentLikes(context, 7)}>
            Like no comentario
          </button>
        </div>
      )}
    </div>
  );
}
