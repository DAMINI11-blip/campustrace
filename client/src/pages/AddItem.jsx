import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { categories } from "../constants/categories"

function AddItem() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // FIXED (must be here)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    image: "",
    status: "lost",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (file) => {

    try {
      setLoading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "campustrace");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dugcviczg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await res.json();

      // FIX: proper validation (Cloudinary always returns result even on error)
      if (uploadedImage?.secure_url) {

        setFormData((prev) => ({
          ...prev,
          image: uploadedImage.secure_url,
        }));

        setImagePreview(uploadedImage.secure_url);

        toast.success("Image uploaded successfully");

      } else {
        throw new Error("Upload failed");
      }

    } catch (error) {

      console.log("Upload error:", error);
      toast.error("Image upload failed");

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/items",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Item Added Successfully");

      setFormData({
        title: "",
        category: "",
        description: "",
        location: "",
        contact:"",
        image: "",
        status: "lost",
      });

      setImagePreview("");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed To Add Item"
      );
    }
  };

  return (

    <div className="container">

      <div className="form-container glass-card">

        <h2 className="page-title">
          Add Lost Item
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input 
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Info"
            value={formData.contact}
            onChange={handleChange}
          />

          {/* Image Upload */}
          <div className="upload-box">

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                uploadImage(e.target.files[0])
              }
            />

            {loading && (
              <p>Uploading image...</p>
            )}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="preview-image"
              />
            )}

          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="lost">Lost</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Add Item"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddItem;