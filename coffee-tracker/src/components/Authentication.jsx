import { useAuth } from '../context/AuthContext'
import { useState } from "react"


export default function Authentication(props){
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email,setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const {signUp, login} = useAuth()

    async function handleAuthenticate(){
        if (isAuthenticating || !email || !email.includes('@') || !password || password.length < 6) {return}

        try{
            setIsAuthenticating(true)
            setError(null)
            if(isRegistration){
                //register a user
                await signUp(email,password)
            } else{
                //login a user
                await login(email, password)
            }
            handleCloseModal()
        } catch(err){
            console.log(err)
            setError(err.message)
        } finally{
            setIsAuthenticating(false)
        }
    }

    return(
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegistration ? 'Create an account!':'Sign in to your account!'}</p>
            {error && (
                <p>❌ {error}</p>
            )}
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="*******" />
            <button onClick = {handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account ?' :'Don\'t have an account ?'}</p>
                <button onClick={() => {setIsRegistration(!isRegistration)}}><p>{isRegistration ? 'Sign In' : 'Sign Up'}</p></button>
            </div>
        </>
    )
}