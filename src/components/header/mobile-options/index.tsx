import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Style from "../../../core/domains/enums/style";

interface MobileOptionsProps {
    handleStateLoginModal: () => void;
}

export const MobileOptions: React.FC<MobileOptionsProps> = ({ handleStateLoginModal }) => {

    return (
        <Button
            leftIcon={<AiOutlineLogin />}
            variant="link"
            color={Style.TEXT_COLOR}
            display={{base: "block", md: "none", lg: "none"}}
            onClick={handleStateLoginModal}
        >
            Entrar
        </Button>
    );
}