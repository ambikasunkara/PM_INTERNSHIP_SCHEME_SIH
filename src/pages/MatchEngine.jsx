import React, { useState, useEffect } from "react";

// Sample internship data
const internshipsData = [
  { title: "ML Intern", company: "Innovate AI", location: "Bengaluru", skills: ["Python","ML"], capacity:5, appliedCount:0, url:"https://unstop.com/internship/ml-intern" },
  { title: "Data Science Intern", company: "Data Insights", location: "Hyderabad", skills:["Python","SQL"], capacity:3, appliedCount:0, url:"https://unstop.com/internship/data-science" },
  { title: "Frontend Developer", company: "WebWeavers", location: "Remote", skills:["React","CSS"], capacity:4, appliedCount:0, url:"https://unstop.com/internship/frontend" },
  { title: "Backend Developer", company: "CodeFactory", location: "Pune", skills:["Node.js","SQL"], capacity:2, appliedCount:0, url:"https://unstop.com/internship/backend" },
  { title: "AI Research Intern", company: "NeuralNet Inc", location: "Bengaluru", skills:["Python","ML","TensorFlow"], capacity:3, appliedCount:0, url:"https://unstop.com/internship/ai-research" },
];

const categories = ["General", "OBC", "SC", "ST", "Rural", "Aspirational"];

export default function MatchEnginePage() {
  const [formData, setFormData] = useState({
    name: "", contact: "", college: "",
    skillsArray: [], skillInput: "",
    location: "", sector: "", category: "",
    resume: null, pastParticipation: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [matchedInternships, setMatchedInternships] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if(type==="checkbox") setFormData({...formData, [name]: checked});
    else if(type==="file") setFormData({...formData, [name]: files[0]});
    else setFormData({...formData, [name]: value});
  };

  // Match score calculation
  const calculateScore = (student, internship) => {
    const studentSkills = student.skillsArray.map(s => s.toLowerCase());
    const skillMatchCount = internship.skills.filter(skill => studentSkills.includes(skill.toLowerCase())).length;

    let score = skillMatchCount * 20; // 20 points per skill

    if(student.pastParticipation) score -= 10; // past participation penalty

    if(internship.location.toLowerCase() === student.location.toLowerCase()) score += 5; // location bonus

    if(["SC","ST","OBC","Rural","Aspirational"].includes(student.category)) score += 10; // category bonus

    if(internship.appliedCount >= internship.capacity) score -= 10; // small penalty if capacity reached

    return Math.min(Math.max(Math.round(score), 0), 100); // ensure 0-100
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const scoredInternships = internshipsData.map(intern=>({
      ...intern,
      score: calculateScore(formData, intern)
    }));

    const top3 = scoredInternships.sort((a,b) => b.score - a.score).slice(0,5);

    top3.forEach(intern => {
      const index = internshipsData.findIndex(i => i.company === intern.company && i.title === intern.title);
      if(index !== -1) internshipsData[index].appliedCount += 1;
    });

    setMatchedInternships(top3);
    setSubmitted(true);
  };

  // Particle background
  useEffect(() => {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for(let i=0;i<80;i++){
      particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, radius: Math.random()*3+1, dx:(Math.random()-0.5)*0.5, dy:(Math.random()-0.5)*0.5 });
    }
    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle="rgba(255,255,255,0.6)";
        ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>canvas.width)p.dx*=-1;
        if(p.y<0||p.y>canvas.height)p.dy*=-1;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <canvas id="particle-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>

      {/* Main content */}
<div className="relative z-10 flex flex-col md:flex-row gap-6 p-6 flex-1"
     style={{ background: "linear-gradient(135deg, #f5f7fa, #e4e9f0)" }}>


        {/* Form */}
        <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl p-8 w-full md:w-1/2 flex flex-col space-y-4 shadow-xl hover:shadow-2xl transition duration-500 relative">
          <h2 className="text-3xl font-bold text-center text-purple-700">Student Registration</h2>
          <p className="text-sm text-center text-gray-600">Complete your details to discover top internship matches</p>

          {["name","contact","college","location","sector"].map((field,i)=>(
            <div key={i} className="flex flex-col">
              <label className="font-semibold text-gray-700">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
              <input type="text" name={field} value={formData[field]} onChange={handleChange}
                    className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none"
                    placeholder={`Enter your ${field}`} required />
            </div>
          ))}
{/* Skills */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Skills (Type & Enter)</label>
            <div className="flex flex-wrap gap-2 p-2 bg-white/50 rounded-xl border border-gray-300">
              {formData.skillsArray.map((skill, idx)=>(
                <span key={idx} className="bg-purple-300 text-gray-900 px-3 py-1 rounded-full flex items-center gap-1 shadow">
                  {skill}
                  <button type="button" onClick={()=>{
                    const newSkills = formData.skillsArray.filter((s,i)=>i!==idx);
                    setFormData({...formData, skillsArray:newSkills});
                  }} className="ml-1 font-bold hover:text-red-500">&times;</button>
                </span>
              ))}
              <input
                type="text" value={formData.skillInput} onChange={(e)=>setFormData({...formData, skillInput:e.target.value})}
                onKeyDown={(e)=>{
                  if(e.key==="Enter" && formData.skillInput.trim()!==""){
                    e.preventDefault();
                    setFormData({
                      ...formData,
                      skillsArray:[...formData.skillsArray, formData.skillInput.trim()],
                      skillInput:""
                    });
                  }
                }}
                className="bg-transparent outline-none flex-1 p-2 placeholder-gray-400"
                placeholder="Add skills..."
              />
            </div>
          </div>

       
          {/* Category */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Select Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required
              className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300">
              <option value="" disabled>Select Category</option>
              {categories.map(cat=><option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Resume */}
          <label className="flex flex-col text-gray-700">
            Upload Resume
            <input type="file" name="resume" onChange={handleChange} className="mt-2 p-2 rounded-xl bg-white/50 border border-gray-300 text-gray-800" required />
          </label>

          {/* Past Participation */}
          <label className="flex items-center space-x-3 cursor-pointer text-gray-700">
            <input type="checkbox" name="pastParticipation" checked={formData.pastParticipation} onChange={handleChange} className="w-5 h-5 accent-purple-300" />
            <span>Past Participation</span>
          </label>

          <button type="submit" className="w-full py-4 bg-purple-300 hover:bg-purple-400 rounded-2xl font-bold text-gray-900 text-lg shadow transition">
            Find My Internships
          </button>
        </form>

        {/* Matches */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {!submitted ? (
            <div className="backdrop-blur-md bg-white/50 border border-white/30 rounded-3xl p-8 flex-1 flex flex-col items-center justify-center text-center text-gray-500 animate-pulse shadow">
              <h2 className="text-2xl font-bold mb-2 text-purple-700">🚀 Your Internship Journey Awaits!</h2>
              <p className="italic">"Every skill you master is a step closer to your dream career. Fill the form and let opportunities find you!"</p>
            </div>
          ) : (
            matchedInternships.map((intern, idx) => (
              <div key={idx} className="backdrop-blur-md bg-white/60 border border-white/30 rounded-2xl p-6 shadow transform hover:scale-105 transition duration-500">
                <h3 className="text-xl font-bold text-purple-700">{intern.title} <span className="text-purple-500">- {intern.company}</span></h3>
                <p className="mt-1 text-gray-800">Location: {intern.location}</p>
                <p className="text-gray-800">Skills: {intern.skills.join(", ")}</p>
                <div className="mt-2 w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-4 bg-purple-300 rounded-full transition-all duration-1000" style={{ width: `${intern.score}%` }}></div>
                </div>
                <p className="text-right mt-1 font-semibold text-gray-700">{intern.score}% Match</p>

                <div className="mt-4 flex gap-4">
                  <a href={intern.url} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2 bg-green-400 hover:bg-green-500 text-white rounded-xl text-center font-semibold transition">
                    View
                  </a>
                  <a href={intern.url} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-xl text-center font-semibold transition">
                    Apply
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p>© 2025 Bharat Internship. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Instagram</a>
          </div>
        </div>
      </footer>

    </div>
  );
}