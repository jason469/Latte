import {ManageItems} from "../../../utils/ManageItems";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import AlbumDetailModal from "../../pages/albums/AlbumDetailModal";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import '../../../App.css'
import classes from './AlbumCard.module.css'
import ConfirmationDialog from "../ConfirmationDialog";

function AlbumCard({data, ids, setDeletedItem = null}) {
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const deleteItem = () => {
        ManageItems({
            endpoint: `albums/${data.id}`,
            method: "DELETE",
            authTokens: authTokens,
            logoutUser: logoutUser,
        })
        setDeletedItem(data.id)
    }

    return (
        <div>
            <CardActionArea className={classes.album_card}>
                <Card className={classes.album_card_item} raised={true} variant="elevation">
                    {data.cover_image != null &&
                        <CardMedia
                            component="img"
                            image={data.cover_image}
                            alt={data.name}
                            className={`click ${classes.img}`}
                            onClick={handleModalOpen}
                        />
                    }
                    <CardContent className={`click ${classes.content}`} onClick={handleModalOpen}>
                        <div className={classes.card_title}>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.name}
                            </Typography>
                            <ConfirmationDialog
                                deleteItem={deleteItem}
                                title={`Are you sure you want to delete this album?`}
                                content={`This won't delete any images associated with this album, but it will remove the album`}
                            />
                        </div>
                        {data.description != null &&
                            <Typography variant="body2" color="text.secondary" className={classes.description}>
                                {data.description}
                            </Typography>
                        }
                    </CardContent>
                </Card>
            </CardActionArea>
            <AlbumDetailModal
                open={modalOpen}
                handleClose={handleModalClose}
                albumId={data.id}
                ids={ids}
            />
        </div>
    );
}

export default AlbumCard