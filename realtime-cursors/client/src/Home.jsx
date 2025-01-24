import { useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';
import useWebSocket from 'react-use-websocket';

import { Cursor } from './components/Cursor';

const renderCursors = users => {
    return Object.keys(users).map(uuid => {
        const user = users[uuid]

        return(
            <Cursor key={uuid} point={[user.state.x, user.state.y]} />
        )
    })
}

const renderUserList = users => {
    return (
        <ul>
            {Object.keys(users).map(uuid => {
                return <li key={uuid}>
                    {JSON.stringify(users[uuid])}
                </li>
            })}
        </ul>
    )
}

export function Home({ username }){

    const WS_URL = "ws://localhost:8000"
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: {username}
    })

    const THROTTLE = 50;
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE) )
    //Dont let this function run more that once for every 50ms. Now this function gonna rerun every render, which can be every ms. This can mess up the internal timers as throttle will be called again and again so we will use useRef to keep a refrence between renders

    useEffect(()=>{
        sendJsonMessage({
            x:0,
            y:0
        })
        window.addEventListener("mousemove", e => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            })
            
        })
    }, [])

    if(lastJsonMessage) {
        return <>
            {renderUserList(lastJsonMessage)}
            {renderCursors(lastJsonMessage)}
        </>
    }
    return <h1>Hello {username} </h1>
}