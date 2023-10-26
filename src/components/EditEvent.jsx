import { Form, redirect } from "react-router-dom";
import { useState } from "react";
import { useContextData } from "../context/AppContext";
import styles from "./EditEvent.module.css";

export const EditEvent = ({ closeForm, categories, users, eventId }) => {
  const { events } = useContextData();
  const event = events.find((sEvent) => sEvent.id === eventId);

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [categoryIds, setCategoryIds] = useState(event.categoryIds);
  const [id, setId] = useState(event.id);
  const [createdBy, setCreatedBy] = useState(event.createdBy);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);

  const handleCategoryChange = (e) => {
    const selectedCategoryIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setCategoryIds(selectedCategoryIds);
  };

  const handleCreatedByChange = (e) => {
    setCreatedBy(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editEvent = {
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

    fetch(`http://localhost:3000/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(editEvent),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("event editted");
      closeForm();
      window.location.reload();
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.newPost}>
        <Form method="patch" onSubmit={handleSubmit}>
          <label className={styles.titleContainer}>
            <span>Title</span>
            <input
              name="title"
              maxLength="20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Short description</span>
            <textarea
              name="description"
              rows="2"
              maxLength="35"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Image URL</span>
            <input
              name="imgUrl"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label>
            <span>Categories (CTRL+Click to select multiple)</span>
            <select
              name="categoriesId"
              multiple
              value={categoryIds}
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
              value={createdBy}
              onChange={handleCreatedByChange}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            <span className={styles.startTimeMargin}>Start time:</span>
            <input
              name="date"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            <span className={styles.endTimeMargin}>End time:</span>
            <input
              name="date"
              type="datetime-local"
              value={endTime}
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