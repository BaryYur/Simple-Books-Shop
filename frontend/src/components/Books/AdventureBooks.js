import React, {useContext} from "react";
import BookItemsContext from "../../store/items-context";
import CircularProgress from "@mui/material/CircularProgress";
import BookItem from "./BookItem";

const AdventureBooks = () => {
    const booksCtx = useContext(BookItemsContext);

    return (
        <div className="adventure-books-container">
            <div className="head-title">
                <h2>Adventure books</h2>
                <div className="circle">{booksCtx.loadingItem && <CircularProgress />}</div>
            </div>
            <div className="books-container">
                {booksCtx.adventureBookItems.map(item => (
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

export default AdventureBooks;