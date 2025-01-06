import {
  AllLikesModal,
  Close,
  List,
  ListUsers,
  ModalContent,
  UserImg,
} from "./styles";

interface ModalLikesProps {
  isOpen: boolean;
  onClose: () => void;
  currentNewsId: number;
  listNews: Array<{ Id: number; LikedUsers: string }>;
  usersInfo: Record<number, { name: string; photo?: string }>;
  formatStringToArray: (input: string) => number[];
}

export const ModalLikes: React.FC<ModalLikesProps> = ({
  isOpen = false,
  onClose = false,
  currentNewsId = 0,
  listNews = [],
  usersInfo = {},
  formatStringToArray,
}) => {
  const currentNews = listNews.find(
    (newsItem) => newsItem.Id === currentNewsId,
  );

  if (!isOpen) return null;

  return (
    <AllLikesModal>
      <ModalContent>
        <Close onClick={onClose}>&times;</Close>
        <h1 style={{ textAlign: "center", paddingBottom: "2rem" }}>Likes</h1>
        {currentNews ? (
          <ListUsers>
            {formatStringToArray(currentNews.LikedUsers).map(
              (userId: number) => (
                <List key={userId}>
                  <UserImg $url={usersInfo[userId]?.photo || ""}></UserImg>
                  {usersInfo[userId]?.name || "Usuário desconhecido"}
                </List>
              ),
            )}
          </ListUsers>
        ) : (
          <p>Carregando ou nenhum dado disponível.</p>
        )}
      </ModalContent>
    </AllLikesModal>
  );
};
