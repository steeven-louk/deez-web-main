
import { Link, Route, Routes } from "react-router-dom";
import Album from "./pages/album";
import Artiste from "./pages/artiste";
import Track from "./pages/track";
import Favorie from "./pages/favorie";
import Home from "./pages/home";


function App() {
  return (

    <section className="App">

      <div className='text-sm-center w-100 justify-content-center p-3  bg-dark mb-5  '>
        <h4 className='text-uppercase text-center fw-bold text-white'> deez-web </h4>
        <Link to='/favorie' element={<Favorie />} >Favorie</Link>
        
      </div>



      <Routes>

        <Route path="*" exact element={<Home />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/artiste/:id" element={<Artiste />} />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/favorie" element={<Favorie />} />

      </Routes>


    </section>
  );
}

export default App; 
