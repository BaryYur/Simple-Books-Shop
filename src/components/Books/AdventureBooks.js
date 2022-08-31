import React, {useContext} from "react";
import BookItemsContext from "../../store/items-context";
import BookItem from "./BookItem";

const AdventureBooks = () => {
    const booksCtx = useContext(BookItemsContext);

    return (
        <div className="adventure-books-container">
            <h2>Adventure books</h2>
            <div className="books-container">
                {booksCtx.adventureBookItems.map(item => (
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

export default AdventureBooks;