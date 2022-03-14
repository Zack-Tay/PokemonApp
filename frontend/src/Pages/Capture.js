import React, { useState, useContext, useEffect } from 'react'
import Header from '../Components/Header'
import AuthContext from '../Context/AuthContext'
import "./Capture.css"

const Capture = () => {

    let [pokemon, setPokemon] = useState([])
    let {authToken, user} = useContext(AuthContext)
    let [currentText, setCurrentText] = useState("")
    let [currentValue, setCurrentValue] = useState(-1)
    let [currentPokemon, setCurrentPokemon] = useState(-2)
    let [maxNumber, setMaxNumber] = useState(0)

    let [attempts, setAttempts] = useState(1)

    useEffect(()=> {
        getPokemon()
    }, [])

    //get random pokemon
    let getPokemon = async () => {
        let response = await fetch('http://127.0.0.1:8000/pokemon/unownedpokemon/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access)
            },
            
        })
        let data = await response.json()
        
        if(response.status == 200){
            setPokemon(data)
            var max = data.length
            console.log(max)
            console.log(data)
            setMaxNumber(max)
            Math.random()
            setCurrentPokemon(Math.floor(Math.random() * max));

        }else{
            alert("Invalid Credentials")
        }

    }

    let addNewPokemon = async () => {
        console.log(user)
        let response = await fetch('http://127.0.0.1:8000/pokemon/addpokemon/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access)
            },
            body:JSON.stringify({'pokemon':currentPokemon, 'user':user.user_id}) 
            
        })
        let data = await response.json()
        
        if(response.status == 200){
            setPokemon(data)
            var max = data.length
            setMaxNumber(max)
            Math.random()
            setCurrentPokemon(Math.floor(Math.random() * max));

        }else{
            alert("Invalid Credentials")
        }
    }

    let checkInput = () => {
        console.log(currentPokemon + " | " , currentValue)
        if(currentValue > currentPokemon){
            setCurrentText("Number To High - Attempts Used :" + attempts)
            setAttempts(attempts+1)
        }
        else if(currentValue < currentPokemon){
            setCurrentText("Number To Low  - Attempts Used :" + attempts)
            setAttempts(attempts+1)
        } else {
            setCurrentText("Correct Guess - New Pokemon Added!")
            addNewPokemon()
        }

        if(attempts >= 3) {
            setCurrentText("Pokemon Escaped! - A new pokemon Appeared")
            setAttempts(1)
            getPokemon()
        }
    }

  return (
    <div>
        <Header/>
        
        <div className='capture-container'>
        Capture - Guess a number between 0 - {maxNumber}<br></br>
            <input type='number' name='pokemonid'  onChange={changedNumber => setCurrentValue(changedNumber.target.value)} placeholder='Guess a number'/>
            <button onClick={() => checkInput()}>Capture New pokemon</button>
            <p>{currentText}</p>
        </div>
    </div>
  )
}

export default Capture