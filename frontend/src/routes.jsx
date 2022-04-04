import { BrowserRouter,Routes, Route } from "react-router-dom"
import React from 'react'
import Feed from './pages/Feed'
import New from './pages/New'

function RoutesPost(){
    return(
        <Routes>
            <Route path="/"element={<Feed/>}/>
            <Route path="/new"element={<New/>}/>
        </Routes> 
    )
}

export default RoutesPost;