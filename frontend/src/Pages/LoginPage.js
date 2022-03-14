import React, {useContext} from 'react'
import Header from '../Components/Header'
import AuthContext from '../Context/AuthContext'

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)

  return (
    <div>
        <Header/>
        <form onSubmit={loginUser}>
            <input type="text" name='username' placeholder="username"/>
            <input type="password" name ="password" placeholder="password"/>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default LoginPage