import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import API from "../services/api"

function ItemDetails() {
  const { id } = useParams()

  const [item, setItem] = useState(null)

  useEffect(() => {
    fetchItem()
  }, [])

  const fetchItem = async () => {
    try {
      const response = await API.get(`/items/${id}`)

      setItem(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!item) {
    return <h2>Loading...</h2>
  }
  return (
  <div className="container">

    <div className="glass-card details-card">

      <img
        src={
          item.image ||
          "https://via.placeholder.com/500"
        }
        alt={item.title}
        className="details-image"
      />

      <h2 className="page-title">
        {item.title}
      </h2>

      <p>
        <strong>Description:</strong>
        {" "}
        {item.description}
      </p>

      <br />

      <p>
        <strong>Category:</strong>
        {" "}
        {item.category}
      </p>

      <br />

      <p>
        <strong>Location:</strong>
        {" "}
        {item.location}
      </p>

      <br />

      <p>
        <strong>Contact:</strong>
        {" "}
        {item.contact}
      </p>

      <br />

      <p>
        <strong>Status:</strong>
        {" "}
        {item.status}
      </p>

      <br />

      <p>
        <strong>Posted By:</strong>
        {" "}
        {item.userId?.name}
      </p>

    </div>
  </div>
)
}

export default ItemDetails