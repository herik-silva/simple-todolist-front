import { Spinner } from "@chakra-ui/react"

interface LoadSpinnerProps {
    color: string;
    size?: "sm" | "md" | "lg" | "xl" | "xs";
}

export const LoadSpinner: React.FC<LoadSpinnerProps> = ({ color, size = "xl" }) => {
    return (
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color={color}
            size={size}
        />
    )
}