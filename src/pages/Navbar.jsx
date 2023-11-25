import React from "react";

const Navbar = ({ openForm }) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <div>
          <a href="/" className="text-white text-lg font-bold">
            Home
          </a>
        </div>
        <div>
          <button
            onClick={openForm}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
