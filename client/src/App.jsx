import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";
// Import pages
import NotFound from "./components/NotFound";
import Blog from "./pages/Blog";
import BlogPage from "./pages/BlogPage";
import AddPost from "./pages/AddPost";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <div className="main">

          <Routes>
        <Route exact path="/" element={<Blog />} />
        <Route exact path="/addPost" element={<AddPost />} />
        <Route exact path="/blog/page/:id" element={<BlogPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
