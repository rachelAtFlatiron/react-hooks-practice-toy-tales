import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const url = "http://localhost:3001/toys"
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const loadData = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => setToys(data))
  }

  const addToy = (newToy) => {
    setToys([...toys, newToy]) //destructure as not to directly update state
  }

  const removeToy = (id) => {
    // setToys(toys.filter(el => el.id !== id))
    setToys(toys.filter(el => {
      if(el.id === id){ //remove from array
        return false 
      } else if (el.id !== id){ //keep in array
        return true 
      }
    }))
  }

  //id = 5, replace it with null
  //[1, 2, 3, 4, 5, 6, 7, ]
  //[1, 2, 3, 4, null, 6, 7]
  const updateToy = (data) => {
    //find toy by id 
    //if toy.id = data.id, replace with data
    //otherwise keep data 
    let newToys = toys.map(el => {
      if(el.id === data.id){ //if we've found the correct toy
        return data  //replace with new data
      } else {
        return el //otherwise keep current toy 
      }
    })

    // let forToys = []
    // for(let i in toys){
    //   if(toys[i].id === data.id){
    //     forToys.push(data)
    //   } else {
    //     forToys.push(toys[i])
    //   }
    // }
    setToys(newToys)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm url={url} addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer updateToy={updateToy} removeToy={removeToy} toys={toys} url={url} />
    </>
  );
}

export default App;
