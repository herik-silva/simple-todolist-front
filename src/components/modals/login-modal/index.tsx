import { Modal, ModalOverlay, ModalContent, ModalHeader, Flex, Heading, ModalCloseButton, ModalBody, Stack, FormControl, FormLabel, Input, Button, Image } from "@chakra-ui/react";
import Logo from "@/assets/images/logo.webp"
import Style from "../../../core/domains/enums/style";
import RequestServer from "../../../core/utils/RequestServer";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../../core/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/domains/enums/routes";

interface LoginModalProps {
    isOpen: boolean;
    handleOnClose: () => void;
    handleRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, handleOnClose, handleRegister }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [username, updateUsername] = useState("");
    const [password, updatePassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateUsername(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        updatePassword(event.target.value);
    }

    const handleLoginRequest = () => {
        const requestServer = new RequestServer();
        const data = {
            username,
            password
        }

        setIsLoading(true);

        requestServer.login(data).then(() => {
            navigate(ROUTES.HOME);
        }).catch((response) => {
            toast.show("error", "Suas credenciais estão incorretas.");
            console.log(response);
        }).finally(() => setIsLoading(false))
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleOnClose} size={{ base: 'full', lg: 'sm' }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex alignItems="center" gridGap={2}>
                            <Image src={Logo} width="48px" height="48px"  alt="Logo do Ikemen Store." />
                            <Heading size="md">SIMPLE TODOLIST</Heading>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack
                            spacing={20}
                        >
                            <Flex
                                direction='column'
                                gridGap={20}
                            >
                                <FormControl>
                                    <FormLabel>Nome de Usuário</FormLabel>
                                    <Input type='text' borderColor={Style.FOOTER_COLOR} value={username} onChange={handleUsernameChange}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Senha</FormLabel>
                                    <Input type='password' borderColor={Style.FOOTER_COLOR} value={password} onChange={handlePasswordChange} />
                                </FormControl>
                            </Flex>
                            <Flex
                                gridGap={10}
                                direction='column'
                                mb="10px"
                            >
                                <Button
                                    variant='solid'
                                    color={Style.TEXT_COLOR}
                                    size='lg'
                                    sx={{ 
                                        background: Style.CONFIRM_BUTTON_COLOR,
                                        _hover: { background: Style.HOVER_CONFIRM_BUTTON_COLOR}
                                    }}
                                    mr={3} onClick={handleLoginRequest}
                                    isLoading={isLoading}
                                >
                                    Entrar
                                </Button>
                                <Button
                                    variant='outline'
                                    color={Style.DARK_TEXT_COLOR}
                                    borderColor={Style.FOOTER_COLOR}
                                    size='lg'
                                    mr={3} onClick={handleRegister}>
                                        Cadastrar-se
                                </Button>
                            </Flex>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}