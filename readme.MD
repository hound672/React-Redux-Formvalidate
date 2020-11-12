Ver 0.0.1

Модуль для валидации форм в приложениях с использованием react-redux.

Использование:
1. Подключить reducer:

import forms from '../modules/FormValidate/reducer/FormValidate'

export default combineReducers({
    ...,
    forms,
    ...
})

2. Компонент с формой перед добавлением в DOM обернуть декоратором:

import FormValidate from '../../modules/FormValidate/decorators/FormValidate'

export default FormValidate(ContactForm, {
    formName: %ИМЯ ФОРМЫ В STORE%,
    fields: [%МАССИВ ИМЕН ПОЛЕЙ ФОРМЫ%],
    apiUrl: %URL НА СЕРВЕРЕ ДЛЯ ВАЛИДАЦИИ ФОРМЫ%
})
