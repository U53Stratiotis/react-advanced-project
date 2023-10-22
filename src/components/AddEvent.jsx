import { Form, redirect } from "react-router-dom";
import { useState } from "react";
import styles from "./AddEvent.module.css";

export const AddEvent = ({ closeForm, categories, users }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [id, setId] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleCategoryChange = (e) => {
    const selectedCategoryIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategoryIds(selectedCategoryIds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id,
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    };
    setIsPending(true);

    fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("new event added");
      setIsPending(false);
    });
    closeForm();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.newPost}>
        <Form method="post" onSubmit={handleSubmit}>
          <label className={styles.titleContainer}>
            <span>Title</span>
            <input
              name="title"
              maxLength="20"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Short description</span>
            <textarea
              name="description"
              rows="2"
              maxLength="35"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Image URL</span>
            <input
              name="imgUrl"
              type="url"
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label>
            <span>Categories (CTRL+Click to select multiple)</span>
            <select
              name="categoriesId"
              multiple
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Author</span>
            <select
              name="userId"
              onChange={(e) => setCreatedBy(parseInt(e.target.value))}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Location</span>
            <textarea
              name="location"
              rows="1"
              maxLength="40"
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            <span>Start time</span>
            <input
              name="date"
              type="datetime-local"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            <span>End time</span>
            <input
              name="date"
              type="datetime-local"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
          <div className={styles.buttonsContainer}>
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.saveButton}
            >
              Save
            </button>
            <button onClick={closeForm} className={styles.closeButton}>
              Close
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
