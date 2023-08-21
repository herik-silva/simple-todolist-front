import { Flex, Text } from "@chakra-ui/react";
import Style from "../../core/domains/enums/style";

export const Footer: React.FC = () => {
    return (
        <Flex
            as="footer"
            backgroundColor={Style.FOOTER_COLOR}
            textColor="#FFF"
            alignItems="center"
            justifyContent="center"
        >
            <Text fontWeight="bold">© 2023 Desenvolvido por Hérik.</Text>
        </Flex>
    );
}