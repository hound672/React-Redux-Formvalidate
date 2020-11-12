import { FORM_INIT, FORM_DISABLE, FORM_REQUEST } from '../constants/FormValidator'

export function formInit(formName) {
    return {
        type: FORM_INIT,
        formName
    }
}

export function formDisable(formName) {
    return {
        type: FORM_DISABLE,
        formName
    }
}

export function formRequest(formName, apiUrl, data, update) {
    return {
        type: FORM_REQUEST,
        formName,
        callApi: {
            apiUrl,
            method: update?'PUT':'POST',
            data
        }
    }
}