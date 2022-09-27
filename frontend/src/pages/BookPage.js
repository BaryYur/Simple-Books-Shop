import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import BookItemsContext from "../store/items-context";
// import AuthContext from "../store/auth-context";

import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./BookPage.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const BookPage = () => {
    const params = useParams();
    const [chosenBook, setChosenBook] = useState(null);
    const booksCtx = useContext(BookItemsContext);
    // const authCtx = useContext(AuthContext);
    // const navigate = useNavigate();
    const itemId = JSON.parse(localStorage.getItem("chosenBook")).id + "-local" || "";
    const [liked, setLiked] = useState(booksCtx.isLiked(itemId));
    const [isExpanded, setIsExpanded] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const cart = JSON.parse(localStorage.getItem("cartItems"));
    const local = JSON.parse(localStorage.getItem("localItems"));

    useEffect(() => {
        for (let item of booksCtx.bookItems) {
            if (item.id === params.id) {
                localStorage.setItem("chosenBook", JSON.stringify(item));
            }
        }

        setChosenBook(JSON.parse(localStorage.getItem("chosenBook")));

        for (let i = 0, j = 0; i < cart.length, j < local.length; i++, j++) {
            if ((cart[i] && cart[i].id) === local[j].replace("-local", "")) {
                setDisabled(true);
            }
        }
    }, [params.id, booksCtx.bookItems])

    const likeItemHandler = (id) => {
            booksCtx.likeHandler(id);
            setLiked(booksCtx.isLiked(id));
    }

    const expandedHandler = () => {
        setIsExpanded(active => !active);
    }

    const addingToCart = (id) => {
        if (!booksCtx.cartItems.includes(id)) {
            booksCtx.addingToCart(id);
            setDisabled(true);
        }
    }

    return (
        <div className="book-page-container">
            <section>
                {chosenBook !== null ? (
                    <div className="section-container">
                        <div className="book-info-box">
                            <div className="book-info-box__img-box">
                                <img alt="book-img" style={{ border: "1px solid grey" }} src={chosenBook.volumeInfo.imageLinks.thumbnail} />
                                <div className="desc-box">
                                     <div>
                                         <h3>{chosenBook.volumeInfo.title}</h3>
                                         <p>
                                            <span>Authors: </span>
                                            {chosenBook.volumeInfo.authors ? chosenBook.volumeInfo.authors.map(author => (
                                                <span className="important-span" key={Math.random()}>{author}, </span>
                                            )) : <span>No authors</span>}
                                         </p>
                                         <p>Country ({chosenBook.saleInfo.country})</p>
                                         <p>
                                            <span>Categories: </span>
                                            {chosenBook.volumeInfo.categories.map(category => (
                                                <span className="important-span"  key={Math.random().toString()}>{category}</span>
                                            ))}
                                         </p>
                                         <p>
                                             Pages: <span>{chosenBook.volumeInfo.pageCount && <span>{chosenBook.volumeInfo.pageCount} pages</span>}</span>
                                         </p>
                                    </div>
                                    <p className="price-p">
                                        <span>Price: </span>
                                        <span>
                                            {chosenBook.saleInfo.listPrice ?
                                            (chosenBook.saleInfo.listPrice.amount / 10).toString().split(".")[0] : 100}UAH
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="book-info-box__btns">
                                <Button
                                    id={chosenBook.id}
                                    onClick={() => {
                                        likeItemHandler(`${chosenBook.id}-local`);
                                    }}
                                    style={{ color: "indianred" }}
                                    className="like-btn"
                                >
                                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </Button>
                                <Button
                                    variant="contained"
                                    id={chosenBook.id}
                                    size="small"
                                    variant="contained"
                                    onClick={() => addingToCart(chosenBook.id)}
                                    disabled={disabled}
                                >
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                        <div className="description-container">
                            <Accordion
                                className="accordion-box"
                                onChange={expandedHandler}
                                expanded={isExpanded}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                >
                                    <p className="accordion-title">
                                        Description:
                                    </p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {chosenBook.volumeInfo.description ?
                                        <Typography>{chosenBook.volumeInfo.description}</Typography> : <Typography>None description</Typography>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                ) : (
                    <p>Item not found</p>
                )}
            </section>
        </div>
    )
}

export default BookPage;