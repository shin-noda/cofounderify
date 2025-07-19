import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We'd love to hear from you!  
        For any inquiries, feedback, or support, please email us at  
        <a href="mailto:support@cofounderify.com" className="text-blue-600 hover:underline">
          support@cofounderify.com
        </a>.
      </p>
      <p>Or just say hi on social media — coming soon!</p>
    </div>
  );
};

export default Contact;