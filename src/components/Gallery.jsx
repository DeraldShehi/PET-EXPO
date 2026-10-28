import { useState } from "react";
import GetAnimals from "./GetAnimals";
import SearchBar from "./SearchBar";
import { FaCat, FaDog, FaDove } from "react-icons/fa";

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
      <SearchBar wordEntered={wordEntered} setWordEntered={setWordEntered} />
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
        {showList && (
          <GetAnimals
            key={showList}
            type={showList}
            wordsEntered={wordEntered}
          />
        )}
      </div>
    </div>
  );
};
export default Gallery;
