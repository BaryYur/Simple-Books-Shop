import React, { useState, useContext } from "react";

import BookItemsContext from "../../store/items-context";
import { Link } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import "./CartItems.css";

const CartItems = () => {
    const booksCtx = useContext(BookItemsContext);
    const [cartItems, setCartItems] = useState(booksCtx.cartItems);

    const increaseHandler = (id) => {
        for (let item of cartItems) {
            if (item.id === id) {
                item.counter = item.counter + 1;
                item.price = item.basicPrice * item.counter;
            }
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }

    const decreaseHandler = (id) => {
        for (let item of cartItems) {
            if (item.id === id && item.counter > 1) {
                item.counter = item.counter - 1;
                item.price = item.basicPrice * item.counter;
            } else if (item.id === id && item.counter === 1) {
                return;
            }
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }

    const deleteCartItemHandler = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
        localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item.id !== id)));
    }

    return (
        <div className="cart-items-container">
            <ul>
                {cartItems.map(book => (
                    <li key={Math.random()} onClick={booksCtx.closingCartHandler} onClick={booksCtx.openingCartHandler}>
                        <Link to={`/all-books/${book.id}`}>
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt="book-img" />
                            <div>
                                <p>{book.volumeInfo.title}</p>
                                <p>{book.volumeInfo.pageCount && <span>{book.volumeInfo.pageCount} pages</span>}</p>
                            </div>
                        </Link>
                        <div className="cart-items__price-box">
                            <div className="price-box__price">
                                <button onClick={() => decreaseHandler(book.id)}>-</button>
                                <p>{book.price ?  book.price: 0}hrn / {book.counter}</p>
                                <button onClick={() => increaseHandler(book.id)}>+</button>
                                <button className="delete-cart-item-btn" onClick={() => deleteCartItemHandler(book.id)}>
                                    <DeleteIcon  />
                                </button>
                            </div>
                            <div className="price-box__order">
                                <button>Order</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CartItems;