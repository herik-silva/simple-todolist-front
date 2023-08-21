import { ROUTES } from "../../core/domains/enums/routes";
import { Register } from "../../pages/auth/register";
import { ConfirmedAccount } from "../../pages/auth/register-confirmed";
import { Principal } from "../../pages/index/index";
import Home from "../../pages/user/home";

interface RouteProps {
  path: string;
  element: React.FC;
}

const routesList: RouteProps[] = [
    {path: ROUTES.PRINCIPAL, element: Principal},
    {path: ROUTES.REGISTER, element: Register},
    {path: ROUTES.CONFIRMED_ACCOUNT, element: ConfirmedAccount},
    {path: ROUTES.HOME, element: Home},
    {path: ROUTES.ANYWHERE, element: Principal},
];

export default routesList;