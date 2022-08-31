import SearchingBooks from "../components/Books/SearchingBooks";

import "./SearchingPage.css";

const SearchingPage = () => {
    let searchingInfo = JSON.parse(localStorage.getItem("searchingInfo"));

    return (
        <div className="searching-books-page-container">
            <h2>Search:  "{searchingInfo[0]}"</h2>
            <h2>Found {searchingInfo[1]} {searchingInfo[1] !== 1 ? <span>books</span> : <span>book</span> } </h2>
            <hr />
            <SearchingBooks />
        </div>
    )
}

export default SearchingPage;