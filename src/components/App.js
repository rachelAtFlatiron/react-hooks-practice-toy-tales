import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([])
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw Error('get went wrong')
      }
    })
    .then(data => setToys(data))
    .catch(err => console.error('couldnt reach server'))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function deleteToy(id){
    setToys(toys.filter(el => {
      if(el.id === id){
        return false 
      } else {
        return true
      }
    }))
  }

  //replace one and only one toy, based on the matching id
  function updateToy(updatedToy){

    setToys(toys.map(originalToy => {
      //replace originalToy with updatedToy (use id to check if its the correct toy)
      if(updatedToy.id === originalToy.id){
        return updatedToy 
      //otherwise we will keep the original originalToy in the array
      } else {
        return originalToy
      }
    }))
  }

  function addToy(newToy){
    setToys([...toys, newToy])
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateToy={updateToy} />
    </>
  );
}

export default App;
