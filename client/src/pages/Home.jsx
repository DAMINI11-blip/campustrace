import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

import { categories } from "../constants/categories"

function Home() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {

    try {

      const response = await API.get("/items");

      setItems(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const filteredItems = items.filter((item) => {

    const matchesSearch =
      item?.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      item?.status === statusFilter;

    const matchesCategory =
      categoryFilter === "all" ||
      item?.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );

  });

  return (

    <div className="container">

      <h2 className="page-title">
        Campus Lost & Found
      </h2>

      {/* Filters Section */}

      <div className="filters-container">

        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="all">
            All Status
          </option>

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

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>

      </div>

      {/* Items Grid */}

      <div className="items-grid">

        {filteredItems.length > 0 ? (

          filteredItems.map((item) => (

            <div
              key={item._id}
              className="glass-card item-card"
            >

              <Link to={`/item/${item._id}`}>

                <img
                  src={
                    item?.image ||
                    "https://via.placeholder.com/400"
                  }
                  alt={item.title}
                  className="item-image"
                />

                <h3 className="item-title">
                  {item.title}
                </h3>

              </Link>

              <p>{item.description}</p>

              <div className={`item-status ${item.status}`}>
                {item.status}
              </div>

            </div>

          ))

        ) : (

          <div className="glass-card empty-message">

            <h2>No items found</h2>

            <p>
              Try changing search or filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}
export default Home;