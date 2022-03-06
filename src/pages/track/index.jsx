import React, { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import { Link, useParams } from "react-router-dom";
import "./styles/styles.scss";

function Track() {
  const [getTrack, setTrack] = useState([]);

  const { id } = useParams();
  const trackUrl = `https://api.deezer.com/track/${id}&output=jsonp`;

  useEffect(() => {
    fetchTrack();
  }, []);

  const fetchTrack = async () => {
    try {
      await fetchJsonp(trackUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setTrack(json);
        });
    } catch (error) {
      console.log("err", error);
    }
  };

  const getTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = ("0" + Math.floor(time % 60)).slice(-2);
    return minutes + "min" + ":" + seconds + "s";
  };

  return (
    <section className="track-section">
      <nav className="px-5 breadcrumb-nav" aria-label="breadcrumb">
        <ol className="breadcrumb fw-bold texty-capitalize">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            favorie
          </li>
        </ol>
      </nav>
      <div className="container">
        <div className="card bg-dark mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="card-text text-center fw-bold text-uppercase">
                <h3>{getTrack.album && getTrack.album.title}</h3>
              </div>
              <div className="card-img">
                <img
                  src={getTrack.album && getTrack.album.cover_big}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <span className="point"></span>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{getTrack.title}</h3>
                <div className="artiste-block">
                  <img
                    src={getTrack.artist && getTrack.artist.picture_small}
                    alt=""
                    className="img-artist"
                  />
                  <h2 className="fw-bold mx-3">
                 
                    {getTrack.artist && (
                       <Link to={`/artiste/${getTrack.artist.id}`}>
                      {getTrack.artist.name}
                      </Link>
                      )
                    }
                  
                  </h2>{" "}
                  <br />
                </div>
                <p className="card-text"> {getTrack.release_date}</p>
                <p className="card-text">{getTime(getTrack.duration)}</p>
              </div>
              <div className="card-footer pt-4 mt-5">
                <audio
                  controls
                  autoPlay="autoplay"
                  preload="auto"
                  src={getTrack.preview}
                ></audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Track;
