import React, {useState, useEffect, useContext} from "react";

import {useNavigate, useParams} from "react-router-dom";
import BookItemsContext from "../store/items-context";
import AuthContext from "../store/auth-context";

import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./BookPage.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const BookPage = () => {
    const params = useParams();
    const [chosenBook, setChosenBook] = useState(null);
    const booksCtx = useContext(BookItemsContext);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        for (let item of booksCtx.bookItems) {
            if (item.id === params.id) {
                localStorage.setItem("chosenBook", JSON.stringify(item));
            }
        }

        setChosenBook(JSON.parse(localStorage.getItem("chosenBook")));
    }, [])

    const likeItemHandler = (id) => {
        if (authCtx.isLoggedIn === false) {
            navigate("/auth");
        } else {
            booksCtx.likeHandler(id);
            booksCtx.isLiked(id);
        }
    }

    const [isExpanded, setIsExpanded] = useState(true);

    const expandedHandler = () => {
        setIsExpanded(active => !active);
    }

    console.log(chosenBook)

    return (
        <div className="book-page-container">
            <section>
                {chosenBook !== null ? (
                    <div className="section-container">
                        <div className="book-info-box">
                            <div className="book-info-box__img-box">
                                <img style={{ border: "1px solid grey" }} src={chosenBook.volumeInfo.imageLinks.thumbnail} />
                                <div className="desc-box">
                                    <div>
                                        <h3>{chosenBook.volumeInfo.title}</h3>
                                        <p>
                                            <span>Authors: </span>
                                            {chosenBook.volumeInfo.authors ? chosenBook.volumeInfo.authors.map(author => (
                                                <span key={Math.random()}>{author}</span>
                                            )) : <span>No authors</span>}
                                        </p>
                                        <p>Country ({chosenBook.saleInfo.country})</p>
                                        <p>
                                            <span>Categories: </span>
                                            {chosenBook.volumeInfo.categories.map(category => (
                                                <span key={Math.random().toString()}>{category}</span>
                                            ))}
                                        </p>
                                    </div>
                                    <p className="price-p">
                                        <span>Price: </span>
                                        <span>{chosenBook.saleInfo.listPrice ? chosenBook.saleInfo.listPrice.amount : 0}UAH</span>
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
                                    {booksCtx.localBookItems.includes(chosenBook.id + "-local")
                                        ? <FavoriteIcon /> : <FavoriteBorderIcon />
                                    }
                                </Button>
                                <Button variant="contained">Add to cart</Button>
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
                                    <Typography>{chosenBook.volumeInfo.description}</Typography>
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