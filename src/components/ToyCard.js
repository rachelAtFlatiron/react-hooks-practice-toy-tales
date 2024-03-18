import React from "react";

function ToyCard({ toy, deleteToy, updateToy }) {

  const handleDelete = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        console.error('sad')
      }
    })
    .then(() => {
      console.log('good')
      deleteToy(toy.id)
    })
  }

  const handleLike = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({likes: toy.likes + 1})
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        console.error('oops')
      }
    })
    .then(data => {
      console.log('likes updated')
      updateToy(data)
    })
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
