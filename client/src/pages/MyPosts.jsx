import { useEffect, useState, useContext } from "react"

import API from "../services/api"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

function MyPosts() {
  const { user } = useContext(AuthContext)

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchMyItems() }, [] )

  const fetchMyItems = async () => {
    try {
      const response = await API.get(
        "/items/myposts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )

      setItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteItem = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this item?"
    )

  if (!confirmDelete) return

  try {

    await API.delete(
      `/items/${id}`,
      {
        headers:{
          Authorization:
            `Bearer ${user.token}`
        }
      }
    )

    setItems(
      items.filter(
        (item) => item._id !== id
      )
    )

  } catch (error) {
    console.log(error)
  }
}
  
const markRecovered = async (id) => {

  try {

    const response =
      await API.put(
        `/items/${id}`,
        {
          status:"recovered"
        },
        {
          headers:{
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

    setItems(
      items.map((item) =>
        item._id === id
          ? response.data
          : item
      )
    )

  } catch (error) {
    console.log(error)
  }
}

  return (
  <div className="container">

    <h2 className="page-title">
      My Posts
    </h2>

    <div className="items-grid">

      {items.map((item) => (

        <div
          key={item._id}
          className="glass-card item-card"
        >

          <img
            src={
              item.image ||
              "https://via.placeholder.com/400"
            }
            alt={item.title}
            className="item-image"
          />

          <h3 className="item-title">
            {item.title}
          </h3>

          <p>{item.description}</p>

          <div className={`item-status ${item.status}`}>
            {item.status}
          </div>

          <div className="action-buttons">

  <Link to={`/edit-item/${item._id}`}>

    <button>
      Edit
    </button>

  </Link>

  <button
    onClick={() =>
      deleteItem(item._id)
    }
  >
    Delete
  </button>

  {item.status !== "recovered" && (

    <button
      onClick={() =>
        markRecovered(item._id)
      }
    >
      Mark Recovered
    </button>

  )}

</div>
        </div>
      ))}

    </div>
  </div>
  )
}

export default MyPosts