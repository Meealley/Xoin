import React from "react";
import { useRouteError } from "react-router-dom";

const Errorpage = () => {
  const error = useRouteError();
  return (
    <>
      <div className="mx-auto justify-center items-center mt-20 top-0 left-0">
        <h3>Oops... something went wrong</h3>
        <p>{error.message}</p>
      </div>
    </>
  );
};

export default Errorpage;
