import { useLoaderData, Form, redirect } from "react-router-dom";

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

export const loader = async (url) => {
  return await fetch(url);
};

// export const loader = async () => {
//   return await fetch("http://localhost:3000/categories");
// };

const categories = await loader("http://localhost:3000/categories");
const users = await loader("http://localhost:3000/users");

export const AddEvent = () => {
  const { categories, users } = useLoaderData();

  return (
    <div className="new-post">
      <Form method="post">
        <label>
          <span>Title</span>
          <input name="title"></input>
        </label>
        <label>
          <span>Description</span>
          <textarea name="description" rows="6" />
        </label>
        <label>
          <span>Image URL</span>
          <input name="img-url" type="url" />
        </label>
        <label>
          <span>Categories</span>
          <select name="userId">
            {categories.map((cat) => (
              <option value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <span>Author</span>
          <select name="userId">
            {users.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Date</span>
          <input name="img-url" type="date" />
        </label>
        <button type="submit">Save</button>
      </Form>
    </div>
  );
};
