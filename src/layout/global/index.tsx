import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

interface TemplateProps {
    children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ children, ...props }) => {
    
    return (
        <>
            <Header />

            <Flex
                overflowY="auto"
                flexDirection="column"
                scrollBehavior="smooth"
                justifyContent="space-between"
                height="calc(100vh - 62px)"
            >
                <Flex width="100%" flexDirection="column" max-height="calc(100vh)" {...props}>
                    {children}
                </Flex>
                <Footer />
            </Flex>
        </>
    );
}