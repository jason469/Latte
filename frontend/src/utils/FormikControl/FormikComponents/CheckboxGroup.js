import {Field, ErrorMessage} from "formik";
import React from 'react';

import "./CheckboxGroup.css"

function CheckboxGroup(props) {
    const {label, name, options, ...otherProps} = props
    return (
        <div>
            <Field
                name={name}
                {...otherProps}>
                {
                    ({field}) => {
                        return options.map(option => {
                            return (
                                <React.Fragment
                                    key={option.id}
                                >
                                    <div className="pretty p-icon p-round p-jelly p-plain">
                                        <input
                                            type="checkbox"
                                            id={option.id}
                                            {...field}
                                            value={option.name}
                                            checked={field.value.includes(option.name)}
                                        />
                                        <div className="state p-primary">
                                            <i className="icon mdi mdi-check-all"/>
                                            <label
                                                htmlFor={option.id}
                                                className="checkbox_label"
                                            >
                                                {option.name}
                                            </label>
                                        </div>
                                    </div>
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
