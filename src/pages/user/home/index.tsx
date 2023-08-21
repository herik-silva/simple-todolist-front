import { ChangeEvent, useState } from "react";
import NewTodoInput from "../../../components/new-todo-input";
import TodoService from "../../../core/services/TodoService";
import { useToast } from "../../../core/hooks/use-toast";
import { Checkbox, Container, Flex, IconButton, Stack } from "@chakra-ui/react";
import { Template } from "../../../layout/global";
import { BsFillTrashFill } from "react-icons/bs";
import { useGetTodos } from "../../../core/hooks/use-todo";
import Todo from "../../../core/domains/entities/Todo";

const Home: React.FC = () => {
    const [todoText, setTodoText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nRequest, setNRequest] = useState(0);

    const toast = useToast();
    const characterList = useGetTodos(nRequest);

    const handleOnChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoText(event.target.value);
    }

    const handleOnClickAddBtn = () => {
        const todoService = new TodoService();

        const newTodo = {
            description: todoText,
            checked: false
        }

        setIsLoading(true);

        todoService.create(newTodo).then((response) => {
            if (import.meta.env.DEV) {
                console.log(response);
            }

            setNRequest(nRequest + 1);
            toast.show("success", "Tarefa criada!");
        }).finally(() => {
            setTodoText("");
            setIsLoading(false)
        });
    }

    const handleOnClickDeleteBtn = (todo: Todo) => {
        const todoService = new TodoService();

        todoService.delete(todo.id).then((response) => {
            if (import.meta.env.DEV) {
                console.log(response);
            }

            setNRequest(nRequest + 1);
            toast.show("success", "Tarefa removida!");
        })
    }

    const updateTodo = (todo: Todo) => {
        console.log(todo);
        const data = {description: todo.description, checked: !todo.checked}
        
        const todoService = new TodoService();

        todoService.update(todo.id, data).then((response) => {
            if(response){
                if(response.status == 200){
                    setNRequest(nRequest + 1);
                }
            }
        });
    }

    return (
        <Template>
            <Container maxW="container.lg" p="0px 10px">
                <Stack spacing={2} minH="calc(100vh - 62px - 30px - 50px)" maxH="calc(100vh - 62px - 30px - 54px)" overflow="auto" p="10px 0">
                    {characterList ? characterList.results.map((item) => {
                        return (
                            <Flex key={item.id} justifyContent="space-between">
                                <Checkbox w="80%" isChecked={item.checked} textDecor={item.checked ? "line-through" : "none"} onChange={()=>{updateTodo(item)}}>{item.description}</Checkbox>
                                <IconButton borderRadius="50%" variant="ghost" aria-label="Excluir" colorScheme="red" icon={<BsFillTrashFill />} onClick={() => { handleOnClickDeleteBtn(item) }} />
                            </Flex>
                        )

                    }) : <></>}
                </Stack>
                <Flex minH="50px">
                    <NewTodoInput handleOnChange={handleOnChangeText} handleOnClick={handleOnClickAddBtn} isLoading={isLoading} value={todoText} />
                </Flex>
            </Container>
        </Template>
    );
}

export default Home;
