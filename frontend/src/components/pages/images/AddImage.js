import classes from './AddImage.module.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button, Box} from '@mui/material';
import {TextField} from 'formik-mui';
import axios from 'axios';
import {useState, useEffect} from "react";


function AddImage() {
    const [tagOptions, setTagOptions] = useState([])
    const initialValues = {
        name: '',
        description: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("First Name Required"),
        description: Yup.string(),
        // image: Yup.object().shape({
        //     file: Yup.mixed().required('File is required'),
        // })
    })


    const onSubmit = (values, {resetForm}) => {
        let form_data = new FormData();
        form_data.append('name', values.name);
        form_data.append('description', values.description);
        form_data.append('image', values.file, values.file.name);
        form_data.append('tag', values.tag);
        let url = 'http://localhost:8000/api/images/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(() => resetForm({values: ''}))
            .catch(err => console.log(err))
    };

    const createTagOptions = () => {
        let items = [];
        for (const tagOption of tagOptions) {
            items.push(
                <option
                    key={tagOption.id}
                    value={tagOption.name}
                >
                    {tagOption.name}
                </option>)
        }
        return items
    }

    useEffect(() => {
        let url = `http://localhost:8000/api/tags/`;
        fetch(url)
            .then(response => response.json())
            .then(json => setTagOptions(json))
            .then(() => createTagOptions())
    }, [])

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
                                        multiline
                                        rows={4}
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

                                <Box margin={2}>
                                    <Field as="select"
                                           name="tag"
                                           id="tag"
                                    >
                                        {createTagOptions}
                                    </Field>
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

export default AddImage;
