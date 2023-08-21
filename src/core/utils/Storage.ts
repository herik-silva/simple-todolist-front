import StorageError from "../domains/entities/StorageError";
import UserToken from "../domains/entities/UserToken";
import { StorageTypes } from "../domains/enums/storage-types";

const ITEM_NAME = "token";

const STORAGE_MODE = StorageTypes.SESSION_STORAGE.valueOf();

abstract class Storage {

    /**
     * Realiza a conexão com o tipo de armazenamento.
     */
    private static getConnection(): globalThis.Storage | StorageError {
        switch(STORAGE_MODE){
            case StorageTypes.LOCAL_STORAGE:
                return localStorage;

            case StorageTypes.SESSION_STORAGE:
                return sessionStorage;
            
            default:
                return new StorageError(3, "Tipo de Armazenamento não é válido");
        }
    }

    /**
     * @returns Retorna a informação do Token ou StorageError
     */
    public static getToken(): UserToken | StorageError {
        const connectionRequest = this.getConnection();
        if(connectionRequest instanceof globalThis.Storage){
            const tokenStr = connectionRequest.getItem(ITEM_NAME);
    
            if(tokenStr){
                const token = new UserToken(JSON.parse(tokenStr));
                return token;
            }

            return new StorageError(2, "Token não existe");
        }
        else{
            return connectionRequest;
        }
    }

    public static save(token: UserToken) {
        const connectionRequest = this.getConnection();
        if(connectionRequest instanceof globalThis.Storage){
            connectionRequest.setItem(ITEM_NAME, JSON.stringify(token));
        }
    }

    public static clear() {
        const connectionRequest = this.getConnection();
        if(connectionRequest instanceof globalThis.Storage){
            connectionRequest.removeItem(ITEM_NAME);
        }
    }

}

export default Storage;