import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, deleteToy, updateToy }) {
  return (
    <div id="toy-collection">{
      toys.map(toy => <ToyCard key={toy.id} toy={toy} deleteToy={deleteToy} updateToy={updateToy} />)
    }</div>
  );
}

export default ToyContainer;
