import React, {useState} from "react";

/*
controlled forms:
1. create state for form
2. set input values to state values
3. create onChange handler to update form state
*/
function ToyForm({ addToy }) {
  const initialForm = {
    //no id, leave that responsibility to JSON server
    image: '',
    likes: 0,
    name: ''
  }
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    setForm({
       //takes all key/value pairs from object
      ...form,
      //overwriting some previous key/value pair
      [e.target.name]: e.target.value  
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(form)
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }
    })
    .then(data => {
      addToy(data)
    })
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={(e) => handleSubmit(e)}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={form.name}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={form.image}
          onChange={(e) => handleChange(e)}
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
