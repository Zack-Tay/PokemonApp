import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) =>{

    let [user, setUser] = useState(()=> localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    let [authToken, setAuthToken] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        
        if(response.status == 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            navigate("/");

        }else{
            alert("Invalid Credentials")
        }

    }


    let logoutUser = () => { 
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
    }

    let updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authToken?.refresh})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
        } else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }

    }


    let contextData = {
        user:user,
        authToken:authToken,
        logoutUser:logoutUser,
        loginUser:loginUser
    }

    useEffect(()=> {

        let tenMinutes = 1000 * 60 * 10 //   in ms

        if(loading){
            updateToken()
        }

        let interId = setInterval(()=> {
            if(authToken){
                updateToken()
            }
        }, tenMinutes) //   Calling to get a new token every 10 minutes
        return () => clearInterval(interId)

    }, [authToken, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
            </AuthContext.Provider>
    )
}