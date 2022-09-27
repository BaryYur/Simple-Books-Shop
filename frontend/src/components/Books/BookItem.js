import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import BookItemsContext from "../../store/items-context";
// import AuthContext from "../../store/auth-context";

import "./BookItem.css";

const BookItem = ({ id, image, title, price }) => {
    const booksCtx = useContext(BookItemsContext);
    // const authCtx = useContext(AuthContext);
    // const navigate = useNavigate();
    const [like, setLike] = useState(booksCtx.isLiked(`${id}-local`));
    const [disabled, setDisabled] = useState(false);

    const likeItemHandler = (id) => {
        // if (authCtx.isLoggedIn === false) {
        //     navigate("/auth");
        // } else {
        //     booksCtx.likeHandler(id);
        //     setLike(booksCtx.isLiked(id));
        // }
        booksCtx.likeHandler(id);
        setLike(booksCtx.isLiked(id));
    }

    if (title.length > 25) {
        let arr = [];
        for (let i = 0; i < title.split("").length; i++) {
            if (i < 25) {
                arr.push(title.split("")[i]);
            }
        }

        title = arr.join("") + "...";
    }

    useEffect(() => {
        setLike(booksCtx.isLiked(`${id}-local`));
        for (let item of booksCtx.cartItems) {
            if (item.id === id) {
                setDisabled(true);
            }
        }
    }, [booksCtx, id])

    const addingToCart = (id) => {
        if (!booksCtx.cartItems.includes(id)) {
            booksCtx.addingToCart(id);
            setDisabled(true);
        }
    }

    return (
        <div className="card-container">
            <Card sx={{
                    width: 230,
                    height: 330,
                    margin: "5px",
                    justifyContent: "space-between",
                    padding: "10px",
                }}
                className="card"
            >
                <div>
                    <Link to={`/all-books/${id}`}>
                        <img src={image} alt={title} />
                        <Typography component="p" className="card-title">
                            {title}
                        </Typography>
                    </Link>
                </div>
                <div className="card-container__buttons-box">
                    <div>
                        <h5>{price ? (price / 10).toString().split(".")[0] : 100}hrn</h5>
                    </div>
                    <div>
                        <Button
                            id={`${id}-local`}
                            style={{ color: "indianred" }}
                            onClick={() => {
                                likeItemHandler(`${id}-local`);
                            }}
                            className="like-btn"
                        >
                            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </Button>
                        <Button
                            id={id}
                            size="small"
                            variant="contained"
                            onClick={() => addingToCart(id)}
                            disabled={disabled}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default BookItem;