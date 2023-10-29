import { Form } from "react-router-dom";
import { useState } from "react";
import { Center, Heading, useToast } from "@chakra-ui/react";
import styles from "./AddEvent.module.css";

export const AddEvent = ({ closeForm, categories, users }) => {
  const toast = useToast();
  // States get set from the form input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [createdBy, setCreatedBy] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCategoryChange = (e) => {
    const selectedCategoryIds = Array.from(e.target.selectedOptions, (option) =>
      // change category from string to interger
      parseInt(option.value)
    );
    setCategoryIds(selectedCategoryIds);
  };

  const handleAuthorChange = (e) => {
    const selectedAuthorId = parseInt(e.target.value);
    // change category from string to interger
    setCreatedBy(selectedAuthorId);
  };

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  // <<< Save event button clicked >>>
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    switch (true) {
      case title.length < 3:
        toast({
          title: "Invalid Title",
          description: "Minimum title of 3",
          status: "warning",
          position: "top",
        });
        break;
      case description.length < 15:
        toast({
          title: "Invalid description",
          description: "Minimum description of 15",
          status: "warning",
          position: "top",
        });
        break;
      case image.length === 0 || !isValidURL(image):
        toast({
          title: "Invalid URL",
          description: "Please enter a valid URL for the image.",
          status: "warning",
          position: "top",
        });
        break;
      case categoryIds.length < 1:
        toast({
          title: "Insuficient categories",
          description: "Please select at least one category.",
          status: "warning",
          position: "top",
        });
        break;
      case createdBy.length === 0:
        toast({
          title: "No author",
          description: "Please select an author",
          status: "warning",
          position: "top",
        });
        break;
      case location.length < 3:
        toast({
          title: "Unkown location",
          description: "Please enter a adress with the city.",
          status: "warning",
          position: "top",
        });
        break;
      case startTime.length === 0:
        toast({
          title: "Start time",
          description: "Please enter a date and time",
          status: "warning",
          position: "top",
        });
        break;
      case endTime.length === 0:
        toast({
          title: "End time",
          description: "Please enter a date and time",
          status: "warning",
          position: "top",
        });
        break;

      default:
        // Form validation complete > Places states in newEvent
        const newEvent = {
          createdBy,
          title,
          description,
          image,
          categoryIds,
          location,
          startTime,
          endTime,
        };
        // Consider placing a action to prevent window.location.reload
        // Post new event to server
        fetch("http://localhost:3000/events", {
          method: "POST",
          body: JSON.stringify(newEvent),
          headers: { "Content-Type": "application/json" },
        }).then(() => {
          closeForm();
          window.location.reload();
        });
    }
  };

  return (
    // Form input to setStates
    <div className={styles.modalOverlay}>
      <div className={styles.newPost}>
        <Form method="post" onSubmit={handleSubmit}>
          <Center>
            <Heading>Add Event</Heading>
          </Center>
          <label className={styles.titleContainer}>
            <span>Title</span>
            <input
              name="title"
              placeholder="minimum 3 letters"
              maxLength="20"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Short description</span>
            <textarea
              name="description"
              placeholder="minimum 15 letters"
              rows="2"
              maxLength="35"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Image URL</span>
            <input
              name="imgUrl"
              placeholder="copy & paste url here"
              type="url"
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label>
            <span>Categories (CTRL+Click to select multiple)</span>
            <select
              name="categoriesId"
              multiple
              required
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
              required
              onChange={handleAuthorChange}
            >
              <option value="" disabled>
                Select an author
              </option>
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
              placeholder="adres & city"
              rows="1"
              maxLength="40"
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            <span className={styles.startTimeMargin}>Start time:</span>
            <input
              name="date"
              type="datetime-local"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            <span className={styles.endTimeMargin}>End time:</span>
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
