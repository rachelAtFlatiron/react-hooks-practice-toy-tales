import React from "react";

function ToyCard({ toy, removeToy, url, updateToy }) {
  //'http://localhost:3001/toys/3'
  const handleClick = () => {
    fetch(`${url}/${toy.id}`, {
      method: 'DELETE'
    })
    .then(res => {
      //if the delete succeeded 
      if(res.ok){
        removeToy(toy.id) //pessimistic rendering
      } else {
        alert('oops')
      }
    })
  }

  const handleLike = () => {
    fetch(`${url}/${toy.id}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({likes: toy.likes + 1})
    })
    .then(res => res.json())
    .then(data => updateToy(data))
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
      <button onClick={handleLike} className="like-btn">Like {"<3"}</button>
      <button onClick={handleClick} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
