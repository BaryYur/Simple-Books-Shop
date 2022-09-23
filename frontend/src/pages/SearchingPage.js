import SearchingBooks from "../components/Books/SearchingBooks";

import "./SearchingPage.css";

const SearchingPage = () => {
    let searchingInfo = JSON.parse(localStorage.getItem("searchingInfo"));

    return (
        <div className="searching-books-page-container">
            <h2>Search:  "<span>{searchingInfo[0]}</span>"</h2>
            <h2>Found <span>{searchingInfo[1]}</span> {searchingInfo[1] !== 1 ? <span>books</span> : <span>book</span> } </h2>
            <hr />
            <SearchingBooks />
        </div>
    )
}

export default SearchingPage;