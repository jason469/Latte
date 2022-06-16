import classes from './AddImage.module.css'
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import * as Yup from "yup"
import {Button, LinearProgress, Box} from '@mui/material';
import {TextField} from 'formik-mui';


function AddImage() {
    const initialValues = {
        imageTitle: '',
        description: '',
    }

    const validationSchema = Yup.object({
        imageTitle: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("First Name Required"),
        description: Yup.string(),
        image: Yup.object()
            .required("An image must be uploaded"),
    })

    // const onSubmit = (values, actions) => {
    //     alert("Form is validated!")
    // }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(props) => {
                    alert("Form is validated!")
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <h1>Add Image</h1>
                        <div>
                            <Box margin={2}>
                                <Field
                                    id="imageTitle"
                                    name="imageTitle"
                                    type="text"
                                    label="Title"
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
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default AddImage;
