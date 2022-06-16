import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import ImageCard from "../ui/ImageCard";
import classes from "./Pagination.module.css";


function Pagination({itemsPerPage, data}) {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data])


    return (
        <>
            <div className={classes.images}>
                {currentItems.map(item => <ImageCard data={item}/>)}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={classes.pagination}
                pageLinkClassName={classes.page_num}
                previousLinkClassName={classes.page_num}
                nextLinkClassName={classes.page_num}
                activeLinkClassName={classes.active}
            />
        </>
    );
}

export default Pagination