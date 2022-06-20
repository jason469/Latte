import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button, Box} from '@mui/material';
import {TextField} from 'formik-mui';
import axios from 'axios';
import {useContext, useState} from "react";
import AuthContext from "../../../contexts/AuthContext";
import FormSubmitMessage from "../../ui/FormSubmitMessage";
import {CheckFormOutcome} from "../../../utils/CheckFormOutcome";


function AddAlbum() {
    const [formOutcome, setFormOutcome] = useState('');
    let {authTokens} = useContext(AuthContext)
    const initialValues = {
        name: '',
        description: '',
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
            form_data.append('cover_image', values.file, values.file.name);
        }
        let url = 'albums/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
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
                            <h1>Add Albums</h1>
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

export default AddAlbum;
