import { Route, Routes, useNavigate } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import CreateProjectForm from "./pages/CreateProject";
import ProjectMap from "./components/projectMap/ProjectMap";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ProjectDetail from "./components/dashboard/ProjectDetail";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import CookieConsent from "./components/cookie/CookieConsent";
import CookiePolicy from "./pages/CookiePolicy";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20 pb-12 p-4 bg-gray-50">
        <Routes>
          <Route path="/" element={<Register />} /> {/* maybe change later */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/create"
            element={
              <CreateProjectForm
                onSuccess={() => {
                  navigate("/dashboard"); // maybe redirect to dashboard after project
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
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          {/* NotFound page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer
        onNavigate={(page) => {
          navigate(page === "/" ? "/" : `/${page}`);
        }}
      />

      <CookieConsent />
    </div>
  );
}

export default App;