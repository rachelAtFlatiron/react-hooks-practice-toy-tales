import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, removeToy, updateToy, url }) {
  return (
    <div id="toy-collection">
      {
        toys.map(toy => <ToyCard toy={toy} removeToy={removeToy} url={url} updateToy={updateToy} />)
      }
    </div>
  );
}

export default ToyContainer;
