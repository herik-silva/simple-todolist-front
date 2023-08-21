class StorageError {
    public code: number;
    public text: string;

    constructor(code: number, text: string) {
        this.code = code;
        this.text = text;
    }
}

export default StorageError;