import React, { useState } from "react";
import Home from "./pages/Home";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import MatchEngine from "./pages/MatchEngine";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // home, register, find

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === "register" && <StudentRegisterPage setCurrentPage={setCurrentPage} />}
      {currentPage === "find" && <MatchEngine />}
    </div>
  );
}

export default App;
