import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext';

const PrivateRoute = ({component: Component}) => {
    let {user} = useContext(AuthContext)
    console.log("priv Route")
    console.log("Comp" , Component)
    return (
        user ? <div>{Component}</div> : <Navigate to='/login'/>
    )
}

export default PrivateRoute;