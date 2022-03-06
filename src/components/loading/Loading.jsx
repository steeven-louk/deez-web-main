import React from 'react'
//import Home from '../../pages/home';
import './styles/styles.scss';


function Loading() {

   setTimeout(() => {
       
        Redirect();
    }, 2000);

    function Redirect() 
    {  
        window.location= '../../pages/home/index.jsx' 
    }
  return (
    <section className="loading-section">
      <div className="img-loading">
        <img src="./assets/DeezerLogo.png" alt="" />
      </div>
    </section>
  )
}

export default Loading