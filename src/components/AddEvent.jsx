import { useLoaderData, Form, redirect } from "react-router-dom";
import styles from "./AddEvent.module.css";

export const action = async ({ request }) => {
  // Object.fromEntries transforms data to an object
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    // Convert the response to JSON.
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

export const loader = async () => {
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const usersResponse = await fetch("http://localhost:3000/users");

  const categoriesData = await categoriesResponse.json();
  const usersData = await usersResponse.json();

  return {
    categories: categoriesData,
    users: usersData,
  };
};

export const AddEvent = ({ closeForm }) => {
  const { categories, users } = useLoaderData();

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.newPost}>
        <Form method="post">
          <label class={styles.titleContainer}>
            <span>Title</span>
            <input name="title" maxlength="20" />
          </label>
          <label>
            <span>Description (Max 35 letters)</span>
            <textarea name="description" rows="2" maxlength="35" />
          </label>
          <label>
            <span>Image URL</span>
            <input name="img-url" type="url" />
          </label>
          <label>
            <span>Categories (CTRL+Click to select multiple)</span>
            <select name="userId" multiple>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Author</span>
            <select name="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Date</span>
            <input name="img-url" type="date" />
          </label>
          <div className={styles.buttonsContainer}>
            <button
              type="submit"
              onClick={closeForm}
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
