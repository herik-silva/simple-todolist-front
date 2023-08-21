export interface UserTokenProps {
    access: string;
    refresh: string;
    timer: number;
}

class UserToken {
    access: string
    refresh: string
    timer: number

    constructor(userTokenProps: UserTokenProps) {
        this.access = userTokenProps.access;
        this.refresh = userTokenProps.refresh;
        this.timer = userTokenProps.timer;
    }
}

export default UserToken;