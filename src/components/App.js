import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

/*
DELIVERABLE #1: GET
1. created state for our toys (since we want to update over time)
2. created useEffect that will run on mount and make fetch GET for all toys
3. pass toys state down as props to ToyContainer
4. map over toys and create a ToyCard for each toy
5. updated toy card to display each toy's details
*/

/*
DELIVERABLE #2: POST FORM
1. make our form controlled
2. make callback function to update state toys INSIDE app.js
3. pass that callback function down to ToyForm
4. on new toy form submit: make POST request, invoke App's callback function
*/

/*
DELIVERABLE #2.0: FILTERING
1. make filter form controlled
  - a. make state for input
  - b. make onChange for input
2. filter through toys state based on search state
*/

/*
DELIVERABLE #3: DELETE
1. make cb function in App to remove toy from state
2. pass cb down to ToyCard (since that's where the button is)
3. in ToyCard on button click, make delete request, invoke cb function
*/

/*
DELIVERABLE #4: PATCH (for likes)
1. make cb function in App to update toys state (specifically likes)
2. pass cb all the way down to ToyCard (since that's where the button is)
3. in ToyCard on button click, make PATCH request, invoke cb function
*/

function App() {
  const [showForm, setShowForm] = useState(false);
  /*************************************************/
  //if null: caught TypeError: toys is not iterable
  /*************************************************/
  const [toys, setToys] = useState([]);
  const [search, setSearch] = useState('')

  //want toys to update when fetch has been fulfilled
	useEffect(() => {
		fetch("http://localhost:3001/toys")
			.then((res) => res.json())
			.then((data) => setToys(data));
    /*************************************************/
		//need empty dependency array so it only runs on mount
    /*************************************************/
		//otherwise get infinite fetches
	}, []);

	function addToy(toy) {
    setToys([...toys, toy])
  }

  function deleteToy(toy) {
    setToys(
      [...toys].filter(el => {
        return el.id !== toy.id ? true : false
      })
    )
  }

  function updateToy(toy){
    setToys([...toys].map(el => {
      return el.id === toy.id ? toy : el 
    }))
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleChange(e) {
    //update state on form input change
    // user types (onChange) -> set search state -> display state to user
    setSearch(e.target.value)
  }

  //filtered toys based on state 'search'
  /*************************************************/
  //DO NOT UPDATE ORIGINAL TOYS STATE so when backspacing, toys come back
  /*************************************************/
  const filteredToys = [...toys].filter(el => {
    //does el (toy) contain the string search? (must return true/false)
    //1. convert both el.name and search to lowercase
    //2. check if el.name contains search substring
    return el.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* filter form  */}
      <div className="container">
        <form className="add-toy-form">
            <input className="input-text" placeholder="Search..." value={search} onChange={(e) => handleChange(e)}/>
        </form>
      </div>
      {/* end filter form */}

      <ToyContainer updateToy={updateToy} toys={filteredToys} deleteToy={deleteToy} />
    </>
  );
}

export default App;
