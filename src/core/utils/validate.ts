export interface InputValidate {
    name: string;
    input: string;
    minLength: number;
    isRequired: boolean;
}

export interface ValidateError {
    inputName: string;
    description: string;
}

export const validateInput = (inputValidateList: InputValidate[], passwordLabel?: string, confirmPasswordLabel?: string): ValidateError[] => {
    const validateErrorList: ValidateError[] = [];

    for(const inputValidate of inputValidateList){
        
        if(import.meta.env.DEV){
            console.log(`${inputValidate.name} - ${inputValidate.input}`);
        }

        if(inputValidate.name == "E-mail"){
            const isValidEmail = inputValidate.input.includes("@") && inputValidate.input.includes(".com");

            if(!isValidEmail)
                validateErrorList.push({
                    inputName: inputValidate.name,
                    description: `O e-mail está em um formato inválido.`
                })
        }

        if(inputValidate.isRequired && inputValidate.input.length == 0){
            validateErrorList.push({
                inputName: inputValidate.name,
                description: `O campo "${inputValidate.name}" é obrigatório`
            })

            continue;
        }

        if(inputValidate.input.length < inputValidate.minLength){
            validateErrorList.push({
                inputName: inputValidate.name,
                description: `O campo "${inputValidate.name}" precisa ter mais que ${inputValidate.minLength} caracteres.`
            })
        }
    }

    if(passwordLabel && confirmPasswordLabel){
        const inputPassword = inputValidateList.find(input => input.name == passwordLabel);
        const inputConfirmPassword = inputValidateList.find(input => input.name == confirmPasswordLabel);

        if(inputPassword?.input != inputConfirmPassword?.input){
            validateErrorList.push({
                inputName: `${inputPassword?.name} e ${inputConfirmPassword?.name}`,
                description: `Os campos "${inputPassword?.name}" e "${inputConfirmPassword?.name}" devem ser iguais.`
            })
        }
    }

    return validateErrorList;
}