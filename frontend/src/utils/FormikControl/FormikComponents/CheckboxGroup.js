import {Field, ErrorMessage} from "formik";
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
                                    <div className="pretty p-icon p-rotate p-thick">
                                        <input
                                            type="checkbox"
                                            id={option.id}
                                            {...field}
                                            value={option.name}
                                            checked={field.value.includes(option.name)}
                                        />
                                        <div className="state p-info">
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
