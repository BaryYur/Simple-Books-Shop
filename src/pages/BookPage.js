import React, {useState, useEffect, useContext} from "react";

import { useParams } from "react-router-dom";
import BookItemsContext from "../store/items-context";

import "./BookPage.css";

const BookPage = () => {
    const params = useParams();
    const [chosenBook, setChosenBook] = useState(null);
    const booksCtx = useContext(BookItemsContext);

    useEffect(() => {
        for (let item of booksCtx.bookItems) {
            if (item.id === params.id) {
                console.log(item)
                setChosenBook(item);
            }
        }
    }, [])

    return (
        <div className="book-page-container">
            <section>
                {chosenBook !== null ? (
                    <div className="sectioon-container">
                        <div>
                            <img src={chosenBook.volumeInfo.imageLinks.thumbnail} />
                            <h3>{chosenBook.volumeInfo.title}</h3>
                        </div>
                        <div>
                            <p>Country ({chosenBook.saleInfo.country})</p>
                            <p>
                                <span>Categories: </span>
                                {chosenBook.volumeInfo.categories.map(category => (
                                    <span key={Math.random().toString()}>{category}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p>Not found item</p>
                )}
            </section>
        </div>
    )
}

export default BookPage;