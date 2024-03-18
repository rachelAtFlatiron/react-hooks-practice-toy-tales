import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  //leave dependency array empty, so that it only runs during component mount (i.e. first render)
  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        console.error('help')
      }
    })
    .then(data => setToys(data))
  }, [])

  //pre-made, for showing the form
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy){
    setToys([...toys, newToy])
  }

  function deleteToy(idToDelete){
    //filter
    setToys(toys.filter((toy) => toy.id !== idToDelete))
  }

  function updateToy(updatedToy){
    console.log(updatedToy)
    //replace existing tamagotchi with new tamagotchi object
    //.map -> replace one item based on updatedToy id
    setToys(toys.map(curToy => {
      if(curToy.id === updatedToy.id){
        return updatedToy
      } else {
        return curToy
      }
      //return curToy.id === updatedToy.id ? updatedToy : curToy
    }))
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
