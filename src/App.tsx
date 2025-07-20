// src/App.tsx
import { Route, Routes, useNavigate } from "react-router-dom";

import {
  CreateProjectForm,
  About,
  Contact,
  PrivacyPolicy,
  TermsOfUse,
  Register,
  NotFound,
  Dashboard,
  CookiePolicy,
  SignIn,
} from "./pages";

import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import ProjectMap from "./components/projectMap/ProjectMap";
import ProjectDetail from "./components/dashboard/ProjectDetail";
import CookieConsent from "./components/cookie/CookieConsent";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import RegisterCompleteProfileForm from "./components/register/RegisterCompleteProfileForm";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20 pb-12 p-4 bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Register />} /> {/* maybe change later */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/create"
              element={
                <CreateProjectForm
                  onSuccess={() => {
                    navigate("/dashboard"); // redirect after project creation
                  }}
                />
              }
            />
            <Route path="/map" element={<ProjectMap />} />
            <Route path="/project/:id" element={<ProjectDetail />} />

            {/* Add complete profile route here */}
            <Route path="/completeProfile" element={<RegisterCompleteProfileForm />} />
          </Route>

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