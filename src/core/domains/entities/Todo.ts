interface Todo {
    id: string;
    description: string;
    checked: boolean;
    updated_at: string;
    created_at: string;
    creator: {
        id: string,
        username: string
    }
}

export default Todo;