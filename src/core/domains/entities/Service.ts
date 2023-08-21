import { AxiosResponse } from "axios";

export type ResponseFormatTypes = "JSON" | 'XML';
export type ServiceResponse<T> = AxiosResponse<T> | void;


export interface SimpleService {
    endpoint: string;
    responseFormat: ResponseFormatTypes;
}

export interface Service<ServiceResponseFormat> extends SimpleService {
    create(data: object): Promise<ServiceResponse<ServiceResponseFormat>>;
    update(id: string, data: object): Promise<ServiceResponse<ServiceResponseFormat>>;
    delete(id: string): Promise<ServiceResponse<ServiceResponseFormat>>;
    findOne(id: string): Promise<ServiceResponse<ServiceResponseFormat>>;
    filter(filters: object): Promise<ServiceResponse<ServiceResponseFormat>>;
}