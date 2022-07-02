import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button} from '@mui/material';
import {TextField} from 'formik-mui';
import {useContext, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import FormSubmitMessage from "../../components/ui/FormSubmitMessage";
import {CheckFormOutcome} from "../CheckFormOutcome";
import {ManageItems} from "../ManageItems";


function ImageDetailForm({title, name, description, method, endpoint}) {

    let {authTokens, logoutUser} = useContext(AuthContext)
    const [formOutcome, setFormOutcome] = useState(null);

    const initialValues = {
        name: String(name),
        description: String(description),
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Album name Required"),
        description: Yup.string(),
    })


    const onSubmit = (values, {resetForm}) => {
        let form_data = new FormData();
        form_data.append('name', values.name);
        form_data.append('description', values.description);
        if (values.file) {
            form_data.append('image', values.file, values.file.name);
        }
        ManageItems({
            endpoint: endpoint,
            method: method,
            authTokens: authTokens,
            logoutUser: logoutUser,
            body: form_data,
            content_type: null
        })
            .then(response => CheckFormOutcome(response.status, resetForm, setFormOutcome))
            .catch(err => CheckFormOutcome(err.response.status, resetForm, setFormOutcome))
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {(props) => {
                    const {
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        errors
                    } = props;
                    return (
                        <Form>
                            <h1>{title}</h1>
                            <FormSubmitMessage
                                formOutcome={formOutcome}
                                item="Album"
                            />
                            <div>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    component={TextField}
                                />
                                <br/>
                                <Field
                                    as='textarea'
                                    id="description"
                                    name="description"
                                    type="text"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    component={TextField}
                                />
                                <br/>
                                <Field
                                    id="image"
                                    name="image"
                                    type="file"
                                    className="form-control"
                                    onChange={event => props.setFieldValue("file", event.currentTarget.files[0])}
                                />
                            </div>
                            <Button type="submit">Submit</Button>
                        </Form>
                    )
                }}
            < /Formik>
        </div>
    );
}

export default ImageDetailForm;
