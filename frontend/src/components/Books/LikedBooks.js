import { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./LikedBooks.css";
import BookItemsContext from "../../store/items-context";
import CloseIcon from '@mui/icons-material/Close';

const LikedBooks = () => {
    const booksCtx = useContext(BookItemsContext);
    const [likedItems, setLikedItems] = useState(booksCtx.likedItems);

    const deleteFromLikedHandler = (id) => {
        setLikedItems(likedItems.filter(item => item.id !== id));
        localStorage.setItem("likedItems", JSON.stringify(likedItems.filter(item => item.id !== id)));
        booksCtx.likeHandler(`${id}-local`);
    }

    return (
        <div className="liked-books-container">
            <h1>Liked books</h1>
            <ul>
                {likedItems.length !== 0 ? likedItems.map(likedItem => (
                    <li key={Math.random()} className="liked-item-container">
                        <Link to={`/all-books/${likedItem.id}`}>
                            <img src={likedItem.volumeInfo.imageLinks.thumbnail} style={{ height: "40px", width: "30px" }} />
                            <span>{likedItem.volumeInfo.title}</span>
                        </Link>
                        <button style={{ color: "indianred" }} onClick={() => deleteFromLikedHandler(likedItem.id)}>
                            <CloseIcon />
                        </button>
                    </li>
                )) : <p>No liked books</p>}
            </ul>
        </div>
    )
}

export default LikedBooks;