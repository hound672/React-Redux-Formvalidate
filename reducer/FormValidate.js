import {Map} from 'immutable'

import {
    FORM_INIT, FORM_DISABLE, FORM_REQUEST,
    START, SUCCESS, FAIL
} from '../constants/FormValidator'

const initialState = new Map({})


export default (state = initialState, action) => {
    const {type, formName, response, error} = action

    switch (type) {
        case FORM_INIT:
            return state.set(formName, new Map({
                'errors': {},
                'checked': false,
                'validating': false
            }))

        case FORM_DISABLE:
            return state.delete(formName)

        case FORM_REQUEST + START:
            return state.setIn([formName, 'validating'], true)

        case FORM_REQUEST + SUCCESS:
            return state
                .setIn([formName, 'checked'], true)
                .setIn([formName, 'validating'], false)
                .setIn([formName, 'errors'], {})

        case FORM_REQUEST + FAIL:
            console.log('FORM_REQUEST + FAIL:', error)
            return state
                .setIn([formName, 'checked'], true)
                .setIn([formName, 'validating'], false)
                .setIn([formName, 'errors'], response)

    }

    return state
}