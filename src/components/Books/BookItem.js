import { Link } from "react-router-dom";
import { Card, CardMedia, Typography } from "@mui/material";

import "./BookItem.css";

const BookItem = (props) => {
    return (
        <div className="card-container">
            <Link to={`/all-books/${props.id}`}>
                <Card sx={{
                    width: 230,
                    height: 330,
                    margin: "5px",
                    justifyContent: "space-between",
                    padding: "10px",
                    }}
                >
                    <img src={props.image} alt={props.title} />
                    <Typography component="p" className="card-title" >
                        {props.title}
                    </Typography>
                </Card>
            </Link>
        </div>
    )
}

export default BookItem;