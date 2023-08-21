import { Flex, IconButton, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { AiOutlineSend } from "react-icons/ai";

interface NewTodoInputProps {
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleOnClick: () => void;
    isLoading: boolean;
    value: string;
}

const NewTodoInput: React.FC<NewTodoInputProps> = ({ handleOnChange, handleOnClick, isLoading, value }) => {

    return (
        <Flex w="100%">
            <Input
                variant="filled"
                colorScheme="blackAlpha"
                borderRadius="5px 0px 0px 5px"
                value={value}
                onChange={handleOnChange}
            />
            <IconButton
                variant="solid"
                colorScheme="green"
                aria-label='Search database'
                fontSize="20px"
                borderRadius="0px 5px 5px 0px"
                icon={<AiOutlineSend />}
                onClick={handleOnClick}
                isLoading={isLoading}
            />
        </Flex>
    );
}

export default NewTodoInput;