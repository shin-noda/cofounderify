// src/App.tsx
import { Route, Routes, useNavigate } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CreateProjectForm from "./pages/CreateProjectForm";
import ProjectMap from "./components/ProjectMap";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ProjectDetail from "./components/ProjectDetail";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20 pb-12 p-4 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={
              <CreateProjectForm
                onSuccess={() => {
                  navigate("/");
                }}
              />
            }
          />
          <Route path="/map" element={<ProjectMap />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </main>

      {/* Keep passing onNavigate only if Footer expects it */}
      <Footer
        onNavigate={(page) => {
          navigate(page === "/" ? "/" : `/${page}`);
        }}
      />
    </div>
  );
}

export default App;
