import { FaBars, FaCat, FaBackspace, FaDog, FaDove } from "react-icons/fa";

const Header = ({ setShowList }) => {
  const OpenDogsList = () => {``
    setShowList("dogs");
  };
  const OpenCatsList = () => {
    setShowList("cats");
  };
  const OpenBirdsList = () => {
    setShowList("birds");
  };

  const OpenNavBar = () => {
    window.document.querySelector(".navbar-menu-list").style.display = "flex";
    window.document.querySelector(".navbar-menu-btn").style.display = "none";
  };
  const CloseNavBar = () => {
    window.document.querySelector(".navbar-menu-list").style.display = "none";
    window.document.querySelector(".navbar-menu-btn").style.display = "flex";
  };
  return (
    <header>
      <span className="logo">
        <img src="src/assets/animals.png" alt="animal" />
        PET EXPO
      </span>
      <button className="navbar-menu-btn" onClick={OpenNavBar}>
        <FaBars />
      </button>
      <nav className="navbar-menu-list">
        <button className="cats-list-btn" onClick={OpenCatsList}>
          <FaCat className="cat" /> Cats
        </button>
        <button className="dogs-list-btn" onClick={OpenDogsList}>
          <FaDog className="dog" /> Dogs
        </button>
        <button className="birds-list-btn" onClick={OpenBirdsList}>
          <FaDove className="bird" /> Birds
        </button>
        <button className="close-navbar-btn" onClick={CloseNavBar}>
          <FaBackspace />
        </button>
      </nav>
      <nav className="menu">
        <button className="cats-list-btn" onClick={OpenCatsList}>
          <FaCat className="cat" /> Cats
        </button>
        <button className="dogs-list-btn" onClick={OpenDogsList}>
          <FaDog className="dog" /> Dogs
        </button>
        <button className="birds-list-btn" onClick={OpenBirdsList}>
          <FaDove className="bird" /> Birds
        </button>
      </nav>
    </header>
  );
};
export default Header;
