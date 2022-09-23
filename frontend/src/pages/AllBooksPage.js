import Books from "../components/Books/Books";

import "./AllBooksPage.css";

const AllBooksPage = () => {
    return (
        <div className="all-books-container">
            <h2>All books</h2>
            <hr />
            <Books />
        </div>
    )
}

export default AllBooksPage