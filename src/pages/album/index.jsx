import React, { useEffect, useState } from "react";

import fetchJsonp from "fetch-jsonp";
import { Link, useParams } from "react-router-dom";
import TrackList from "../../components/trackList";
import "./styles/styles.scss";

function Album() {
  const [getalbum, setAlbum] = useState([]);

  const { id } = useParams();
  const albumUrl = `https://api.deezer.com/album/${id}&output=jsonp`;

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    try {
      await fetchJsonp(albumUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setAlbum(json);
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

  return (
    <section className="album-section">
      <nav className="px-5 breadcrumb-nav" aria-label="breadcrumb">
        <ol className="breadcrumb fw-bold texty-capitalize">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            album
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="card bg-dark">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={getalbum.cover_medium}
                className="img-fluid cover rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body flex-column">
                <h1 className="card-title text-capitalize fw-bold">
                  {getalbum.title}
                </h1>
                <div className="card-text d-flex img-artiste">
                  <img
                    src={getalbum.artist && getalbum.artist.picture_small}
                    alt=""
                  />
                  <h3 className="text-capitalize">
                    {getalbum.artist && (
                      <Link to={`/artiste/${getalbum.artist.id}`}>
                        {getalbum.artist.name}
                      </Link>
                    )}
                  </h3>
                </div>
                <div className="card-text">
                  <small className="text-muted fw-bold">
                    {getTime(getalbum.duration)} min / {getalbum.release_date} /{" "}
                    {getalbum.fans} fans
                  </small>
                </div>
                <div className="card-footer">
                  <a
                    href={getalbum.link}
                    rel="noreferrer"
                    target="_blank"
                    className="btn btn-danger text-white"
                  >
                    voir l'album
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        {getalbum.tracks ? (
          <TrackList data={getalbum.tracks.data} keyData={getalbum.id} />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Album;
