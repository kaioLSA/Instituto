import React from "react";
import Navbar from "./constants/Navbar";
import HeroInstituto from "./constants/hero";
import PilaresInstituto from "./constants/PilaresInstituto";
import ProgramasStickyScroll from "./constants/ProgramasStickyScroll";
import AlunosSection from "./constants/AlunosSection";
import NossoInstituto from "./constants/NossoInstituto";
import VoluntarioDoacao from "./constants/VoluntarioDoacao";
import NoticiasEMapa from "./constants/NoticiasEMapa";
import Colaboradores from "./constants/Colaboradores";
import Footer from "./constants/Footer";

const App = () => {
  return (
    <div className="min-h-screen text-white">
        <Navbar />
        <HeroInstituto />
        <PilaresInstituto />
        <ProgramasStickyScroll />
        <AlunosSection />
        <NossoInstituto />
        <VoluntarioDoacao />
        <Colaboradores />
        <NoticiasEMapa />
        <Footer />
    </div>
  );
};

export default App;
