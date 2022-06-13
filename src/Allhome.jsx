import { useState, useEffect } from "react";
import { Navigation } from "./components/Pages/navigation";
import { Header } from "./components/Pages/header";
import { Features } from "./components/Pages/features";
import { About } from "./components/Pages/about";
import { Services } from "./components/Pages/services";
import { Gallery } from "./components/Pages/gallery";
import { Testimonials } from "./components/Pages/testimonials";
import { Team } from "./components/Pages/Team";
import { Contact } from "./components/Pages/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
// import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Allhome = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      {/* <Services data={landingPageData.Services} /> */}
      {/* <Gallery data={landingPageData.Gallery}/> */}
      {/* <Testimonials data={landingPageData.Testimonials} /> */}
      {/* <Team data={landingPageData.Team} /> */}
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default Allhome;
