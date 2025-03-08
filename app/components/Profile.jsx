import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

const Profile = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  return (
    <div className="absolute top-0 right-0 p-4 z-[2]">
      {!loggedIn && (
        <div className="flex gap-4">
          <button
            className="border-1 rounded-lg px-4 py-2 cursor-pointer hover:border-indigo-500 transition-all duration-150"
            onClick={() => setLoggedIn(true)}
          >
            Log In
          </button>
          <button
            className="bg-neutral-300 rounded-lg px-4 py-2 cursor-pointer text-zinc-800 hover:inset-shadow-sm hover:inset-shadow-indigo-500 transition-all duration-300"
            title="Dummy Sign Up Button"
          >
            Sign Up
          </button>
        </div>
      )}
      {loggedIn && (
        <div
          className="bg-neutral-700 p-3 rounded-full ring-indigo-500 hover:ring-2 cursor-pointer transition-all duration-150"
          onClick={() => setProfileDropdown(!profileDropdown)}
        >
          <FaRegUser size={24} />
        </div>
      )}
      {profileDropdown && (
        <div className="absolute right-0 bg-neutral-800 p-4 mt-2 mr-4 rounded-lg">
          <ul className="flex flex-col text-right gap-2 cursor-pointer">
            {/* <li className="hover:bg-neutral-700 p-2 rounded-lg transition-all duration-150">
          Profile
        </li> */}
            <li
              className="flex items-center justify-between gap-4 hover:bg-neutral-700 p-2 rounded-lg transition-all duration-150"
              title="Dummy Settings Button"
            >
              <IoSettingsOutline size={24} />
              Settings
            </li>
            <li
              className="flex items-center justify-between gap-4 text-red-400 hover:bg-neutral-700 p-2 rounded-lg transition-all duration-150"
              onClick={() => (setLoggedIn(false), setProfileDropdown(false))}
            >
              <IoLogOutOutline size={24} />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
