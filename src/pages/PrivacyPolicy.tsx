import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded shadow  text-center">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Your privacy is important to us. This page explains how we collect,
        use, and protect your information.
      </p>
      <p className="mt-4">
        {/* Add more detailed privacy policy here */}
        We do not share your personal data with third parties.
      </p>
    </div>
  );
};

export default PrivacyPolicy;