import React, {useContext} from "react";
import BookItemsContext from "../../store/items-context";

import BookItem from "./BookItem";

const SearchingBooks = () => {
    const booksCtx = useContext(BookItemsContext);

    return (
        <div className="searching-books-container">
            {booksCtx.searchingBooks.map(book => (
                <BookItem
                    key={book.id}
                    id={book.id}
                    title={book.volumeInfo.title}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    price={book.saleInfo.retailPrice && book.saleInfo.retailPrice.amount}
                />
            ))}
        </div>
    )
}

export default SearchingBooks;