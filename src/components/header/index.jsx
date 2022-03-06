import React, {  useState, useEffect } from 'react';

import { SearchOutlined } from '@material-ui/icons';
import fetchJsonp from 'fetch-jsonp';
import Listes from '../list';
import './styles/search.scss'

 
function HeaderComp() {

  const [query, setQuery] = useState([]);
  const [input, setinput] = useState('');
  const [filtre, setFiltre] = useState([]);
  const [loading, setLoading] = useState(true)


  const searchUrl = `https://api.deezer.com/search?q=${input}&order=${filtre}&output=jsonp`

  const fetchData = async () =>{
    
    try {
      await fetchJsonp(searchUrl)
      .then(function(response) {
        return response.json()
        
      }).then(function(json) {
        setLoading(loading);
      
       setQuery(json.data)       
      }
      )
    } catch (error) {
      console.log('err', error)
    }
  }



  useEffect(() => {
      fetchData();
  }, []);

  useEffect(() => (''), [filtre])

  const searchSubmit = (e) =>{
           
      e.preventDefault();
        fetchData();
        setinput('');  
  }


  const handleChange = (e) =>{
    setinput(e.target.value);
  }

  return (
    <section className="search-section">
    
      <form  className='form-group' onSubmit={searchSubmit}>
          <input type="text" value={input} onChange={handleChange} name="search" id="search" className='form-control p-3 mt-2 search-input' placeholder='search ...' />
          <div className="text-center d-flex justify-content-center">
            <button type="submit" className='border-0 bg-danger le text-light fw-bold btn-block btn-lg text-uppercase mt-3 btn__search '>Rechercher <SearchOutlined className='btn__icon'/></button>
            <select className='rounded select-form' value={filtre} onChange={(e) => setFiltre(e.target.value)}>
              <option value="ALBUM_ASC">Album</option>
              <option value="ARTIST_ASC">Artiste</option>
              <option value="TRACK_ASC">Titre</option>
              <option value="RATING_ASC">Popularité</option>
              <option value="RANKING">Rang</option>
            </select>
          </div>
      </form>

        <Listes data={query} loading={loading}/>
    </section>
  )
}

export default HeaderComp