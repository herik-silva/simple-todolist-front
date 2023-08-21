import { Menu, MenuButton, Button, MenuList, MenuGroup, MenuItem  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/domains/enums/routes";
import { BsPersonCircle } from "react-icons/bs";
import ConfirmLogoutModal from "../../modals/confirm-logout";
import { useState } from "react";
import UserService from "../../../core/services/UserService";
import { useToast } from "../../../core/hooks/use-toast";
import Storage from "../../../core/utils/Storage";
import Style from "../../../core/domains/enums/style";

interface MenuItemsProps {
    username: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ username="" }) => {
    const [isOpenModal, setIsOpenModal] =  useState(false);
    
    const toast = useToast();
    const navigate = useNavigate();

    const handleOnCloseModal = () => {
        setIsOpenModal(false);
    } 

    const openModal = () => {
        setIsOpenModal(true);
    }

    const logoutUser = () => {
        const userService = new UserService();
        userService.logoutUser()
            .then(() => {
                Storage.clear();
                toast.show("info", "Usuário deslogado!");
                navigate(ROUTES.PRINCIPAL);
            })
    }

    return (
        <>
            <Menu>
                <MenuButton leftIcon={<BsPersonCircle />} as={Button} variant="link" color={Style.TEXT_COLOR}>
                    {username}
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Conta' color={Style.DARK_TEXT_COLOR}>
                        <MenuItem color={Style.DARK_TEXT_COLOR} onClick={openModal}>Sair</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>

            <ConfirmLogoutModal isOpen={isOpenModal} handleOnClose={handleOnCloseModal} handleOnAccept={logoutUser} />
        </>
    );
}

export default MenuItems;