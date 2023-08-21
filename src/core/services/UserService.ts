import { Service, ResponseFormatTypes, ServiceResponse } from "../domains/entities/Service";
import UserSession from "../domains/entities/UserSession";
import UserToken from "../domains/entities/UserToken";
import { ApiRoutes } from "../domains/enums/routes";
import RequestServer from "../utils/RequestServer";

interface UserServiceResponse {
    username: string;
    email: string;
    first_name: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
    country: string;
}

export interface UserServiceData {
    user: {
        username: string,
        email: string,
        password: string,
        first_name: string
    }
    confirm_password: string;
    birth_date: string;
    country: string;
}

class UserService implements Service<UserServiceResponse> {
    endpoint: string = ApiRoutes.USERS;
    responseFormat: ResponseFormatTypes = "JSON";
    
    async create(data: UserServiceData): Promise<ServiceResponse<UserServiceResponse>> {
        if(data.user.password != data.confirm_password){
            alert("As senhas estão diferentes.");
            return;
        }
        
        // Url excepcional, já que é o único caso que utilizará uma rota diferente.
        const url = `${import.meta.env.VITE_API_URL}/${ApiRoutes.REGISTER}`;
        const request = new RequestServer();

        const response = await request.post<UserServiceResponse>(url, data, false);

        return response;
    }

    async getUserSession(): Promise<ServiceResponse<UserSession>> {
        const url = `${import.meta.env.VITE_API_URL}/${ApiRoutes.SESSION_USER}`;
        const request = new RequestServer();

        const response = await request.get<UserSession>(url);
        if(response){
            console.log(response);
        }

        return response;
    }

    async logoutUser(): Promise<ServiceResponse<unknown>> {
        const url = `${import.meta.env.VITE_API_URL}/${ApiRoutes.LOGOUT}`;
        const request = new RequestServer();
        const token = request.getToken();
        if(token instanceof UserToken){
            const data = {refresh: token.refresh}
            const response = await request.post(url, data);

            if(response){
                console.log(response);
            }
    
            return response;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(_id: string, _data: unknown): Promise<ServiceResponse<UserServiceResponse>> {
        throw new Error("Method not implemented.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete(_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOne(_id: string): Promise<ServiceResponse<UserServiceResponse>> {
        throw new Error("Method not implemented.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter(_filters: unknown): Promise<ServiceResponse<UserServiceResponse>> {
        throw new Error("Method not implemented.");
    }
}

export default UserService;