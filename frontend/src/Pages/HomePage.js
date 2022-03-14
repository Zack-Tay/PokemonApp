import React, {useContext} from 'react'
import Header from '../Components/Header'
import Pokemon from '../Components/Pokemon'

const HomePage = () => {

  return (
    <div>
        <Header/>
        <h1>All Pokemon</h1>
        <Pokemon/>
    </div>
  )
}

export default HomePage