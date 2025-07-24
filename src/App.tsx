// src/App.tsx
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import DashboardProjectDetail from "./components/dashboard/DashboardProjectDetail";
import CookieConsent from "./components/cookie/CookieConsent";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import RegisterCompleteProfileForm from "./components/register/RegisterCompleteProfileForm";
import UserProfile from "./pages/UserProfile";

import { FilterProvider } from "./context/FilterContext";
import CheckEmailVerification from "./pages/CheckEmailVerification";
import SignInForgotPassword from "./components/signIn/SignInForgotPassword";
import YourProjects from "./pages/YourProjects";
import PublicFeed from "./pages/PublicFeed";
import DashboardEditProject from "./components/dashboard/DashboardEditProject";

function App() {
  const navigate = useNavigate();

  return (
    <FilterProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-grow pt-20 pb-12 p-4 bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/feed" element={<PublicFeed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/cookiePolicy" element={<CookiePolicy />} />
            <Route path="/checkEmailVerification" element={<CheckEmailVerification />} />
            <Route path="/forgotPassword" element={<SignInForgotPassword />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              {/* Redirect / to Dashboard */}
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/create"
                element={
                  <CreateProjectForm
                    onSuccess={() => {
                      navigate("/dashboard");
                    }}
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/:id" element={<DashboardProjectDetail />} />
              <Route path="/completeProfile" element={<RegisterCompleteProfileForm />} />
              <Route path="/profile/:uid" element={<UserProfile />} />
              <Route path="/myProjects" element={<YourProjects />} />
              <Route path="/edit/:projectId" element={<DashboardEditProject />} />
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

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </FilterProvider>
  );
}

export default App;