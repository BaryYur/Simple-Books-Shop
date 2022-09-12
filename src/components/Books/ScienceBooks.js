import React, {useContext} from "react";
import BookItemsContext from "../../store/items-context";
import BookItem from "./BookItem";
import CircularProgress from "@mui/material/CircularProgress";

const ScienceBooks = () => {
    const booksCtx = useContext(BookItemsContext);

    return (
        <div className="science-books-container">
            <div className="head-title">
                <h2>Science books</h2>
                <div className="circle">{booksCtx.loadingItem && <CircularProgress />}</div>
            </div>
            <div className="books-container">
                {booksCtx.scienceBookItems.map(item => (
                    <BookItem
                        key={item.id}
                        id={item.id}
                        title={item.volumeInfo.title}
                        image={item.volumeInfo.imageLinks.thumbnail}
                        price={item.saleInfo.retailPrice && item.saleInfo.retailPrice.amount}
                    />
                ))}
            </div>
        </div>
    )
}

export default ScienceBooks;