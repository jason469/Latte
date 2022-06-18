import classes from './AddImage.module.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button, Box} from '@mui/material';
import {TextField} from 'formik-mui';
import axios from 'axios';
import {useState, useEffect, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {GetItems} from "../../../utils/GetItems";


function AddImage() {
    const [tagOptions, setTagOptions] = useState([])
    const [albumOptions, setAlbumOptions] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    const initialValues = {
        name: '',
        description: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(100, "Must be 100 characters or less")
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
        form_data.append('tag', values.tag);
        form_data.append('album', values.album);
        if (values.file) {
            form_data.append('image', values.file, values.file.name);
        }
        let url = 'images/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    resetForm({values: null})
                }
            })
            .then(document)
            .catch(err => console.log(err))
    };

    useEffect(() => {
        GetItems({
            endpoint: 'tags',
            setFunction: setTagOptions,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    useEffect(() => {
        GetItems({
            endpoint: 'albums',
            setFunction: setAlbumOptions,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
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
                                    <Field
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
                                        {tagOptions.map(
                                            tagOption =>
                                                <option
                                                    key={tagOption.id}
                                                    value={tagOption.name}
                                                >
                                                    {tagOption.name}
                                                </option>
                                        )}
                                    </Field>
                                </Box>
                                <Box margin={2}>
                                    <Field as="select"
                                           name="album"
                                           id="album"
                                           label="Album"
                                    >
                                        {albumOptions.map(
                                            albumOption =>
                                                <option
                                                    key={albumOption.id}
                                                    value={albumOption.name}
                                                >
                                                    {albumOption.name}
                                                </option>
                                        )}
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
