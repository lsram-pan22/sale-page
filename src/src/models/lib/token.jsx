import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

function Checktoken() {

    const token = localStorage.getItem('token')

    return (
        token ? <Outlet /> : <Navigate to='/login' replace />
    )
}

export default Checktoken