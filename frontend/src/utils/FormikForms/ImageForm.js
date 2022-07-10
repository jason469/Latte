import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button} from '@mui/material';
import {TextField} from 'formik-mui';
import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../../contexts/AuthContext";
import {ManageItems} from "../ManageItems";
import FormSubmitMessage from "../../components/ui/FormSubmitMessage";
import {CheckFormOutcome} from "../CheckFormOutcome";
import {FormikControl} from "../FormikControl/FormikControl";
import UpdateContext from "../../contexts/UpdateContext";
import '../../App.css'
import SendIcon from "@mui/icons-material/Send";


function ImageForm() {
    const [tagOptions, setTagOptions] = useState([])
    const [albumOptions, setAlbumOptions] = useState([])
    const [formOutcome, setFormOutcome] = useState(null);
    const imageRef = useRef();

    let {authTokens, logoutUser} = useContext(AuthContext)
    let {setUpdatedItem} = useContext(UpdateContext)

    const initialValues = {
        name: '',
        description: '',
        tags: [],
        albums: [],
        image: null

    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Image name Required"),
        description: Yup.string(),
    })


    const onSubmit = (values, {resetForm}) => {
        let form_data = new FormData();
        form_data.append('name', values.name);
        form_data.append('description', values.description);
        form_data.append('tags', JSON.stringify(values.tags));
        form_data.append('albums', JSON.stringify(values.albums));
        if (values.file) {
            let counter = 1
            for (let file of values.file) {
                form_data.append(`images__${counter}`, file, values.file.name);
                counter++
            }
        }
        ManageItems({
            endpoint: 'images/',
            method: 'POST',
            authTokens: authTokens,
            logoutUser: logoutUser,
            body: form_data,
            content_type: null
        })
            .then(response => CheckFormOutcome(response.status, resetForm, setFormOutcome))
            .then(() => setUpdatedItem(Math.random()))
            .then(() => imageRef.current.value = null)
        // .catch(err => CheckFormOutcome(err.response.status, resetForm, setFormOutcome))
    };

    useEffect(() => {
        ManageItems({
            endpoint: 'tags',
            method: "GET",
            setFunction: setTagOptions,
            authTokens: authTokens,
            logoutUser: logoutUser
        })
    }, [])

    useEffect(() => {
        ManageItems({
            endpoint: 'albums',
            method: "GET",
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
                        <Form className="form">
                            <div className="title">Add Image</div>
                            <FormSubmitMessage
                                formOutcome={formOutcome}
                                item="Image"
                            />
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                label="Name"
                                component={TextField}
                                className="field"
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
                                className="field"
                            />
                            <br/>

                            <Field
                                innerRef={imageRef}
                                id="image"
                                name="images"
                                type="file"
                                className="form-control field"
                                multiple
                                onChange={event => props.setFieldValue("file", event.currentTarget.files)}
                            />

                            <FormikControl
                                control='checkbox'
                                label='Tags'
                                name='tags'
                                options={tagOptions}
                            />

                            <br/>
                            <FormikControl
                                control='checkbox'
                                label='Albums'
                                name='albums'
                                options={albumOptions}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<SendIcon/>}
                                color="success"
                            >
                                Submit
                            </Button>
                        </Form>
                    )
                }}
            < /Formik>
        </div>
    );
}

export default ImageForm;
