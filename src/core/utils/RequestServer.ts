import Storage from "./Storage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"; 
import JwtParse from "./JwtParse";
import UserToken from "../domains/entities/UserToken";
import StorageError from "../domains/entities/StorageError";
import { ApiRoutes } from "../domains/enums/routes";

interface LoginResponse {
    refresh: string,
    access: string
}

class RequestServer {
    private token: UserToken | StorageError;

    constructor() {
        this.token = Storage.getToken();
    }

    /**
     * Retorna o Token do usuário ou um erro, caso ele não exista.
     * @returns Token ou Erro
     */
    getToken(): UserToken | StorageError {
        return this.token;
    }

    /**
     * Verifica se o token não é válido (se está ou não está atualizado).
     * @returns True caso o token não seja válido e False se válido
     */
    tokenIsNotValid(): boolean {
        if(this.token instanceof UserToken){
            return this.token.timer < new Date().getTime();
        }

        return false;
    }

    /**
     * Atualiza o Token de acesso.
     */
    async updateToken(): Promise<void> {
        this.token = Storage.getToken();
        if(this.token instanceof UserToken){
            const url = `${import.meta.env.VITE_API_URL + ApiRoutes.REFRESH}`;
            const data = { refresh: this.token.refresh };
            console.log("TOKEN VAI ATUALIZAR!")
            const response = await axios.post<{access: string}>(url, data, {
                headers: {
                    "Authorization": `Bearer ${this.token.access}`,
                    "Content-Type": "application/json"
                }
            });
            
            this.token.access = response.data.access;
            this.token.timer = JwtParse.parse(response.data.access);
            Storage.save(this.token);
            if(import.meta.env.DEV){
                console.log(this.token);
            }
        }
    }

    /**
     * Utiliza o método GET.
     * @param url Url de Destino.
     * @returns Resposta Axios caso o token seja válido.
     */
    async get<T>(url: string, useAuth = true): Promise<AxiosResponse<T> | void> {
        if(useAuth){
            this.token = Storage.getToken();

            if(this.token instanceof UserToken){
                if(this.tokenIsNotValid()){
                    await this.updateToken();
                }

                const config: AxiosRequestConfig = {
                    headers: {
                        "Authorization": `Bearer ${this.token.access}`,
                        "Content-Type": "application/json"
                    }
                }
                
                const response = await axios.get<T>(url, config);

                if(import.meta.env.DEBUG){
                    console.warn("\nRequisição feita pelo AXIOS!");
                    console.log(response);
                }

                return response;
            }
        }
        else{
            const response = await axios.get<T>(url);

            if(import.meta.env.DEBUG){
                console.warn("\nRequisição feita pelo AXIOS!");
                console.log(response);
            }

            return response;
        }
    }

    /**
     * Utiliza o método POST para enviar dados ao servidor.
     * @param url Url de destino
     * @param data Conteúdo que será enviado
     * @returns Retorna uma resposta Axios ou vazio.
     */
    async post<T>(url: string, data: object, useAuth = true): Promise<AxiosResponse<T> | void> {
        if(useAuth){
            this.token = Storage.getToken();
    
            if(this.token instanceof UserToken){
                if(this.tokenIsNotValid()){
                    await this.updateToken();
                }
    
                const config: AxiosRequestConfig = {
                    headers: {
                        "Authorization": `Bearer ${this.token.access}`,
                    }
                }
    
                const response = await axios.post<T>(url, data, config);
    
                if(import.meta.env.DEBUG){
                    console.warn("\nRequisição feita pelo AXIOS!");
                    console.log(response);
                }
    
                return response;
            }
        }
        else{
            const response = await axios.post<T>(url, data);
    
            if(import.meta.env.DEBUG){
                console.warn("\nRequisição feita pelo AXIOS!");
                console.log(response);
            }

            return response;
        }
    }

    async delete<T>(url: string): Promise<AxiosResponse<T> | void>  {
        this.token = Storage.getToken();

        if(this.token instanceof UserToken){
            if(this.tokenIsNotValid()){
                await this.updateToken();
            }

            const config: AxiosRequestConfig = {
                headers: {
                    "Authorization": `Bearer ${this.token.access}`,
                    "Content-Type": "application/json"
                }
            }
            
            const response = await axios.delete<T>(url, config);

            if(import.meta.env.DEBUG){
                console.warn("\nRequisição feita pelo AXIOS!");
                console.log(response);
            }

            return response;
        }
    }

    /**
     * Utiliza o método PUT para atualizar dados no servidor.
     * @param url Url de destino.
     * @param data Conteúdo que será enviado.
     * @returns Retorna uma resposta Axios ou vazio.
     */
    async put<T>(url: string, data: object): Promise<AxiosResponse<T> | void> {
        this.token = Storage.getToken();
        
        if(this.token instanceof UserToken){
            if(this.tokenIsNotValid()){
                await this.updateToken();
            }

            const config: AxiosRequestConfig = {
                headers: {
                    "Authorization": `Bearer ${this.token.access}`
                }
            }

            console.warn("REQ")
            const response = await axios.put<T>(url, data, config);

            if(import.meta.env.DEV){
                console.warn("\nRequisição PUT feita pelo AXIOS!");
                console.log(response);
            }

            return response;
        }
    }


    
    /**
     * Realiza a requisição responsável pelo login.
     * @param data Dados de login
     * @returns Retorna a resposta Axios ou vazio.
     */
    async login(data: object): Promise<AxiosResponse<LoginResponse> | void> {
        const url = `${import.meta.env.VITE_API_URL+ ApiRoutes.LOGIN}`
        const response = await axios.post<LoginResponse>(url, data);

        if(import.meta.env.DEBUG){
            console.warn("\nREQUISIÇÃO LOGIN AXIOS!");
            console.log(response);
        }

        this.token = {
            access: response.data.access,
            refresh: response.data.refresh,
            timer: JwtParse.parse(response.data.access),
        }

        Storage.save(this.token);

        return response;
    }
}

export default RequestServer;