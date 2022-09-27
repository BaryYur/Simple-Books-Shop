import React, { useState, useEffect } from "react";

const BookItemsContext = React.createContext({
    bookItems: [],
    localItems: [],
    scienceBooks: [],
    adventureBooks: [],
    likedItems: [],
    likedLocalItems: [],
    cartItems: [],
})

export const BookItemsContextProvider = (props) => {
    const [scienceBooks, setScienceBooks] = useState([]);
    const [adventureBooks, setAdventureBooks] = useState([]);
    const searchingBookItems = JSON.parse(localStorage.getItem("searchingItems")) || [];
    const allItems = [...scienceBooks, ...adventureBooks];
    const [loading, setLoading] = useState(false);
    const localItems = JSON.parse(localStorage.getItem("localItems")) || [];
    const [likedLocalItems, setLikedLocalItems] = useState(JSON.parse(localStorage.getItem("likedItems")) || []);
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cartItems")) || []
    );

    const [isOpen, setIsOpen] = useState(false);

    const openCartHandler = () => {
        setIsOpen(true);
    }

    const closeCartHandler = () => {
        setIsOpen(false);
    }

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

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

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
            for (let item of allItems) {
                if (id.replace("-local", "") === item.id) {
                    likedLocalItems.push(item);
                }
            }

            localStorage.setItem("likedItems", JSON.stringify(likedLocalItems));
            localStorage.setItem("localItems", JSON.stringify(localItems));
        } else {
            for (let i = 0; i < localItems.length; i++) {
                if (localItems[i] === id) {
                    localItems.splice(i, 1);
                }
            }

            setLikedLocalItems(likedLocalItems.filter(item => item.id !== id.replace("-local", "")));
            localStorage.setItem("localItems", JSON.stringify(localItems));
        }
    }

    const addingToCartHandler = (id) => {
        for (let item of allItems) {
            if (item.id === id) {
                let localItem = {
                    ...item,
                    counter: 1,
                    basicPrice: item.saleInfo.retailPrice ? (item.saleInfo.retailPrice.amount / 10).toString().split(".")[0] : 100,
                    price: item.saleInfo.retailPrice ? (item.saleInfo.retailPrice.amount / 10).toString().split(".")[0] : 100
                }

                setCartItems(prevItems => {
                    return [...prevItems, localItem];
                })
            }
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
                isLiked: isLiked,
                likedItems: likedLocalItems,
                cartItems: cartItems,
                addingToCart: addingToCartHandler,
                cartIsOpen: isOpen,
                openingCartHandler: openCartHandler,
                closingCartHandler: closeCartHandler,
            }}
        >
            {props.children}
        </BookItemsContext.Provider>
    );
}

export default BookItemsContext;

