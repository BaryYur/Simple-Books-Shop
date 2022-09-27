import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from "@mui/icons-material/Close";
import "./ShoppingCart.css";
import { useContext } from "react";
import BookItemsContext from "../../store/items-context";
import CartItems from "./CartItems";

const style = {
    width: "800px",
    backgroundColor: "background.paper",
    border: "1px solid grey",
    boxShadow: 24,
    padding: "12px",
    borderRadius: "5px",
    margin: "80px auto",
};

const ShoppingCart = () => {
    const booksCtx = useContext(BookItemsContext);
    const books = booksCtx.cartItems;

    return (
        <div className="cart-container">
            <Modal
                open={booksCtx.cartIsOpen}
                onClose={booksCtx.closingCartHandler}
                className="modal"
            >
                <Box sx={{ ...style }}>
                    <div className="cart-head">
                        <h2>Your Cart</h2>
                        <button onClick={booksCtx.closingCartHandler}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="line"></div>
                    {books.length === 0 ?
                        <p className="no-books-paragraph">
                            No books
                        </p> : <CartItems />
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default ShoppingCart;