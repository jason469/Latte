import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../../App.css'


function Pagination({itemsPerPage, data, pull_function}) {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = data.slice(itemOffset, endOffset);
        setPageCount(Math.ceil(data.length / itemsPerPage));
        pull_function(currentItems);
    }, [itemOffset, itemsPerPage, data])


    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<ChevronRightIcon/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel={<ChevronLeftIcon/>}
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