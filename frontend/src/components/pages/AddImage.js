import classes from './AddImage.module.css'
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import * as Yup from "yup"
import {Button, LinearProgress, Box} from '@mui/material';
import {TextField} from 'formik-mui';


function AddImage() {
    const initialValues = {
        name: '',
        description: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("First Name Required"),
        description: Yup.string()
    })


    const onSubmit = (values) => {
        console.log(values.name)
        let form_data = new FormData();
        form_data.append('name', String(values.name));
        form_data.append('description', values.description);
        form_data.append('image', values.file, values.file.name);
        let url = 'http://localhost:8000/api/images/';
        console.log(form_data.getAll('image'))
        fetch(url, {
            method: 'POST',
            body: form_data,
            headers: {
                'Content-type': 'multipart/form-data',
            }
        })
            .then(res => {
                console.log(res.data);
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
                            <h1>Add Image</h1>
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
                                        component={TextField}
                                    />
                                </Box>
                                <br/>

                                <Box margin={2}>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="form-control"
                                        onChange={event => props.setFieldValue("file", event.currentTarget.files[0])}
                                    />
                                </Box>
                            </div>
                            <Button type="submit">Submit</Button>
                        </Form>
                    )
                }}
            < /Formik>
        </div>
    );
}

export default AddImage;
