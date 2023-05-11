import React, { useState, useEffect } from 'react'
import "../App.css"
import StarWarLogo from "../Images/StarWarLogo.png"
import  StarWarLoaderImg from "../Images/StarWars_loader.svg"


const StarWars = () => {
const [loading, setLoading] = useState(true)
const [data, setData] = useState(null)
const [ error, setError] = useState(null)


useEffect(() => {
    fetch(`https://swapi.dev/api/films`)
       .then((response) =>   {
            if (! response.ok ){
              throw new Error (`This is an HTTP Error: The status is ${response.status}`)
            }
               return  response.json()})
         .then((actualData) => {
          setData(actualData.results)
          setError(null)
         }
             )
        .catch((error) =>  {
          console.log(error)
          setError(Error)
        })
        .finally(() =>{
          setLoading(false)
        })
}, [])

  return (
    <div className='starWar_Wrapper'>
      <div className='Img_wrapper'>
      <img src = {StarWarLogo}  alt = "star war movies logo" className='StarWarImg' />
      </div>

      {loading && 
      (<div className='loader-container'>
        <img src = {StarWarLoaderImg} alt="loader img" className='StarWarLoader'/>
      </div> )} 
     
      {error && 
      <div>{`There is a problem fetching your data - ${error}`}</div>}
      
      {data && (
        <div className='movieCard_wrapper'>
          <ul className='movieCard_Container'>
          {data.map((movie) => {
                 return (
          
                      <li    key ={movie.episode_id} className='movieCard_list'>
                 
                 <div className='movie-date-title'>
                  
                   <a href='movieTitle'>{movie.title}</a>
                  
                  <span className='date'>{movie.release_date}</span>
 
                 </div>
                 <p className='crawl'>{movie.opening_crawl}</p>
                 <p className='moreInfo'>
                   <a href='#More'>More Info</a>
                   </p>
               </li>
           
                
              )
          })}
          </ul>
        </div>
      )}
     
       
          

    
      
    </div>
  )
}

export default StarWars