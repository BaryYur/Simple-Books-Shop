import Books from "./Books";
import React, {useContext} from "react";
import BookItemsContext from "../../store/items-context";
import BookItem from "./BookItem";

const ScienceBooks = () => {
    const booksCtx = useContext(BookItemsContext);

    return (
        <div className="science-books-container">
            <h2>Science books</h2>
            <div className="books-container">
                {booksCtx.scienceBookItems.map(item => (
                    <BookItem
                        key={item.id}
                        id={item.id}
                        title={item.volumeInfo.title}
                        image={item.volumeInfo.imageLinks.thumbnail}
                    />
                ))}
            </div>
        </div>
    )
}

export default ScienceBooks;