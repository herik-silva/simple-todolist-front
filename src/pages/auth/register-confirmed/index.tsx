import { useEffect, useState } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { Template } from "../../../layout/global";
import { Flex, Heading } from "@chakra-ui/react";
import RequestServer from "../../../core/utils/RequestServer";
import { LoadSpinner } from "../../../components/spinner";
import Style from "../../../core/domains/enums/style";

export const ConfirmedAccount: React.FC = () => {
    const [state, setState] = useState("loading");

    const getTokenParam = () => {
        return document.URL.split("confirm/")[1]
    }

    useEffect(()=> {
        const token = getTokenParam();

        if(token){
            const request = new RequestServer();
            const url = `${import.meta.env.VITE_API_URL}/account-confirm/${token}`;
            
            request.get(url, false).then(() => {
                setState("confirmed");

            })
            .catch(() => {
                setState("error");
            })
        }
    })


    return (
        <>
            <Template>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="25px"
                    minH="calc(100vh - 100px)"
                    textAlign="center"
                >
                    {state == "confirmed" ?
                        <>
                            <Flex fontSize="150px">
                                <FcApproval/>
                            </Flex>
                            <Heading>Conta confirmada com sucesso!</Heading>
                        </> : state == "error" ?
                        <>
                            <Flex fontSize="150px">
                                <FcCancel/>
                            </Flex>
                            <Heading>Não foi possível confirmar sua conta!</Heading>
                        </> :

                        <LoadSpinner color={Style.BACKGROUND_COLOR} />
                    }
                </Flex>
            </Template>
        </>
    );
}