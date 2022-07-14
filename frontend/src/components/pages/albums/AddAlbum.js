import AlbumForm from "../../../utils/FormikForms/AlbumForm";
import '../../../App.css'


function AddAlbum() {
    return (
        <div>
            <AlbumForm
                title="Add Album"
                name=''
                description=''
                method='POST'
                endpoint='albums'
            />
        </div>
    );
}

export default AddAlbum;
