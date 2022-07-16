import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {TextField,} from 'formik-mui';
import {useContext, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import FormSubmitMessage from "../../components/ui/FormSubmitMessage";
import {CheckFormOutcome} from "../CheckFormOutcome";
import {ManageItems} from "../ManageItems";
import UpdateContext from "../../contexts/UpdateContext";
import '../../App.css'


function AlbumForm({title, name, description, method, endpoint}) {

    let {authTokens, logoutUser} = useContext(AuthContext)
    const [formOutcome, setFormOutcome] = useState(null);

    let {setUpdatedItem} = useContext(UpdateContext)

    const initialValues = {
        name: String(name),
        description: String(description),
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Album name is required"),
    })


    const onSubmit = (values, {resetForm}) => {
        let form_data = new FormData();
        form_data.append('name', values.name);
        form_data.append('description', values.description);
        if (values.file) {
            form_data.append('cover_image', values.file, values.file.name);
        }
        ManageItems({
            endpoint: endpoint,
            method: method,
            authTokens: authTokens,
            logoutUser: logoutUser,
            body: form_data,
            content_type: null
        })
            .then(response => CheckFormOutcome(response.status, setFormOutcome, resetForm))
            .then(() => setUpdatedItem(Math.random()))
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
                        <Form className="form">
                            <div className="title">{title}</div>
                            <FormSubmitMessage
                                formOutcome={formOutcome}
                                item="Album"
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
                            <Field
                                id="image"
                                name="cover_image"
                                type="file"
                                className="form-control field"
                                onChange={event => props.setFieldValue("file", event.currentTarget.files[0])}
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

export default AlbumForm;
