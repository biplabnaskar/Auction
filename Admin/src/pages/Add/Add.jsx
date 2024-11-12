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
    team: "Team-A",
    category: "Batsman",
    points: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("grade", data.grade);
    formData.append("category", data.category);
    formData.append("team", data.team);
    formData.append("points", Number(data.points));
    formData.append("image", image);
    const response = await axios.post(`${url}/api/player/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        grade: "A",
        team: "Team-A",
        category: "Batsman",
        points: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
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
              alt=""
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
            <select onChange={onChangeHandler} name="grade">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="add-team flex-col">
            <p>Player team</p>
            <select onChange={onChangeHandler} name="team">
              <option value="Team-A">Team-A</option>
              <option value="Team-B">Team-B</option>
              <option value="Team-C">Team-C</option>
            </select>
          </div>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Player category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-rounder</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Player Point</p>
            <input
              onChange={onChangeHandler}
              value={data.points}
              type="Number"
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
