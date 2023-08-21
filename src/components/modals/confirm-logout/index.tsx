import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"

interface ConfirmLogoutModalProps {
    isOpen: boolean;
    handleOnClose: () => void;
    handleOnAccept: () => void;
}

export const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({ isOpen, handleOnClose, handleOnAccept }) => {
    return(
        <Modal isOpen={isOpen} onClose={handleOnClose} size={{ base: 'sm', lg: 'md' }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading size="md">Saindo da conta</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir="column" gap={5}>
                        <Text>Você tem certeza que deseja sair da sua conta?</Text>
                        <Flex justifyContent="center" gap={5}>
                            <Button
                                size="lg"
                                colorScheme="green"
                                gap="10px"
                                width="200px"
                                onClick={handleOnAccept}
                                variant="ghost"
                            >
                                Sim
                            </Button>
                            <Button
                                size="lg"
                                colorScheme="red"
                                gap="10px"
                                width="200px"
                                onClick={handleOnClose}
                                variant="ghost"
                            >
                                Não
                            </Button>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmLogoutModal;