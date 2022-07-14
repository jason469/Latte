import CheckboxGroup from "./FormikComponents/CheckboxGroup"
import 'pretty-checkbox/dist/pretty-checkbox.min.css';


export function FormikControl (props) {
    const {control, ...otherProps} = props
    switch(control) {
        case 'checkbox':
            return <CheckboxGroup {...otherProps} />
        default:
            return null
    }
}
