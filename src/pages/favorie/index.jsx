import React, { useEffect, useState } from "react";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./styles/styles.scss";
import Listes from "../../components/list";

function Favorie() {


  const [getFav, setGetFav] = useState([]);

  const getItemWithLocalStorage = async () => {
    try {
      const fav = await JSON.parse(localStorage.getItem("wishArticle"));
      setGetFav(fav);
      console.log('getFav', getFav);
     
    } catch (error) {
      console.log("err :", error.message);
    }
  };
  console.log('getFav', getFav);

 /* const getTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = ("0" + Math.floor(time % 60)).slice(-2);
    return minutes + ":" + seconds;
  };*/

  useEffect(() => {
    getItemWithLocalStorage();
//removeFromLocalStorage();
  }, []);



  return (
    <section className="favorie-section">
      <div className="row-cols-md-4 row-cols-1  g-4">
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
        {getFav === null ? (
          <h1>oooops veuillez rajouter des éléments dans les favories</h1>
        ) : (
         
          getFav && getFav.map(fav =>(
             <Listes data={fav} key={fav.key}/>
          ))
            
        
         
          /**   <div className="col" key={getFav && getFav.id}>
              <div className="card bg-dark text-white">
                <div className="card_image">
                  <img
                    src={getFav && getFav.album.cover_medium}
                    className="card-img-top"
                    alt={getFav.data && getFav.title}
                  />
                  <div className="card_icon">

                
                    <FontAwesomeIcon
                      icon="fa-solid fa-heart"
                      onClick={()=>{}}
                      className="icon heart eye"
                    />
                  </div>
                </div>
                <div className="card-body flex-column d-flex">
                  <div className="title-container card-title fw-bold text-capitalize d-flex justify-content-between">
                    <h5>{getFav.title}</h5>
                    <Link to={`/album/${getFav.data && getFav.album.id}`}>
                      {" "}
                      Album
                    </Link>
                  </div>
                  <Link to={`/artiste/${getFav.data && getFav.artist.id}`}>
                    {" "}
                    {getFav.data && getFav.artist.name}{" "}
                  </Link>
                  <span className="card-text">
                    {getFav.album && getFav.album.title}
                  </span>
                  <span className="card-text duration">
                    {getTime(getFav.duration)}
                  </span>
                </div>
              </div>
            </div> */
        )}

      </div>
    </section>
  );
}

export default Favorie;
