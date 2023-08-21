import { useEffect, useState } from "react";
import TodoService from "../../services/TodoService";
import Page from "../../domains/entities/Page";
import Todo from "../../domains/entities/Todo";

export type GetTodoServiceResponse = Page<Todo[]>;

export const useGetTodos = (nRequest: number): GetTodoServiceResponse | undefined =>  {
    const [todos, setTodos] = useState<GetTodoServiceResponse>();

    useEffect(() => {
        const todoService = new TodoService();
        todoService.get().then((response) => {
            if(response){
                const TodoPage = response.data
                setTodos(TodoPage);
            }
        })
        .catch((error) => console.error(error));
    }, [nRequest]);
    
    return todos;
}

export const usePostTodos = (data: Todo): unknown =>  {
    const [response, setResponse] = useState<unknown>({});

    useEffect(() => {
        const todoService = new TodoService();
        todoService.create(data).then(() => setResponse(response)).catch((error) => {
            setResponse(error);
            console.error(error);
        });
    }, [data, response]);
    
    return response;
}

export const useDeleteTodo = (data: Todo): unknown => {
    const [response, setResponse] = useState<unknown>({});

    useEffect(() => {
        const todoService = new TodoService();
        todoService.delete(data.id).then(() => setResponse(response)).catch((error) => {
            setResponse(error);
            console.error(error);
        })
    }, [data, response]);

    return response;
}