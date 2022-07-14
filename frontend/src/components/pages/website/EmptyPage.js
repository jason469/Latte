import {Skeleton} from "@mui/material";
import '../../../App.css'

function EmptyPage() {
    return (
        <div>
            <Skeleton variant="rectangular" width={210} height={118} />
        </div>
    )
}

export default EmptyPage