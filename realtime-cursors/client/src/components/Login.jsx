import { useState } from "react";

function Login({ onSubmit }){
    const [username, setUsername] = useState('');
    return(
        <div>
            <h1>Welcome</h1>
            <p>What Should people call you ?</p>
            <form 
                onSubmit={(e) =>{
                    e.preventDefault()
                    onSubmit(username)
                }}
            >
                <input 
                    type="text" 
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login;