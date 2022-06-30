import CheckboxGroup from "./FormikComponents/CheckboxGroup"

export function FormikControl (props) {
    const {control, ...otherProps} = props
    switch(control) {
        case 'checkbox':
            return <CheckboxGroup {...otherProps} />
        default:
            return null
    }
}
