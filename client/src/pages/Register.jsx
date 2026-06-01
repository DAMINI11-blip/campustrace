import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      )

      alert("Registration Successful")

      console.log(response.data)

      navigate("/login")
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
  <div className="container">
    <div className="form-container glass-card">

      <h2 className="page-title">
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

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
          Register
        </button>

      </form>
    </div>
  </div>
)
}

export default Register