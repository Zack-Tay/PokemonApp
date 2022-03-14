import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../Context/AuthContext'
import "./Pokemon.css"

const MyPokemon = () => {

    let [pokemon, setPokemon] = useState([])
    let {user, authToken} = useContext(AuthContext)

    useEffect(()=> {
        getPokemon()
    }, [])

    let getPokemon = async () => {
        let response = await fetch('http://127.0.0.1:8000/pokemon/mypokemon/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access)
            },
            body:JSON.stringify({'user':user.user_id})
            
        })
        let data = await response.json()
        console.log(data)
        if(response.status == 200){
            setPokemon(data)

        }else{
            alert("Invalid Credentials")
        }

    }

    let ReleasePokemon = async (pokemonid) => {
        let response = await fetch('http://127.0.0.1:8000/pokemon/releasepokemon/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access)
            },
            body:JSON.stringify({'pokemon':pokemonid,'user':user.user_id}) 
            
        })
        
        if(response.status == 200){
            alert("pokemon Released")
            getPokemon()

        }else{
            alert("Invalid Credentials")
        }
    }

  return (
    <div> 
        <ul>
            {pokemon.map((pkm) => 
                <div className='card-container'>
                    <il key={pkm.id}>
                        <h1 className='name'>{pkm.name}</h1>
                        <p className='stat'>HP: {pkm.hp}</p>
                        <p className='stat'>ATK: {pkm.attack}</p>
                        <p className='stat'>DEF: {pkm.defense}</p>
                        <p className='stat'>TYPE: {pkm.type}</p>
                        <p className='stat'>{pkm.userRefId == -1 ? "Unowned" : "Owned"}</p>
                        <div className='button-container'>
                            <button className='remove' onClick={() => ReleasePokemon(pkm.id)}> <p>Release</p></button>
                        </div>
                    </il>
                </div>
            )}
        </ul>
    </div>
  )
}

export default MyPokemon