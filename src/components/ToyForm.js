import React, { useState } from "react";

//1. form state
//2. have input values reflect state
//3. onchange

function ToyForm({ addToy }) {

  const [form, setForm] = useState({
    name: '',
    image: '',
    likes: 0
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //POST
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(form)
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw Error('post went wrong')
      }
    })
    //on successful POST we will invoke addToy
    .then(data => {
      addToy(data)
      setForm({
        likes: 0,
        name: '',
        image: ''
      })
    })
    .catch(err => console.error('couldnt reach server'))
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
