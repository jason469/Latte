import {Formik, Form, Field} from 'formik';
import * as Yup from "yup"
import {Button, Box, Alert} from '@mui/material';
import {TextField} from 'formik-mui';
import {useContext, useState} from "react";
import AuthContext from "../../../contexts/AuthContext";
import FormSubmitMessage from "../../ui/FormSubmitMessage";
import {fiFI} from "@mui/material/locale";
import {CheckFormOutcome} from "../../../utils/CheckFormOutcome";


function AddTag() {
    let {authTokens} = useContext(AuthContext)
    const [formOutcome, setFormOutcome] = useState(null);

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
            .then(response => CheckFormOutcome(response.status, resetForm, setFormOutcome))
            .catch(err => console.log(err))
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <h1>Add Tags</h1>
                    <FormSubmitMessage
                        formOutcome={formOutcome}
                        item="Tag"
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
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
            < /Formik>
        </div>
    );
}

export default AddTag;
