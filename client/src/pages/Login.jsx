import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import API from "../services/api"
import { AuthContext } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()

  const { setUser } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await API.post(
        "/auth/login",
        formData
      )

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      )

      setUser(response.data)

      alert("Login Successful")

      navigate("/")
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
  <div className="container">
    <div className="form-container glass-card">

      <h2 className="page-title">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  </div>
)
}

export default Login