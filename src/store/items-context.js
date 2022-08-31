import React, { useState, useEffect } from "react";

const BookItemsContext = React.createContext({
    isLoggedIn: false,
    bookItems: [],
    scienceBooks: [],
    adventureBooks: []
})

export const BookItemsContextProvider = (props) => {
    const [scienceBooks, setScienceBooks] = useState([]);
    const [adventureBooks, setAdventureBooks] = useState([]);
    const searchingBookItems = JSON.parse(localStorage.getItem("searchingItems")) || [];

    const scienceUrl = "https://books.googleapis.com/books/v1/volumes?q=sience&download=EPUB&filter=ebooks&maxResults=40";
    const adventureUrl = "https://books.googleapis.com/books/v1/volumes?q=Adventure&download=EPUB&filter=ebooks&maxResults=40";

    useEffect(() => {
        fetch(scienceUrl)
            .then(response => response.json())
            .then(response => {
                setScienceBooks(response.items);
            })
            .catch((error) => {
                console.error(error);
            })

        fetch(adventureUrl)
            .then(response => response.json())
            .then(response => {
                setAdventureBooks(response.items);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    const allItems = [...scienceBooks, ...adventureBooks];

    return (
        <BookItemsContext.Provider
            value={{
                bookItems: allItems,
                scienceBookItems: scienceBooks,
                adventureBookItems: adventureBooks,
                searchingBooks: searchingBookItems
            }}
        >
            {props.children}
        </BookItemsContext.Provider>
    );
}

export default BookItemsContext;

