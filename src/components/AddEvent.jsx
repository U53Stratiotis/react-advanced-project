import { useLoaderData, Form, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  // Object.fromEntries transforms data to an object
  const formData = Object.fromEntries(await request.formData());
  // Await the fetch to "http://localhost:3000/posts". Give it an options object where we set the method to “POST”.
  // We use JSON.stringify() to convert the object with all the form data to JSON and assign it to the body of the request.
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
  return await fetch("http://localhost:3000/categories");
};

export const AddEvent = () => {
  const categories = useLoaderData();

  return (
    <div className="new-post">
      <Form method="post">
        <label>
          <span>Title</span>
          <input name="title"></input>
        </label>
        <label>
          <span>Description</span>
          <textarea name="body" rows="6" />
        </label>
        <label>
          <span>Categories</span>
          <select name="userId">
            {categories.map((cat) => (
              <option value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Save</button>
      </Form>
    </div>
  );
};
