import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1 className="my-12 text-4xl font-bold text-center text-orange-500 sm:text-5xl md:text-9xl">
        404
      </h1>

      <p className="font-semibold text-center">Oops! Resource Not Found</p>

      <Link
        to="/"
        className="block w-full max-w-xs px-12 py-3 mx-auto my-12 font-medium tracking-widest text-center text-white uppercase bg-orange-500 rounded-xl hover:bg-orange-400 active:shadow-none hover:shadow-lg hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300"
      >
        Home
      </Link>
    </div>
  );
};
export default NotFound;
