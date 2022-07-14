import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button, Divider, LinearProgress} from '@mui/material';
import {TextField} from 'formik-mui';
import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../../contexts/AuthContext";
import {ManageItems} from "../ManageItems";
import FormSubmitMessage from "../../components/ui/FormSubmitMessage";
import {CheckFormOutcome} from "../CheckFormOutcome";
import UpdateContext from "../../contexts/UpdateContext";
import SendIcon from "@mui/icons-material/Send";
import MultiSelect from "../FormikControl/FormikComponents/MultiSelect";
import Box from "@mui/material/Box";

import '../../App.css'

function ImageForm() {
    const [tagOptions, setTagOptions] = useState([])
    const [albumOptions, setAlbumOptions] = useState([])
    const [formOutcome, setFormOutcome] = useState(null);

    const [selectedTags, setSelectedTags] = useState([])
    const [selectedAlbums, setSelectedAlbums] = useState([])

    const [loading, setLoading] = useState(false)
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
            .required("Image name required"),
    })


    const onSubmit = (values, {resetForm}) => {
        setLoading(true)
        let form_data = new FormData();
        form_data.append('name', values.name);
        form_data.append('description', values.description);
        form_data.append('tags', JSON.stringify(selectedTags));
        form_data.append('albums', JSON.stringify(selectedAlbums));
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
            .then(response => CheckFormOutcome(response.status, setFormOutcome, resetForm))
            .then(() => setUpdatedItem(Math.random()))
            .then(() => imageRef.current.value = null)
            .then(() => setLoading(false))
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
                            {loading
                                ?
                                <Box sx={{width: '100%'}} className="loader">
                                    <LinearProgress/>
                                </Box>
                                : null
                            }
                            <FormSubmitMessage
                                formOutcome={formOutcome}
                                item="Image"
                                setFormOutcome={setFormOutcome}
                            />
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                label="Name"
                                component={TextField}
                                className="field"
                            />
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
                            <Field
                                innerRef={imageRef}
                                id="image"
                                name="images"
                                type="file"
                                className={`form-control field`}
                                multiple
                                onChange={event => props.setFieldValue("file", event.currentTarget.files)}
                            />
                            <Divider variant="middle"/>
                            <div className="subtitle">Tags</div>
                            <MultiSelect
                                options={tagOptions}
                                label="Tags"
                                item={selectedTags}
                                setItem={setSelectedTags}
                            />
                            <div className="subtitle">Albums</div>
                            <MultiSelect
                                options={albumOptions}
                                label="Albums"
                                item={selectedAlbums}
                                setItem={setSelectedAlbums}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<SendIcon/>}
                                color="success"
                                className="button"
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
