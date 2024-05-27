import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'

const Admin = () => {
    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)
    React.useEffect(() => {
        if (auth.currentUser) {
            console.log('Existe un usuario: ' + auth.currentUser);
            setUser(auth.currentUser)
        } else {
            navigate('/login')
        }
    }, [navigate])
    return (
        <div>
            {
                user && //(<h3>Email: {user.email}</h3>)
                <Registro user={user} />
            }
        </div>
    )
}

export default Admin