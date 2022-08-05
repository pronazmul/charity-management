import axios from 'axios'
import React from 'react'
export const AuthContex = React.createContext()

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState({
    status: 0,
    message: '',
  })
  const [user, setUser] = React.useState({})

  /**
   *@desc Handle Login Feature using email and Password
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    try {
      setLoading(true)
      let config = {
        method: 'POST',
        url: 'http://103.107.184.159:5001/api/v1/users/auth',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email, password },
      }
      let {
        data: { data, status },
      } = await axios(config)
      if (data && status === 'success') {
        setUser(data)
        setMessage({ status: 1, message: 'Login Success!' })
        setLoading(false)
        localStorage.removeItem('loggedInUser')
        localStorage.setItem('loggedInUser', JSON.stringify(data))
      }
    } catch (error) {
      setLoading(false)
      setMessage({ status: 0, message: 'Authentication Failed!' })
    }
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setUser({})
  }
  const values = {
    loading,
    message,
    user,
    setUser,
    login,
    logout,
  }
  React.useEffect(() => {
    const user = localStorage.getItem('loggedInUser')
      ? JSON.parse(localStorage.getItem('loggedInUser'))
      : {}
    setUser(user)
  }, [])

  return <AuthContex.Provider value={values}>{children}</AuthContex.Provider>
}
export default AuthProvider
