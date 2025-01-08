import { useState, MouseEvent, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  UserImg,
  UserSection,
  UserContainer,
  UserData,
  ActionSection,
} from "./styles";
import MoreVertIcon from "../../assets/moreVert.svg";
import { TGetUserResponse } from "../../services/user.service";
import { useZustandStore } from "../../store";
import { formatDate } from "../../utils/formatDate";
import { EditDeleteModal } from "../modal/EditDeleteModal";

type TUserSectionProps = {
  actionMenu: boolean;
  resetMenu?: boolean;
  userData: {
    AuthorId: number;
    Created: string;
    Id: number;
    user?: TGetUserResponse;
  };
  handleDelete?: () => void;
  handleEdit?: () => void;
  handleCancel?: () => void;
};

export const UserSectionComponent = ({
  actionMenu = false,
  resetMenu = false,
  userData,
  handleDelete,
  handleEdit,
  handleCancel,
}: TUserSectionProps) => {
  const { context } = useZustandStore();
  const currentUserId = context?.pageContext?.legacyPageContext.userId;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [options, setOptions] = useState<string[]>(["Deletar", "Editar"]);
  const open = Boolean(anchorEl);
  const [modalControl, setModalControl] = useState<{
    open: boolean;
    title: string;
    msg: string;
  }>({ open: false, title: "", msg: "" });

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setModalControl({ open: false, title: "", msg: "" });
  };

  const deleteFn = () => {
    if (handleDelete) handleDelete();
    handleClose();
  };
  const editFn = () => {
    if (handleEdit) handleEdit();
    handleClose();
    setOptions(["Cancelar"]);
  };

  const cancelFn = async () => {
    if (handleCancel) handleCancel();
    handleClose();
    setOptions(["Deletar", "Editar"]);
  };

  const selectBtnFunction = (btnName: string) => {
    switch (btnName) {
      case "Deletar":
        setModalControl({
          open: true,
          title: "Deletar",
          msg: "Quer realmente deletar esse comentário?",
        });
        break;

      case "Editar":
        setModalControl({
          open: true,
          title: "Editar",
          msg: "Quer realmente editar esse comentário?",
        });
        break;

      case "Cancelar":
        cancelFn();
        break;
    }
  };

  useEffect(() => {
    if (resetMenu) setOptions(["Deletar", "Editar"]);
  }, [resetMenu]);
  return (
    <UserContainer>
      <EditDeleteModal
        title={modalControl.title}
        deleteMsg={modalControl.msg}
        handleConfirm={
          modalControl.title === "Deletar" ? () => deleteFn() : () => editFn()
        }
        openModal={modalControl.open}
        closeModal={handleClose}
      />
      <UserSection>
        <UserImg $url={userData.user?.UserImg} />
        <UserData>
          <h1>{userData.user?.Title}</h1>
          <p>{formatDate(userData.Created)}</p>
        </UserData>
      </UserSection>

      {userData.AuthorId === currentUserId && actionMenu ? (
        <ActionSection>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <img src={MoreVertIcon} alt="moreIcon" />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: 50 * 4.5,
                  width: "20ch",
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} onClick={() => selectBtnFunction(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </ActionSection>
      ) : null}
    </UserContainer>
  );
};
