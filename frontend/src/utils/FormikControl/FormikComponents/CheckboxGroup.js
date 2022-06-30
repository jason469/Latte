import {Field, ErrorMessage} from "formik";
import React from 'react';

function CheckboxGroup(props) {
    const {label, name, options, ...otherProps} = props
    return (
        <div className="form-control">
            <label>{label}</label>
            <Field name={name} {...otherProps}>
                {
                    ({field}) => {
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.id}>
                                    <input
                                        type="checkbox"
                                        id={option.id}
                                        {...field}
                                        value={option.name}
                                        checked={field.value.includes(option.name)}
                                    />
                                    <label htmlFor={option.id}>{option.name}</label>
                                </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name}/>
        </div>
    )
}

export default CheckboxGroup
