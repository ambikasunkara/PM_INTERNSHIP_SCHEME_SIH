import React from "react";
import InternshipCard from "./InternshipCard";

export default function MatchesList({ internships, isLoading }) {
  if (isLoading) return <p>Loading...</p>;
  if (!internships.length) return <p>No internships to show yet</p>;

  return (
    <div className="flex-1 md:pl-8">
      {internships.map((job, i) => (
        <InternshipCard key={i} {...job} />
      ))}
    </div>
  );
}