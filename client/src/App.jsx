import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import EditItem from "./pages/EditItem"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddItem from "./pages/AddItem"
import ItemDetails from "./pages/ItemDetails"
import MyPosts from "./pages/MyPosts"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/add-item" element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          }
        />

        <Route path="/item/:id" element={<ItemDetails />} />

        <Route path="/my-posts" element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          }
        />

        < Route path="/edit-item/:id" element={ 
          <ProtectedRoute>
            <EditItem />
          </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App