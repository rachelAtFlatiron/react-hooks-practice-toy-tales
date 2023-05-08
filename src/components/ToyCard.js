import React from "react";

function ToyCard({ toy, deleteToy, updateToy }) {

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => deleteToy(toy) )

  }

  function handleLike(){
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...toy,
        likes: toy.likes + 1
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => updateToy(data))
  }

  return (
    <div className="card" >
      <h2>{ toy.name }</h2>
      <img
        src={ toy.image }
        alt={ toy.name }
        className="toy-avatar"
      />
      <p>{ toy.likes } Likes </p>
      <button onClick={() => handleLike()} className="like-btn">Like {"<3"}</button>
      <button onClick={() => handleDelete()} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
