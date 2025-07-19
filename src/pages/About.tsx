import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded shadow">
      <h1 className="text-4xl font-bold mb-2 text-center">About CoFounderify</h1>
      <p className="text-center text-sm italic mb-6">Pronounced: Co-Founder-ify</p>
      <p className="mb-4">
        CoFounderify is a platform built to connect ambitious founders and talented collaborators. 
        Whether you're looking for a co-founder, team members, or just inspiration, we're here to help you bring your ideas to life.
      </p>
      <p className="mb-4">
        Our mission is to make project collaboration simple, transparent, and fun — with cool features like World Drum Roll (WDR), Big Brainers, and more.
      </p>
      <p>
        Thanks for stopping by! We’re excited to see what you build with CoFounderify.
      </p>
    </div>
  );
};

export default About;