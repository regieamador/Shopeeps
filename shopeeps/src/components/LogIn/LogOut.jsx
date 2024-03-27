import React from 'react'
import { logout } from '../../services/userServices'

const LogOut = () => {
    logout()
    window.location = "/"

  return null
}

export default LogOut
