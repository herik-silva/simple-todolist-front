import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import { FcOk } from "react-icons/fc"
import Style from "../../../core/domains/enums/style";
interface ConfirmEmailModalProps {
    isOpen: boolean;
    handleOnClose: () => void;
    email: string;
}

export const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> = ({ isOpen, handleOnClose, email }) => {
    return(
        <Modal isOpen={isOpen} onClose={handleOnClose} size={{ base: 'sm', lg: 'md' }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading size="md">Confirmação da Conta</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir="column" gap={5}>
                        <Stack textAlign="justify" spacing={5}>
                            <Flex fontSize="9xl" justifyContent="center">
                                <FcOk />
                            </Flex>
                            <Heading size="md">Estamos quase lá...</Heading>
                            <Text>Agradecemos por se registrar. Para concluir o processo de registro, precisamos que você confirme seu endereço de e-mail.</Text>
                            <Text>Um e-mail com um link de confirmação foi enviado para o endereço de e-mail que você forneceu. Basta clicar no link ou no botão para confirmar sua conta.</Text>
                            <Text>Se você não recebeu o e-mail, verifique a sua pasta de spam ou lixo eletrônico.</Text>
                            <Text>Enviamos o e-mail para o endereço a seguir:</Text>
                            <Text textAlign="center"><strong>{email}</strong></Text>
                        </Stack>
                        <Flex justifyContent="center">
                            <Button
                                size="lg"
                                color={Style.TEXT_COLOR}
                                sx={{
                                    transition: ".1s ease-in all",
                                    background: Style.BACKGROUND_COLOR,
                                    _hover: {
                                        outlineOffset: "3px",
                                        outline: `3px solid ${Style.BACKGROUND_COLOR}`,
                                        background: Style.BACKGROUND_COLOR
                                    }
                                }}
                                gap="10px"
                                width="200px"
                                onClick={handleOnClose}
                            >
                                Entendido
                            </Button>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}