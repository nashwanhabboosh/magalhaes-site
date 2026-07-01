import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/ContactUs";
import About from "./pages/About/About";
import Careers from "./pages/Careers/Careers";
import Services from "./pages/services/ServicePage";
import Doctors from "./pages/Doctors/Doctors";
import Locations from "./pages/Locations/Locations";
import Resources from "./pages/PatientResources/PatientResources"
import Sitemap from "./pages/Sitemap/Sitemap";

import NorthAttleboro from "./pages/Locations/NorthAttleboro";
import NorthDartmouth from "./pages/Locations/Dartmouth";


// Doctors Pages
import JohnMagalhaes from "./pages/Doctors/john-magalhaes-o-d-f-a-a-o";
import DomenicCovello from "./pages/Doctors/domenic-a-covello-o-d";
import PatriciaGarcia from "./pages/Doctors/dr-patricia-garcia";
import EvanHosney from "./pages/Doctors/evan-hoseny-o-d";
import MichelleVining from "./pages/Doctors/michelle-vining-o-d";
import NicolePatricio from "./pages/Doctors/nicole-patricio-o-d";
import TinaParker from "./pages/Doctors/tina-parker";
import JacquelineKlombers from "./pages/Doctors/JacquelineKlombers";

// Service Pages
import EyeExam from "./pages/services/comprehensive-eye-exam";
import EyeCare from "./pages/services/eye-care";
import Contacts from "./pages/services/contact-lenses";
import EyeDiseases from "./pages/services/eye-diseases";
import LaserVisionCorrection from "./pages/services/laser-vision-correction";
import Latisse from "./pages/services/latisse";
import NewEyecareMeds from "./pages/services/new-eyecare-meds";
import OpticalShop from "./pages/services/optical-shop";
import VisionProblems from "./pages/services/vision-problems";

// Eye Diseases Sub-Pages
import CataractsTreatment from "./pages/services/eye-diseases/cataracts-treatment";
import Conjunctivitis from "./pages/services/eye-diseases/conjunctivitis-pink-eye";
import DiabeticEyeDisease from "./pages/services/eye-diseases/diabetic-eye-disease";
import DryEye from "./pages/services/eye-diseases/dry-eye";
import Glaucoma from "./pages/services/eye-diseases/glaucoma";
import MacularDegeneration from "./pages/services/eye-diseases/macular-degeneration";

function App() {
  return (
    <Router>
      {/* Components that appear on all pages */}
      <ScrollToTop />
      <Header />

      {/* Page content changes based on URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/about/" element={<About />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/doctors/" element={<Doctors />} />
        <Route path="/locations/" element={<Locations />} />
        <Route path="/careers/" element={<Careers />} />
        <Route path="/patient-info/" element={<Resources />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/location/north-attleboro-fashion-crossing" element={<NorthAttleboro />} />
        <Route path="/location/north-dartmouth" element={<NorthDartmouth />} />

        {/* Doctor Pages */}
        <Route path="/doctors/john-magalhaes" element={<JohnMagalhaes />} />
        <Route path="/doctors/domenic-covello" element={<DomenicCovello />} />
        <Route path="/doctors/nicole-patricio" element={<NicolePatricio />} />
        <Route path="/doctors/patricia-garcia" element={<PatriciaGarcia />} />
        <Route path="/doctors/tina-parker" element={<TinaParker />} />
        <Route path="/doctors/evan-hosney" element={<EvanHosney />} />
        <Route path="/doctors/michelle-vining" element={<MichelleVining />} />
        <Route path="/doctors/jacqueline-klombers" element={<JacquelineKlombers />} />

        {/* Service Pages */}
        <Route path="/services/comprehensive-eye-exam" element={<EyeExam />} />
        <Route path="/services/eye-care" element={<EyeCare />} />
        <Route path="/services/contact-lenses" element={<Contacts />} />
        <Route path="/services/eye-diseases" element={<EyeDiseases />} />
        <Route path="/services/laser-vision-correction" element={<LaserVisionCorrection />} />
        <Route path="/services/latisse" element={<Latisse />} />
        <Route path="/services/new-eyecare-meds" element={<NewEyecareMeds />} />
        <Route path="/services/optical-shop" element={<OpticalShop />} />
        <Route path="/services/vision-problems" element={<VisionProblems />} />

        {/* Eye Diseases Sub-Pages */}
        <Route path="/services/eye-diseases/cataracts-treatment" element={<CataractsTreatment />} />
        <Route path="/services/eye-diseases/conjunctivitis-pink-eye" element={<Conjunctivitis />} />
        <Route path="/services/eye-diseases/diabetic-eye-disease" element={<DiabeticEyeDisease />} />
        <Route path="/services/eye-diseases/dry-eye" element={<DryEye />} />
        <Route path="/services/eye-diseases/glaucoma" element={<Glaucoma />} />
        <Route path="/services/eye-diseases/macular-degeneration" element={<MacularDegeneration />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
