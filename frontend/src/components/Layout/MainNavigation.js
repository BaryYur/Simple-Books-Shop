import {useContext, useEffect, useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// import AuthContext from "../../store/auth-context";
import "./MainNavigation.css";
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import BookItemsContext from "../../store/items-context";
import ShoppingCart from "../Cart/ShoppingCart";

const MainNavigation = () => {
    // const authCtx = useContext(AuthContext);
    const booksCtx = useContext(BookItemsContext);
    // const isLoggedIn = authCtx.isLoggedIn;
    const navigate = useNavigate();
    const [searchingInput, setSearchingInput] = useState("");

    const updateSearching = () => {
        let searchingItems = [];

        for (let item of booksCtx.bookItems) {
            if (item.volumeInfo.title.toLowerCase().includes(JSON.parse(localStorage.getItem("searchingInfo"))[0].toLowerCase())) {
                searchingItems.push(item);
            }

            booksCtx.searchingBooks = searchingItems;
            localStorage.setItem("searchingItems", JSON.stringify(searchingItems));
        };

        setSearchingInput(JSON.parse(localStorage.getItem("searchingInfo"))[0] || "");
    }

    useEffect(() => {
        updateSearching();
    }, []);

    const searchingSubmitHandler = (event) => {
        event.preventDefault();

        let searchingItems = [];
        let searchingInfo = ["", 0];
        let booksCounter = 0;

        if (searchingInput === "") return;

        for (let item of booksCtx.bookItems) {
            if (item.volumeInfo.title.toLowerCase().includes(searchingInput.toLowerCase())) {
                searchingItems.push(item);
                booksCounter++;
            } else {
                localStorage.setItem("searchingInfo", JSON.stringify([searchingInput, booksCounter]));
                localStorage.setItem("searchingItems", JSON.stringify([]));
            }
        }

        searchingInfo = [searchingInput, booksCounter];
        booksCtx.searchingBooks = searchingItems;
        localStorage.setItem("searchingInfo", JSON.stringify(searchingInfo));
        localStorage.setItem("searchingItems", JSON.stringify(searchingItems));

        navigate(`/search/?text=${searchingInput.toLowerCase()}`);
    }

    const resetSearching = () => {
        setSearchingInput("");
        let searchingInfo = ["", 0];
        localStorage.setItem("searchingInfo", JSON.stringify(searchingInfo));
    }

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" onClick={resetSearching}>
                    <div className="logo-box">
                        <ImportContactsOutlinedIcon color="primary" fontSize="large" />
                        <span>Simple shop</span>
                    </div>
                </Link>
                <div className="searching-box">
                    <form onSubmit={searchingSubmitHandler} className="searching-form">
                        <TextField
                            label="Searching for book"
                            variant="outlined"
                            size="small"
                            value={searchingInput}
                            onChange={event => {
                                setSearchingInput(event.target.value);
                            }}
                        />
                        <Button type="submit" variant="contained">
                            <SearchOutlinedIcon />
                        </Button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return { boxShadow: isActive ? "0px 3px 0px 0px royalblue" : "none"}
                                }}
                                to="/all-books"
                                onClick={resetSearching}
                            >All books</NavLink>
                        </li>
                        {/*{!isLoggedIn && (*/}
                        {/*    <li>*/}
                        {/*        <NavLink*/}
                        {/*            style={({ isActive }) => {*/}
                        {/*                return { boxShadow: isActive ? "0px 3px 0px 0px royalblue" : "none"}*/}
                        {/*            }}*/}
                        {/*            to="/auth"*/}
                        {/*            onClick={resetSearching}*/}
                        {/*        >Login</NavLink>*/}
                        {/*    </li>*/}
                        {/*)}*/}
                        {/*{isLoggedIn && (*/}
                        {/*    <li>*/}
                        {/*        <NavLink*/}
                        {/*            className="profile-link"*/}
                        {/*            style={({ isActive }) => {*/}
                        {/*                return { boxShadow: isActive ? "0px 3px 0px 0px royalblue" : "none"}*/}
                        {/*            }}*/}
                        {/*            to="/profile"*/}
                        {/*            onClick={resetSearching}*/}
                        {/*        >*/}
                        {/*            <PersonOutlineOutlinedIcon />*/}
                        {/*        </NavLink>*/}
                        {/*    </li>*/}
                        {/*)}*/}
                        <Button onClick={booksCtx.openingCartHandler} className="header__cart-btn">
                            <ShoppingCartOutlinedIcon />
                        </Button>
                    </ul>
                </nav>
            </div>
            <ShoppingCart />
        </header>
    );
};

export default MainNavigation;
