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
        <>
            <div className={classes.album_card}>
                <Card className={classes.album_card_item} raised={true} variant="elevation">
                    <div className={classes.albumImageDiv}>
                        {data.cover_image != null &&
                            <CardMedia
                                component="img"
                                image={data.cover_image}
                                alt={data.name}
                                className={`click ${classes.albumImage}`}
                                onClick={handleModalOpen}
                            />
                        }
                    </div>
                    <CardActionArea className={classes.card_action_area}>
                        <CardContent className={`click ${classes.content}`} onClick={handleModalOpen}>
                            <div className={classes.card_title}>
                                <Typography gutterBottom variant="body" component="div">
                                    {data.name}
                                </Typography>
                            </div>
                            {data.description != null &&
                                <Typography variant="body" color="text.secondary" className={classes.description}>
                                    {data.description}
                                </Typography>
                            }
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.card_action}>
                        <ConfirmationDialog
                            deleteItem={deleteItem}
                            title={`Are you sure you want to delete this album?`}
                            content={`This won't delete any images associated with this album, but it will remove the album`}
                        />
                    </CardActions>
                </Card>
            </div>
            <AlbumDetailModal
                open={modalOpen}
                handleClose={handleModalClose}
                albumId={data.id}
                ids={ids}
            />
        </>
    );
}

export default AlbumCard