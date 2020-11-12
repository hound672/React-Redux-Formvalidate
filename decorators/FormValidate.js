import React from 'react'
import {connect} from 'react-redux'

import serialize from 'form-serialize'

import {formInit, formDisable, formRequest} from '../AC/FormValidator'

const decorator = (Component, settingsParametrs) => class DecoratedComponent extends React.Component {
    state = {
        pristine: true
    }

    static propTypes = {
        formRequest: React.PropTypes.func.isRequired,
        formInit: React.PropTypes.func.isRequired,
        formDisable: React.PropTypes.func.isRequired,
        onSuccess: React.PropTypes.func.isRequired,
        stateForm: React.PropTypes.object,
        update: React.PropTypes.object
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            pristine: false
        })
    }

    manualChangeValue = () => {
        this.setState({
            pristine: false
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {formName, apiUrl} = settingsParametrs
        const {formRequest, update} = this.props
        const form = event.target
        const dataToSend = serialize(form, { hash: true })
        const url = update ? `${apiUrl}${update.id}/` : apiUrl

        formRequest(formName, url, dataToSend, update != null)
    }

    componentDidMount = () => {
        const {formName} = settingsParametrs
        const {formInit, update} = this.props

        if (update) {
            this.setState(update)
        }

        formInit(formName)
    }

    componentWillUnmount = () => {
        const {formName} = settingsParametrs
        const {formDisable} = this.props

        formDisable(formName)
    }

    componentWillReceiveProps(nextProps) {
        const {stateForm} = nextProps
        const {onSuccess} = this.props
        const errors = stateForm.get('errors')

        if (Object.keys(errors).length === 0 && stateForm.get('checked')) {
            onSuccess()
        }
    }

    reset = (event) => {
        event.preventDefault()

        const {formName} = settingsParametrs
        const {formInit} = this.props
        var newState = {
            pristine: true
        }

        settingsParametrs.fields.map((field) => {
            newState[field] = ''
        })

        this.setState(newState)
        formInit(formName)
    }

    render() {

        const {stateForm} = this.props
        const errorsList = stateForm ? stateForm.get('errors') : {}
        const checked = stateForm ? stateForm.get('checked') : false

        var fields = {}
        var errors = {}

        settingsParametrs.fields.map((fieldName) => {
            fields[fieldName] = {
                name: fieldName,
                value: this.state[fieldName] || '',
                onChange: this.handleChange
            }

            var status

            if (checked && errorsList[fieldName]) {
                status = 'error'
            } else if (checked && !errorsList[fieldName]) {
                status = 'success'
            } else {
                status = null
            }

            errors[fieldName] = {
                text: errorsList ? errorsList[fieldName] : null,
                status: status
            }
        })
        const resultFileds = {
            fields,
            errors
        }
        const pristine = this.state.pristine
        const validating = stateForm ? stateForm.get('validating') : false

        return <Component
            {...this.props}
            formData={resultFileds}
            handleSubmit={this.handleSubmit}
            reset={this.reset}
            pristine={pristine}
            validating={validating}
            manualChangeValue={this.manualChangeValue}
        />
    }
}


export default (Component, settingsParametrs) =>
    connect(state => {
        const {formName} = settingsParametrs
        const {forms} = state
        const stateForm = forms.get(formName)
        return {stateForm}
    }, {
        formInit,
        formDisable,
        formRequest
    })(decorator(Component, settingsParametrs))