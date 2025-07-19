import React from "react";

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded shadow  text-center">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p>
        By using CoFounderify, you agree to these terms and conditions.
      </p>
      <p className="mt-4">
        {/* Add detailed terms here */}
        Please use the platform responsibly and respect other users.
      </p>
    </div>
  );
};

export default TermsOfUse;