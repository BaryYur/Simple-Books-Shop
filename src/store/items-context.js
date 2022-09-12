import React, { useState, useEffect } from "react";

const BookItemsContext = React.createContext({
    isLoggedIn: false,
    bookItems: [],
    localItems: [],
    scienceBooks: [],
    adventureBooks: []
})

export const BookItemsContextProvider = (props) => {
    const [scienceBooks, setScienceBooks] = useState([]);
    const [adventureBooks, setAdventureBooks] = useState([]);
    const searchingBookItems = JSON.parse(localStorage.getItem("searchingItems")) || [];
    const allItems = [...scienceBooks, ...adventureBooks];
    const [loading, setLoading] = useState(false);
    const localItems = JSON.parse(localStorage.getItem("localItems")) || [];

    const scienceUrl = "https://books.googleapis.com/books/v1/volumes?q=science&download=EPUB&filter=ebooks&maxResults=40&printType=BOOKS&source=ebook";
    const adventureUrl = "https://books.googleapis.com/books/v1/volumes?q=adventure&download=EPUB&filter=ebooks&maxResults=40&printType=BOOKS&source=ebook";

    useEffect(() => {
        setLoading(true);
        fetch(scienceUrl)
            .then(response => response.json())
            .then(response => {
                setScienceBooks(response.items);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            })

        fetch(adventureUrl)
            .then(response => response.json())
            .then(response => {
                setAdventureBooks(response.items);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    const isLiked = (id) => {
        for (let item of localItems) {
            if (id === item) {
                return true;
            }
        }
    }

    const likeHandler = (id) => {
        if (!localItems.includes(id)) {
            localItems.push(id);
            localStorage.setItem("localItems", JSON.stringify(localItems));
        } else {
            for (let i = 0; i < localItems.length; i++) {
                if (localItems[i] === id) {
                    localItems.splice(i, 1);
                }
            }

            localStorage.setItem("localItems", JSON.stringify(localItems));
        }
    }

    return (
        <BookItemsContext.Provider
            value={{
                bookItems: allItems,
                scienceBookItems: scienceBooks,
                adventureBookItems: adventureBooks,
                localBookItems: localItems,
                searchingBooks: searchingBookItems,
                loadingItem: loading,
                likeHandler: likeHandler,
                isLiked: isLiked
            }}
        >
            {props.children}
        </BookItemsContext.Provider>
    );
}

export default BookItemsContext;

