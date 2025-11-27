import { useState } from "react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import FindUs from "./components/FindUs";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [showList, setShowList] = useState(null);
  return (
    <>
      <Header setShowList={setShowList} />
      <Gallery showList={showList} setShowList={setShowList} />
      <AboutUs />
      <ContactUs />
      <FindUs />
      <Footer />
    </>
  );
}

export default App;
