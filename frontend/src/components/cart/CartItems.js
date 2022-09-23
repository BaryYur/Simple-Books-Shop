import React, { useContext } from "react";

import BookItemsContext from "../../store/items-context";
import { Link } from "react-router-dom";

import "./CartItems.css";

const CartItems = () => {
    const booksCtx = useContext(BookItemsContext);
    const cartItems = booksCtx.cartItems;

    return (
        <div className="cart-items-container">
            <ul>
                {cartItems.map(book => (
                    <li key={Math.random()} onClick={booksCtx.closingCartHandler}>
                        <Link to={`/all-books/${book.id}`}>
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt="book-img" />
                            <p>{book.volumeInfo.title}</p>
                        </Link>
                        <div className="cart-items__price-box">
                            <div>
                                <p>{book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : 0}hrn / 1</p>
                            </div>
                            <div>
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