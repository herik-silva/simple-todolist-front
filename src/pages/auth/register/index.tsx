import { Button, Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { Template } from "../../../layout/global";
import countryList from "../../../assets/json/country-list.json";
import Style from "../../../core/domains/enums/style";
import { PasswordInput } from "../../../components/password-input";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../../core/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/domains/enums/routes";
import { InputValidate, validateInput } from "../../../core/utils/validate";
import { ConfirmEmailModal } from "../../../components/modals/confirm-email";
import UserService, { UserServiceData } from "../../../core/services/UserService";

export const Register: React.FC = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [country, setCountry] = useState(countryList[0].name);

    const [state, setState] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOnCloseModal = () => {
        setModalIsOpen(false);
        navigate(ROUTES.PRINCIPAL);
    }

    const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstname(event.target.value);
    }

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const handleBirthDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBirthDate(event.target.value);
    }

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCountry(event.target.value);
    }

    const validate = (): boolean => {
        const inputs: InputValidate[] = [
            {
                name: "Nome Completo",
                input: firstname,
                isRequired: true,
                minLength: 5
            },
            {
                name: "Nome de Usuário",
                input: username,
                isRequired: true,
                minLength: 4
            },
            {
                name: "E-mail",
                input: email,
                isRequired: true,
                minLength: 10
            },
            {
                name: "Senha",
                input: password,
                isRequired: true,
                minLength: 8
            },
            {
                name: "Confirmação da senha",
                input: confirmPassword,
                isRequired: true,
                minLength: 8
            },
            {
                name: "Data de Nascimento",
                input: birthDate,
                isRequired: true,
                minLength: 10
            },
            {
                name: "País",
                input: country,
                isRequired: true,
                minLength: 0
            }
        ];

        const errors = validateInput(inputs, "Senha", "Confirmação da senha");

        if(errors.length > 0){
            
            for(const error of errors){
                toast.show("error", error.description);
            }

            return false;
        }

        return true;
    }

    const registerAccount = (data: UserServiceData) => {
        const userService = new UserService();
        
        if(import.meta.env.DEBUG)
            console.log(data);

        userService.create(data).then((response) => {
            console.log(response);
            if(response){
                toast.show("success", "Cadastro realizado com sucesso!");
                setModalIsOpen(true);
            }
            else{
                toast.show("error", "Deu ruim 😥");
            }
        }).catch((error) => {
            const errors = [];
            if(error.response.data?.user?.email)
                errors.push(error.response.data.user.email[0])

            if(error.response.data?.user?.username)
                errors.push(error.response.data.user.username[0])

            for(const message of errors){
                toast.show("error", message);
            }
        })
        .finally(() => setState(false));
    }
    
    const handleRegisterAccount = () => {
        const isValidated = validate();

        if(isValidated){
            setState(true);
    
            const data: UserServiceData = {
                user: {
                    username: username,
                    email: email,
                    password: password,
                    first_name: firstname
                },
                confirm_password: confirmPassword,
                birth_date: birthDate,
                country: country
            }

            registerAccount(data);
        }
    }

    return (
        <Template>
            <Flex
                m={{base: "20px", lg: 20}}
                justifyContent="center"
            >
                <Flex
                    direction="column"
                    gridGap={10}
                    w={{base: "90%", lg: "50%"}}
                    flexWrap="wrap"
                >
                    <FormControl isRequired>
                        <FormLabel>Nome Completo</FormLabel>
                        <Input variant="outline" borderColor={Style.FOOTER_COLOR}
                            onChange={handleFirstnameChange}
                        />
                    </FormControl>
                    
                    <FormControl isRequired>
                        <FormLabel>Nome de Usuário</FormLabel>
                        <Input variant="outline" borderColor={Style.FOOTER_COLOR}
                            onChange={handleUsernameChange}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>E-mail</FormLabel>
                        <Input variant="outline" borderColor={Style.FOOTER_COLOR}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
          
                    <Flex
                        flexWrap="wrap"
                        gridGap="50px"
                        justifyContent="space-between"
                    >
                        <FormControl isRequired w={{base: "100%", lg: "45%"}}>
                            <FormLabel>Senha</FormLabel>
                            <PasswordInput handleOnChange={handlePasswordChange} />
                        </FormControl>

                        <FormControl isRequired w={{base: "100%", lg: "45%"}}>
                            <FormLabel>Confirmação da senha</FormLabel>
                            <PasswordInput handleOnChange={handleConfirmPasswordChange} />
                        </FormControl>

                        <FormControl isRequired w={{base: "100%", lg: "45%"}}>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <Input variant="outline" borderColor={Style.FOOTER_COLOR} type="date"
                                onChange={handleBirthDateChange}
                            />
                        </FormControl>

                        <FormControl isRequired w={{base: "100%", lg: "45%"}}>
                            <FormLabel>País</FormLabel>
                            <Select variant="outline" borderColor={Style.FOOTER_COLOR} onChange={handleCountryChange}>
                                {countryList.map((country) => {
                                    return <option key={country.code} value={country.name}>{country.name}</option>;
                                })}
                            </Select>
                        </FormControl>
                    </Flex>
                    <Flex justifyContent="center">
                        <Button
                            size="lg"
                            color={Style.TEXT_COLOR}
                            sx={{
                                transition: ".1s ease-in all",
                                background: Style.CONFIRM_BUTTON_COLOR,
                                _hover: {
                                    outlineOffset: "3px",
                                    outline: `3px solid ${Style.HOVER_CONFIRM_BUTTON_COLOR}`,
                                    background: Style.HOVER_CONFIRM_BUTTON_COLOR
                                }
                            }}
                            onClick={handleRegisterAccount}
                            isLoading={state}
                        >Cadastrar-se</Button>

                    </Flex>
                </Flex>
            </Flex>

            <ConfirmEmailModal handleOnClose={handleOnCloseModal} isOpen={modalIsOpen} email={email} />
        </Template>
    );
}