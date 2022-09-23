import React, {useContext} from "react";

import BookItem from "./BookItem";
import "./Books.css";
import BookItemsContext from "../../store/items-context";

const Books = () => {
    const booksCtx = useContext(BookItemsContext);

    return (
        <div className="books-container">
            {booksCtx.bookItems.map(item => (
                <BookItem
                    key={item.id}
                    id={item.id}
                    title={item.volumeInfo.title}
                    image={item.volumeInfo.imageLinks.thumbnail}
                    price={item.saleInfo.retailPrice && item.saleInfo.retailPrice.amount}
                />
            ))}
        </div>
    )
}

export default Books