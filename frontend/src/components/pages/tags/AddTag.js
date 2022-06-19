import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button, Box} from '@mui/material';
import {TextField} from 'formik-mui';
import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";


function AddTag() {
    let {authTokens} = useContext(AuthContext)
    const initialValues = {
        name: '',
        description: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Tag Name Required"),
        description: Yup.string(),
    })


    const onSubmit = (values, {resetForm}) => {
        console.log(authTokens.access)
        let url = 'tags/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    resetForm({values: ''})
                }
            })
            .catch(err => console.log(err))
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
                            <h1>Add Tags</h1>
                            <div>
                                <Box margin={2}>
                                    <Field
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Name"
                                        component={TextField}
                                    />
                                </Box>
                                <br/>
                                <Box margin={2}>
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
                                </Box>
                                <br/>
                            </div>
                            <Button type="submit">Submit</Button>
                        </Form>
                    )
                }}
            < /Formik>
        </div>
    );
}

export default AddTag;
