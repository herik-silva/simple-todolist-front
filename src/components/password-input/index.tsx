import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react"
import React, { ChangeEvent, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import Style from "../../core/domains/enums/style"

interface PasswordInputProps {
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ handleOnChange }) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                variant="outline"
                borderColor={Style.FOOTER_COLOR}
                onChange={handleOnChange}
            />
            <InputRightElement width='4.5rem'>
                <IconButton h='2rem' size='sm' onClick={handleClick}
                    isRound={true}
                    variant='outline'
                    colorScheme="gray"
                    aria-label='Done'
                    fontSize='20px'
                    icon={show ? <AiFillEyeInvisible/>: <AiFillEye/>}
                />

            </InputRightElement>
        </InputGroup>
    )
}