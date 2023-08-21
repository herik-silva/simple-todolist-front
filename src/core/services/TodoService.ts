import { ResponseFormatTypes, Service, ServiceResponse } from "../domains/entities/Service";
import UserSession from "../domains/entities/UserSession";
import { ApiRoutes } from "../domains/enums/routes";
import { GetTodoServiceResponse } from "../hooks/use-todo";
import RequestServer from "../utils/RequestServer";

interface TodoServiceResponse {
    id: string;
    description: string;
    checked: boolean;
    creator: {id: string, username: string};
}

export interface TodoServiceData {
    description: string
    checked: boolean;
}

class TodoService implements Service<TodoServiceResponse> {
    endpoint: string = `${import.meta.env.VITE_API_URL}${ApiRoutes.TODO}`;
    responseFormat: ResponseFormatTypes = "JSON";

    async create(data: object): Promise<ServiceResponse<TodoServiceResponse>> {
        const request = new RequestServer();

        const response = await request.post<TodoServiceResponse>(this.endpoint, data);

        return response;
    }

    async update(id: string, data: object): Promise<ServiceResponse<TodoServiceResponse>> {
        const request = new RequestServer();
        const url = `${this.endpoint}${id}/`;

        if(import.meta.env.DEV){
            console.log(url)
        }

        const response = await request.put<TodoServiceResponse>(url, data);

        if(response){
            if(import.meta.env.DEV)
                console.log(response);

            return response;
        }
    }

    async delete(id: string): Promise<ServiceResponse<TodoServiceResponse>> {
        const request = new RequestServer();
        const url = `${this.endpoint}${id}/`;
        
        if(import.meta.env.DEV){
            console.log(url);
        }

        const response = await request.delete<TodoServiceResponse>(url);

        if(response){
            if(import.meta.env.DEV)
                console.log(response);

            return response;
        }
    }

    findOne(id: string): Promise<ServiceResponse<TodoServiceResponse>> {
        throw new Error("Method not implemented.");
    }

    filter(filters: object): Promise<ServiceResponse<TodoServiceResponse>> {
        throw new Error("Method not implemented.");
    }

    async get(): Promise<ServiceResponse<GetTodoServiceResponse>> {
        const request = new RequestServer();
        const url = `${this.endpoint}?limit=${999}`;
        console.log(url);
        const response = await request.get<GetTodoServiceResponse>(url);

        if(response){
            console.log(response)
            return response;
        }
    }
}

export default TodoService;