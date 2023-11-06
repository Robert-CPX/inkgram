import { Routes, Route } from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SignInform'
import AuthLayout from './_auth/AuthLayout'
import { Home } from './_root/pages'
import RootLayout from './_root/RootLayout'

export const Root = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SigninForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  )
}
