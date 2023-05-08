import { useState, useEffect } from "react";
import ToyCard from "./ToyCard";


//pass state toys from App as props
function ToyContainer({ toys, deleteToy, updateToy }) {

	//iterate over toys, create ToyCard for each toy
	const toyMap = [...toys].map((el) => {
		return <ToyCard updateToy={updateToy} toy={el} key={el.id} deleteToy={deleteToy} />;
	});

	return <div id="toy-collection">{toyMap}</div>;
}

export default ToyContainer;
