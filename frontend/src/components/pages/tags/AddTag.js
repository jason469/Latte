import classes from './AddTag.module.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button, Box} from '@mui/material';
import {TextField} from 'formik-mui';
import axios from 'axios';
import {useState, useEffect} from "react";


function AddTag() {
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
        let url = 'http://localhost:8000/api/tags/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => response.status)
            .then((status) => {
                if (status === 201) {
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
