import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "https://auction-backend-72z9.onrender.com";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    grade: "A",
    team: "Tanupukur Knight Riders", // Set a valid default team
    category: "Batsman",
    points: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Submitting data:", data); // Debugging

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("grade", data.grade);
    formData.append("category", data.category);
    formData.append("team", data.team);
    formData.append("points", Number(data.points));
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/player/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          grade: "A",
          team: "Tanupukur Knight Riders", // Reset to a valid team
          category: "Batsman",
          points: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding player. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Player Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-grade-team">
          <div className="add-grade flex-col">
            <p>Player Grade</p>
            <select onChange={onChangeHandler} name="grade" value={data.grade}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="add-team flex-col">
            <p>Player Team</p>
            <select onChange={onChangeHandler} name="team" value={data.team}>
              <option value="Tanupukur Knight Riders">
                Tanupukur Knight Riders
              </option>
              <option value="Thala Warriors">Thala Warriors</option>
              <option value="Ele Belle">Ele Belle</option>
              <option value="Bubul 7">Bubul 7</option>
              <option value="Gladiator's">Gladiator's</option>
            </select>
          </div>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Player Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-rounder</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Player Points</p>
            <input
              onChange={onChangeHandler}
              value={data.points}
              type="number"
              name="points"
              placeholder="₹200"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
