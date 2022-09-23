import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import AllBooksPage from "./pages/AllBooksPage";
import BookPage from "./pages/BookPage";
import SearchingPage from "./pages/SearchingPage";
import ScienceBooksPage from "./pages/ScienceBooksPage";
import AdventureBooksPage from "./pages/AdventureBooksPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
        <Routes>
            <Route path="/" exact element={<HomePage />} />
            {!authCtx.isLoggedIn && (
                <Route path="/auth" element={<AuthPage />} />
            )}
            {authCtx.isLoggedIn ?
                <Route path="/profile" element={<UserProfile />} /> : <Route path="/profile" element={<Navigate replace to="/" />} />
            }
            <Route path="/all-books" element={<AllBooksPage />} />
            <Route path="/all-books/:id" element={<BookPage />} />
            <Route path="/science-books" element={<ScienceBooksPage />} />
            <Route path="/adventure-books" element={<AdventureBooksPage />} />
            <Route path="/search" element={<SearchingPage />} />
        </Routes>
    </Layout>
  );
}

export default App;
