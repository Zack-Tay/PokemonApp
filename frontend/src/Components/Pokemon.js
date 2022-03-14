import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../Context/AuthContext'
import "./Pokemon.css"

const Pokemon = () => {

    let [pokemon, setPokemon] = useState([])
    let {authToken} = useContext(AuthContext)

    useEffect(()=> {
        getPokemon()
    }, [])

    let getPokemon = async () => {
        let response = await fetch('http://127.0.0.1:8000/pokemon/allpokemon/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access)
            },
            
        })
        let data = await response.json()
        
        if(response.status == 200){
            setPokemon(data)

        }else{
            alert("Invalid Credentials")
        }

    }


  return (
    <div>
        <ul>
        {pokemon.map((pkm) => 
            <div className='card-container'>
                <il>
                    <h1 className='name'>{pkm.name}</h1>
                    <p className='stat'>HP: {pkm.hp}</p>
                    <p className='stat'>ATK: {pkm.attack}</p>
                    <p className='stat'>DEF: {pkm.defense}</p>
                    <p className='stat'>TYPE: {pkm.type}</p>
                    <p className='stat'>{pkm.userRefId == -1 ? "Unowned" : "Owned"}</p>
                </il>
            </div>
        )}
        </ul>
    </div>
  )
}

export default Pokemon