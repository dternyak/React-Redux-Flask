import { SET_REGISTER } from "../constants";


export function setRegister(data) {
    return {
        type: SET_REGISTER,
        payload: {
            data: data,
        },
    };
}

