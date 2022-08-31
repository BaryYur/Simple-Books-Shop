import "./StartingPageContent.css";

import {Card} from "@mui/material";
import { Link } from "react-router-dom";

import scienceCover from "../../images/science-books-cover.jpg"
import adventureCover from "../../images/adventure-books-cover.jpg";

const StartingPageContent = () => {
    return (
      <section className="starting-container">
          <h2>Welcome on Board!</h2>
          <hr />
          <h2>Choose category</h2>
          <div className="types-of-books-container">
              <div className="category-card">
                  <Link to="/adventure-books">
                      <Card
                          sx={{
                              width: 250,
                              height: 250,
                              margin: "5px",
                              padding: "10px"
                          }}
                          className="card"
                      >
                          <div className="card-wrapper"></div>
                          <img src={adventureCover} />
                      </Card>
                  </Link>
                  <p>Adventure</p>
              </div>
              <div className="category-card">
                  <Link to="/science-books">
                      <Card
                          sx={{
                              width: 250,
                              height: 250,
                              margin: "5px",
                              padding: "10px"
                          }}
                          className="card"
                      >
                          <div className="card-wrapper"></div>
                          <img src={scienceCover} />
                      </Card>
                  </Link>
                  <p>Science</p>
              </div>
          </div>
      </section>
    );
};

export default StartingPageContent;
