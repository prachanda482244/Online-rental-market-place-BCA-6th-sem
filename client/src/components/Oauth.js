import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import { app } from '../firebase'
import { signInFailure, signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Oauth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const HandleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const { user } = await signInWithPopup(auth, provider)

            const { data } = await axios({
                method: 'post',
                url: 'api/v1/users/google',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                })
            })
            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }


    return (
        <button onClick={HandleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Continue with google
        </button>
    )
}

export default Oauth
