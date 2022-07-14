import TagForm from "../../../utils/FormikForms/TagForm";
import '../../../App.css'


function AddTag() {
    return (
        <div>
            <TagForm
                title="Add tags"
                name=''
                description=''
                method='POST'
                endpoint='tags/'
            />
        </div>
    );
}

export default AddTag;
