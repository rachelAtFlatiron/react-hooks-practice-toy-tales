import { useState } from "react";

function ToyForm( { addToy }) {
  const initialForm = {
    image: '',
    likes: 0,
    name: ''
  }

  const [form, setForm] = useState(initialForm)

  /*
    MAKE FORM CONTROLLED
    1. make state for form values
    2. add state values as values in individual inputs
    3. create onChange to update state on input change
    4. onSubmit - POST request
  */

  const handleChange = (e) => {
    setForm({
      ...form, //destructure so we don't manipulate original
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    /*************************************************/
    //NEED THIS NEED THIS NEED THIS NEED THIS
    /*************************************************/
    e.preventDefault() 

    fetch(`http://localhost:3001/toys`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      //show new toy on page
      addToy(data) //use data so we can also save new id
      setForm(initialForm) //only put in here upon successful POST
    }) 
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={e => handleSubmit(e)}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={form.name}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={form.image}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
