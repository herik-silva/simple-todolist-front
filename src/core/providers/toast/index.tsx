import { AlertStatus, UseToastOptions, useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useCallback } from "react";

type ShowType = (
    status: AlertStatus,
    description: ReactNode,
    props?: UseToastOptions,
) => string | number | void;

export interface PropertiesToast {
    show: ShowType;
    closeAll: () => void;
}

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastContext = createContext<PropertiesToast>({
    show: () => {
        console.warn("ToastContext.show() Não implementado")
    },
    closeAll: () => {
        console.warn("ToastContext.show() Não implementado")
    },
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const toast = useToast();

    const closeAll = () => {
        toast.closeAll();
    }

    const toastReturn: ShowType = (status, description, props) => {
        return toast({
            status: status || "error",
            description: description || "",
            duration: props?.duration || 5000,
            variant: props?.variant || "subtle",
            isClosable: props?.isClosable || true,
            position: props?.position || "bottom-left",
            ...props
        });
    }
    
    const show: ShowType = (status, description, props) => {
        toastReturn(status, description, props);
    }

    const contextValues = {
        show: useCallback<ShowType>((status, description, props) => {
            show(status, description, props);
        }, []),
        closeAll: useCallback(() => { closeAll() }, [])
    }

    return <ToastContext.Provider value={contextValues}>{children}</ToastContext.Provider>
}