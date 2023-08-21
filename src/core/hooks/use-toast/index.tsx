import { PropertiesToast, ToastContext } from "../../providers/toast";
import { useContext } from "react";

export const useToast = (): PropertiesToast => {
  const { show, closeAll }: PropertiesToast = useContext(ToastContext);

  return { show, closeAll };
};