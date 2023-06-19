import React from "react";
import { Route, Routes } from "react-router-dom";

import Inventry from "./Inventry/Inventry";
import Single from "./Inventry/Single";

function All_route() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inventry />}></Route>

        <Route path="/singlePage" element={<Single />}></Route>
      </Routes>
    </div>
  );
}

export default All_route;
