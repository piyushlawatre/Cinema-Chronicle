import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./starRating.jsx";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <>
      <StarRating
        maxRating={10}
        color="blue"
        size={28}
        onSetRating={setMovieRating}
      />
      <p>The rating is {movieRating}</p>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating />
    <>
      <Test />
      <StarRating maxRating={6} color="red" size={18} />
    </> */}
  </StrictMode>
);
