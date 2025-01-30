import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import OptimizedIndex from "@/pages/OptimizedIndex";
import NotFound from "@/pages/NotFound";
import Experience3D from "@/pages/Experience3D";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/optimized" element={<OptimizedIndex />} />
        <Route path="/3d-experience" element={<Experience3D />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;