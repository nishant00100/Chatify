import React from 'react'

const LoginPage = () => {
    const {authUser, isLoggedIn, login} = useAuthStore();
  return (
    <div>
      Login Page
    </div>
  )
}

export default LoginPage
