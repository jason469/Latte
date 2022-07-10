import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button} from '@mui/material';
import {TextField} from 'formik-mui';
import {useContext, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import FormSubmitMessage from "../../components/ui/FormSubmitMessage";
import {CheckFormOutcome} from "../CheckFormOutcome";
import {ManageItems} from "../ManageItems";
import UpdateContext from "../../contexts/UpdateContext";
import '../../App.css'
import SendIcon from "@mui/icons-material/Send";


function TagForm({title, name, description, method, endpoint}) {
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
            .required("Tag Name Required"),
        description: Yup.string(),
    })


    const onSubmit = (values, {resetForm}) => {
        ManageItems({
            endpoint: endpoint,
            method: method,
            authTokens: authTokens,
            logoutUser: logoutUser,
            body: JSON.stringify(values)
        })
            .then(response => CheckFormOutcome(response.status, resetForm, setFormOutcome))
            .then(() => setUpdatedItem(Math.random()))
            .catch(err => console.log(err))
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                <Form className="form">
                    <div className="title">{title}</div>
                    <FormSubmitMessage
                        formOutcome={formOutcome}
                        item="Tag"
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
            < /Formik>
        </div>
    );
}

export default TagForm;
