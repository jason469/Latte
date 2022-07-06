import {Skeleton} from "@mui/material";

function EmptyPage() {
    return (
        <div>
            <Skeleton variant="rectangular" width={210} height={118} />
        </div>
    )
}

export default EmptyPage