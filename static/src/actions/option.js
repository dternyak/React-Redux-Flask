import { SET_LOAD_IF_NEEDED, SET_SIDEBAR_OPEN } from "../constants";


export function setLoadIfNeeded(value) {
    return {
        type: SET_LOAD_IF_NEEDED,
        payload: {
            data: value,
        },
    };
}


export function setSideBarOpen(value) {
    return {
        type: SET_SIDEBAR_OPEN,
        payload: {
            data: value,
        },
    };
}