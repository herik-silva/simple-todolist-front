import { Flex, Heading, Text, Stack, Button, Icon } from "@chakra-ui/react";
import Style from "../../../core/domains/enums/style";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../core/domains/enums/routes";
import { FcTodoList } from "react-icons/fc";

export const IkemenCover: React.FC = () => {

    return (
        <Flex
            display="column"
            color={Style.DARK_TEXT_COLOR}
            id="topo"
        >
            <Stack spacing={10}
                height="calc(100vh - 62px - 30px)"
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    gridGap={20}
                >
                    <Stack spacing={5} maxW={{ base: "100%", sm: "80%" ,md:"30%" ,lg: "30%" }}
                        padding="15px"
                    >
                        <Heading textAlign="center">Gerenciamento Simples</Heading>
                        <Text textAlign="justify" fontSize="xl">
                            Pronto para tornar sua vida mais organizada e produtiva? Não perca tempo! Crie sua conta agora mesmo em nosso aplicativo de tarefas e comece a planejar, acompanhar e concluir suas atividades de forma eficiente.
                        </Text>
                        <Text textAlign="justify" fontSize="xl"> Simplifique seu dia a dia e alcance suas metas com facilidade. Junte-se a nós e experimente a transformação! </Text>
                        <Flex justifyContent="center">
                            <Link to={ROUTES.REGISTER}>
                                <Button
                                    variant="solid"
                                    color={Style.TEXT_COLOR}
                                    sx={{ 
                                        background: Style.CONFIRM_BUTTON_COLOR,
                                        _hover: { background: Style.HOVER_CONFIRM_BUTTON_COLOR }
                                    }}
                                >
                                    Criar conta grátis
                                </Button>
                            </Link>
                        </Flex>
                    </Stack>
                    <Icon as={FcTodoList} boxSize={80} display={{ base: "none", md: "block", lg: "block" }} />
                </Flex>
            </Stack>
        </Flex>

    );
}