import React, { useState } from 'react'

export const SessionContext =  React.createContext({
    session: "test",
    setSession: () => {}
})
export const SessionProvider  = (props) => {
    const setSession = (session) => {
        setState({...state, session: session})
        localStorage.setItem("token", session);
    }

    const initState = {
        session: localStorage.getItem("token") || "empty token",
        setSession: setSession
    }

    const [state, setState] = useState(initState)

    return (
        <SessionContext.Provider value={state}>
          {props.children}
        </SessionContext.Provider>
      )

}

export default SessionContext



