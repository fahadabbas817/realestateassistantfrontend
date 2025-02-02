import React from "react";
import ReactMarkdown from "react-markdown";

const ReportContainer = ({ data }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-transparent  space-y-6">
     
      <section className="">
        
        <ReactMarkdown className="prose prose-lg">{data.Current_apartment_details}</ReactMarkdown>
      </section>

    
      <section className="">
        <ReactMarkdown className="prose prose-lg">{data.Comparison}</ReactMarkdown>
      </section>

     
      <section className="">
        <ReactMarkdown className="prose prose-lg">{data.Summary}</ReactMarkdown>
      </section>

      
      <section className="">
        <ReactMarkdown className="prose prose-lg">{data.Recommendations}</ReactMarkdown>
      </section>
    </div>
  );
};

export default ReportContainer;