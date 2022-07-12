import {ManageItems} from "../../../utils/ManageItems";
import {useState, useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";
import AlbumDetailModal from "../../pages/albums/AlbumDetailModal";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import '../../../App.css'
import classes from './AlbumCard.module.css'

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
            <Card className={classes.album_card_item}>
                {data.cover_image != null &&
                    <CardMedia
                        component="img"
                        image={data.cover_image}
                        alt={data.name}
                        className={`click ${classes.img}`}
                        onClick={handleModalOpen}
                    />
                }
                <CardContent className="click" onClick={handleModalOpen}>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    {data.description != null &&
                        <Typography variant="body2" color="text.secondary">
                            {data.description}
                        </Typography>
                    }
                </CardContent>
            </Card>
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