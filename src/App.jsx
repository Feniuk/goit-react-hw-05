import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Suspense, lazy } from "react";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

function App() {
  return (
    <>
      <div>
        <Navigation />
        <Suspense fallback={<div>...LOADING PAGE...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
