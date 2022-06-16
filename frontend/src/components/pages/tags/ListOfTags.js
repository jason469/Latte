import classes from './ListOfTags.module.css'
import Pagination from "../../layout/Pagination";
import {useEffect, useState} from "react";
import TagCard from "../../ui/TagCard";

function ListOfTags() {
    const [tagData, setTagData] = useState([])
    const [currentItems, setCurrentItems] = useState([]);

    // Fetch current items
    const pull_tags = (tags) => {
        setCurrentItems(tags);
    }

    //Fetch tags
    useEffect(() => {
        let url = 'http://localhost:8000/api/tags/';
        fetch(url)
            .then(response => response.json())
            .then(data => setTagData(data))
    }, [])

    return (
        <div>
            <div className={classes.tags}>
                {currentItems.map(item => <TagCard data={item}/>)}
            </div>
            <Pagination
                itemsPerPage={12}
                data={tagData}
                pull_function={pull_tags}
            />
        </div>
    )
}

export default ListOfTags;
