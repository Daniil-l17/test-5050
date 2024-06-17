import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../page/Home/Home"
import { Auth } from "../page/Auth/Auth"
import { CurrentUser } from "../page/CurrentUser/CurrentUser"


export const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Home/>} path="/" />
      <Route element={<Auth/>} path="/auth" />
      <Route element={<CurrentUser/>} path="/user/:id" />
    </Routes>
    </BrowserRouter>
  )
}
