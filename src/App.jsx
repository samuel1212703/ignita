import SideBar from "./components/SideBar";
import ImageViewer from "./components/ImageViewer";
import SideBarSecondary from "./components/SideBarSecondary";
import SideNavbar from "./components/SideNavbar";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Ignitia";
  }, []);

  return (
    <div className="App">
      <SideNavbar />
      <SideBar id="side-bar"></SideBar>
      <ImageViewer id="image-viewer"></ImageViewer>
      <SideBarSecondary></SideBarSecondary>
    </div>
  );
}

export default App;
