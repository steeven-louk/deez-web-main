import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "./styles/styles.scss";

const Listes = ({ data, loading }) => {

  const [wish, setWish] = useState(false);

  const saveinLocalStorage = (item) => {

    setWish(!wish);
      localStorage.setItem("data", JSON.stringify(item));

  }
  ;
  useEffect(() => {
    saveinLocalStorage();
  }, []);

  return (
    <section className="liste_section row row-cols-1 row-cols-md-4 g-4">
      {loading ? (
        data &&
        data.map((item) => (
          <div className="col" key={item.id}>
            <div className="card bg-dark">
              <div className="card_image">
                <img
                  src={item.album.cover_medium}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card_icon">

                  <Link to={`/album/${item.album.id}`}>
                    <FontAwesomeIcon
                      icon="fa-solid fa-eye"
                      className="icon eye"
                    />
                  </Link>
                  <FontAwesomeIcon
                    icon="fa-solid fa-heart"
                    onClick={() => saveinLocalStorage(item)}
                    className={wish ? "icon eye" : "icon eye heart "}
                  />
                </div>
              </div>
              <div className="card-body flex-column d-flex">
                <div className="title-container card-title fw-bold text-capitalize d-flex justify-content-between">
                  <h5>{item.title}</h5>
                  <Link to={`/album/${item.album.id}`}>Album</Link>
                </div>
                <Link to={`/artiste/${item.artist.id}`}>
                  {" "}
                  {item.artist.name}{" "}
                </Link>
                <span className="card-text">{item.album.title}</span>
                <span className="card-text duration">{item.duration}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="spinner-grow text-danger mx-auto mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </section>
  );
};

export default Listes;
