import React from "react";

function ToyCard({ toy, deleteToy, updateToy }) {
	function handleLike() {
		fetch(`http://localhost:3001/toys/${toy.id}`, {
			method: "PATCH",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ likes: toy.likes + 1 })
		})
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw Error('patch went wrong')
      }
    })
    .then(data => {
      updateToy(data)
    })
    .catch(err => console.error('couldnt reach server'))
	}

	function handleDelete() {
		fetch(`http://localhost:3001/toys/${toy.id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					deleteToy(toy.id);
				} else {
					throw Error("delete went wrong");
				}
			})
			.catch((err) => console.error("couldnt reach server"));
	}

	return (
		<div className="card">
			<h2>{toy.name}</h2>
			<img src={toy.image} alt={toy.name} className="toy-avatar" />
			<p>{toy.likes} Likes </p>
			<button onClick={handleLike} className="like-btn">
				Like {"<3"}
			</button>
			<button onClick={handleDelete} className="del-btn">
				Donate to GoodWill
			</button>
		</div>
	);
}

export default ToyCard;
