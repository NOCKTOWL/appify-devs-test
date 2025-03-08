import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

import Profile from "../components/Profile";

import { FaPlus, FaArrowRight } from "react-icons/fa6";
import { SiRobotframework } from "react-icons/si";

const LandingPage = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const navRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      duration: 1,
      y: 60,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(subtitleRef.current, {
      delay: 0.5,
      duration: 1,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(navRef.current, {
      duration: 1,
      y: -60,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(navRef.current.querySelectorAll("ul"), {
      delay: 0.8,
      gap: 20,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(buttonRef.current, {
      delay: 0.3,
      duration: 1,
      y: 60,
      opacity: 0,
      ease: "power3.out",
    });
  }, []);
  return (
    <>
      <Profile />
      <div className="absolute top-0 left-0 p-4 flex items-center gap-2">
        <SiRobotframework size={28} className="text-indigo-500" />
        <h1 className="text-2xl">Appify AI</h1>
      </div>
      <nav className="absolute top-0 w-full mx-auto p-4 z-[1]" ref={navRef}>
        <ul className="flex items-center justify-center gap-20 text-lg text-neutral-200 font-light">
          <li
            className=" transition-all duration-150 py-2 cursor-pointer"
            title="Dummy About Button"
            data-cursor-effects="true"
            data-cursor-blend
          >
            About
          </li>
          <li
            className=" transition-all duration-150  py-2 cursor-pointer"
            title="Dummy Pricing Button"
            data-cursor-effects="true"
            data-cursor-blend
          >
            Pricing
          </li>
          <li
            className=" transition-all duration-150  py-2 cursor-pointer"
            title="Dummy Contact Button"
            data-cursor-effects="true"
            data-cursor-blend
          >
            Contact
          </li>
        </ul>
      </nav>
      <div className="h-full flex flex-col gap-32 items-center justify-center">
        <div className="px-8 py-4 text-center">
          <h1
            className="text-3xl mb-4"
            data-cursor-effects="true"
            data-cursor-blend
          >
            Welcome to
          </h1>
          <h1
            className="text-8xl font-bold mb-8"
            data-cursor-effects="true"
            data-cursor-blend
            ref={titleRef}
          >
            Appify AI
          </h1>
          <p
            className="text-base font-light tracking-widest"
            ref={subtitleRef}
            data-cursor-effects="true"
            data-cursor-blend
          >
            Get started by creating a new chat
          </p>
        </div>
        <div
          id="buttonRef"
          className="flex gap-8 items-center text-2xl"
          ref={buttonRef}
        >
          <Link
            href="/chat"
            className="group flex items-center gap-2 px-4 py-2 border-1 rounded-lg cursor-pointer hover:border-indigo-500 transition-all duration-200"
          >
            New chat
            <FaPlus className="group-hover:text-indigo-500 transition-all duration-200" />
          </Link>
          <Link
            href="https://appifydevs.com"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-600 text-white transition-all duration-200"
          >
            Explore us
            <FaArrowRight className="-rotate-45" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
