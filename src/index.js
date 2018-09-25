import React, { Component } from "react";
import { render } from "react-dom";
import Gallery from "./components/Gallery";

import "./index.css";
// GOAL: Create a React Gallery App with 1 large active image, and inactive thumb images below where you can change the active image
// INSTRUCTIONS:
// 0. Fork this repo to a new project
// 1. Make a call to the giphy API and pull in a list of random images (API url: https://api.giphy.com/v1/gifs/trending?api_key=PEyIrGaWdf08Lw4nezyXejpD9Y0pO6Rt)
// 1.1 You can read up on the api over here https://developers.giphy.com/docs/
// 2. Set the active image in the state of the Gallery component
// 3. Create a list of inactive images using the GalleryThumb Component
// 4. Add an automatic timer that changes the active images after 3 seconds
// 5. On click of each GalleryThumb, update the active image
// 6. Add a remove button on the GalleryThumb that deletes images when clicked
// 7. Add a slick animation to transition between active images (that's more complex then just opacity)
// 8. Add any extra styling & behaviour to make it look polished

// 0 Done
// 1 Done
// 2 Done
// 3 Done
// 4 Done
// 5 Done
// 6 Done
// 7 Done
// 8 Done

render(<Gallery />, document.getElementById("root"));
