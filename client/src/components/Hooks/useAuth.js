import React from 'react'
import { AuthContex } from './../../contexts/AuthContexts'

export default function useAuth() {
  return React.useContext(AuthContex)
}
