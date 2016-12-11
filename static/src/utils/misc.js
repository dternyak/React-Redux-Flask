/* eslint max-len: 0, no-param-reassign: 0 */

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];


        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}


export function parseJSON(response) {
    return response.data;
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function mapLevelAndRole(level, role) {

    let returnObject = {
        level: null,
        role: null,
        bodyOfGovernment: null,
    }

    returnObject.level = level === 'country' ? 'United States' : 'State';
    returnObject.role = role === 'legislatorUpperBody' ? 'Sentator' : 'Congressperson';
    returnObject.bodyOfGovernment = role === 'legislatorUpperBody' ? 'Sentate' : 'House of Representatives';

    return returnObject;
}
