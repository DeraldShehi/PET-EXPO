import { useState } from "react";
import GetDogs from "./GetDogs";
import GetCats from "./GetCats";
import GetBirds from "./GetBirds";
import SearchBar from "./SearchBar";
import { FaCat, FaDog, FaDove } from "react-icons/fa6";

const Gallery = ({ showList, setShowList }) => {
  const [wordEntered, setWordEntered] = useState("");
  const OpenDogsList = () => {
    setShowList("dogs");
  };
  const OpenCatsList = () => {
    setShowList("cats");
  };
  const OpenBirdsList = () => {
    setShowList("birds");
  };

  return (
    <div className="gallery">
      <h1>GALLERY</h1>
      <SearchBar wordsEntered={wordEntered} setWordEntered={setWordEntered} />
      <div className="card-container">
        <div className="menu-gallery">
          <button className="cats-list-btn" onClick={OpenCatsList}>
            <FaCat className="cat" />
            Open Cats List
          </button>
          <button className="dogs-list-btn" onClick={OpenDogsList}>
            <FaDog className="dog" />
            Open Dogs List
          </button>
          <button className="birds-list-btn" onClick={OpenBirdsList}>
            <FaDove className="bird" />
            Open Birds List
          </button>
        </div>
        {showList === "dogs" && <GetDogs wordsEntered={wordEntered} />}
        {showList === "cats" && <GetCats wordsEntered={wordEntered} />}
        {showList === "birds" && <GetBirds wordsEntered={wordEntered} />}
      </div>
    </div>
  );
};
export default Gallery;
