import {
  useEffect,
  useState,
  useContext,
} from "react"

import {
  useNavigate,
  useParams,
} from "react-router-dom"

import API from "../services/api"

import { AuthContext } from "../context/AuthContext"

function EditItem() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title:"",
    category:"",
    description:"",
    location:"",
    contact:"",
    image:"",
    status:"lost",
  })

  useEffect(() => {
    fetchItem()
  }, [])

  const fetchItem = async () => {
    try {

      const response =
        await API.get(`/items/${id}`)

      setFormData(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await API.put(
        `/items/${id}`,
        formData,
        {
          headers:{
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

      alert("Item Updated")

      navigate("/my-posts")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">

      <div className="form-container glass-card">

        <h2 className="page-title">
          Edit Item
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="lost">
              Lost
            </option>

            <option value="found">
              Found
            </option>

            <option value="recovered">
              Recovered
            </option>
          </select>

          <button type="submit">
            Update Item
          </button>

        </form>

      </div>
    </div>
  )
}

export default EditItem