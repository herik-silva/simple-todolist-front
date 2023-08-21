import { Button, Container, Flex, Heading, Image } from "@chakra-ui/react";
import Logo from "@/assets/images/logo.webp"
import { ROUTES } from "../../core/domains/enums/routes";
import { MobileOptions } from "./mobile-options";
import { useEffect, useState } from "react";
import { LoginModal } from "../modals/login-modal";
import Style from "../../core/domains/enums/style";
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import UserService from "../../core/services/UserService";
import { useToast } from "../../core/hooks/use-toast";
import UserSession from "../../core/domains/entities/UserSession";
import MenuItems from "./menu-items";

export const Header: React.FC = () => {
    const [loginModalIsOpen, updateLoginModalIsOpen] = useState(false);
    const [userSession, setUserSession] = useState<UserSession | null>(null);

    const navigate = useNavigate();
    const toast = useToast();

    const handleStateLoginModal = () => {
        updateLoginModalIsOpen(!loginModalIsOpen);
    }

    const handleRegisterBtnClick = () => {
        navigate(ROUTES.REGISTER);
        handleStateLoginModal();
    }

    const renderUserName = () => {
        if(userSession){
            return (
                <Flex gap={5}>
                    <MenuItems username={userSession.user} />
                </Flex>
            )
        }
    }

    const renderOptions = () => {
        return (
            <>
                <Flex 
                    gridGap={{ base: 4, lg: 10 }}
                    display={{ base: "none", md: "flex" }}
                    justifyContent="space-evenly"
                >
                    <RouterLink to={ROUTES.REGISTER}>
                        <Button
                            variant='solid'
                            color='var(--primary-color)'
                            size='sm'
                            borderRadius='10px'
                            sx={{ 
                                background: '#424242',
                                _hover: { background: '#303030' }
                            }}
                        >CRIAR CONTA GRÁTIS</Button>
                    </RouterLink>
                    <Button variant='link' color='var(--text-color)' onClick={handleStateLoginModal}>Entrar</Button>
                </Flex>
                <MobileOptions handleStateLoginModal={handleStateLoginModal} />
            </>
        )
    }

    const renderHeaderOptions = () => {
        return userSession ?  renderUserName() : renderOptions()
    }

    useEffect(() => {
        if(userSession == undefined){
            const userService = new UserService();
            userService.getUserSession()
                .then(response => {
                    if(response){
                        setUserSession(response.data);
                    }
                })
                .catch(() => {
                    toast.show("loading", "Você precisa estar logado para acessar essa página. Você será redirecionado para a página de login.")
                });
        }
    }, [toast, userSession]);
    
    return (
        <Flex
            as="header"
            bg={Style.FOOTER_COLOR}
        >
            <Container
                py={3}
                gridGap={4}
                color={Style.TEXT_COLOR}
                display="flex"
                maxW="container.xl"
                alignItems="center"
                justifyContent="space-between"
            >
                <RouterLink to={ROUTES.PRINCIPAL}>
                    <Flex alignItems="center" gridGap={2}>
                        <Image src={Logo} width="38px" height="38px"  alt="Logo do Ikemen Store." />
                        <Heading size="md">SIMPLE TODOLIST</Heading>
                    </Flex>
                </RouterLink>
                {renderHeaderOptions()}
                <LoginModal 
                    handleOnClose={handleStateLoginModal}
                    handleRegister={handleRegisterBtnClick}
                    isOpen={loginModalIsOpen}
                />

            </Container>
        </Flex>
    );
}