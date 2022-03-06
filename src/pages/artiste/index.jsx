import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchJsonp from "fetch-jsonp";
import { Link, useParams } from "react-router-dom";
import "./styles/styles.scss";

function Artiste() {
  const [artiste, setArtiste] = useState([]);
  const [tracklist, setTracklist] = useState([]);
  const { id } = useParams();

  const artisteUrl = `https://api.deezer.com/artist/${id}&output=jsonp`;
  const artisteTracklist = `https://api.deezer.com/artist/${id}/top?limit=10/&output=jsonp`;

  const fetchArtiste = async () => {
    try {
      await fetchJsonp(artisteUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setArtiste(json);
        });
    } catch (error) {
      console.log("err", error);
    }
  };

  const fetchTracklist = async () => {
    try {
      await fetchJsonp(artisteTracklist)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setTracklist(json.data);
        });
    } catch (error) {
      console.log("err", error);
    }
  };

  const getTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = ("0" + Math.floor(time % 60)).slice(-2);
    return minutes + ":" + seconds;
  };

  useEffect(() => {
    fetchArtiste();
    fetchTracklist();
  }, []);

  return (
    <section className="artiste-section">
      <nav className="px-5 breadcrumb-nav" aria-label="breadcrumb">
        <ol className="breadcrumb fw-bold texty-capitalize">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            artist
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="card bg-dark card-artiste">
          <div className="row g-0 d-flex">
            <div className="col-md-4">
              <img
                src={artiste.picture_big}
                className="img-fluid artist-img"
                alt={artiste.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body flex-column">
                <h1 className="card-title text-capitalize fw-bold">
                  {" "}
                  {artiste.name}{" "}
                </h1>
                <div className="card-text img-artist">
                  <h4>Nombre d'album : {artiste.nb_album}</h4>
                  <h4>{artiste.nb_fan} fans</h4>
                </div>

                <div className="card-footer shadow">
                  <a
                    href={artiste.link}
                    rel="noreferrer"
                    target="_blank"
                    className="btn btn-danger text-white"
                  >
                    fiche artiste
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="list-song">
          <div className="top-titre">
            <h2 className="text-uppercase fw-bold">top titre</h2>
            <hr className="text-danger" />
          </div>

          <div className="top-table">
            <table className="table table-dark table-hover rounded">
              <thead>
                <tr>
                  <th scope="col">TITRE</th>
                  <th scope="col">DUREE</th>
                </tr>
              </thead>
              <tbody>
                {tracklist.map((track) => (
                  <tr key={track.id}>
                    <td>
                      {track.title}
                      <br />
                      <span className="text-muted">{track.artist.name}</span>
                    </td>
                    <td>{getTime(track.duration)}</td>
                    <td className="icon-cell text-center pt-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-play"
                        className="icon"
                      />
                    </td>
                    <td className="icon-cell text-center pt-3">
                      <FontAwesomeIcon
                        icon="fa-solid fa-heart"
                        className="icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="list-album mt-5">
          <div className="title-album">
            <h2 className="text-uppercase fw-bold">album</h2>
            <hr className="text-danger" />
          </div>

          <section className="liste_section row row-cols-1 row-cols-md-4 g-4">
            {tracklist.map((albumList) => (
              <div className="col" key={albumList.id}>
                <div className="card bg-dark">
                  <div className="card_image">
                    <img
                      src={albumList.album.cover_medium}
                      className="card-img-top"
                      alt={albumList.artist.name}
                    />
                    <div className="card_icon">
                      
                      <FontAwesomeIcon
                        icon="fa-solid fa-eye"
                        className="icon eye"
                      />
                      <FontAwesomeIcon
                        icon="fa-solid fa-heart"
                        className="icon eye"
                      />
                    </div>
                  </div>

                  <div className="card-body flex-column d-flex">
                    <div className="title-container card-title fw-bold text-capitalize d-flex justify-content-between">
                      <h5>{albumList.album.title}</h5>
                      <Link to={`/album/${albumList.album.id}`}> Album</Link>
                    </div>
                    <h5>de {albumList.artist.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}

export default Artiste;
