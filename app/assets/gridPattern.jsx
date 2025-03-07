const GridPattern = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 h-full w-full object-cover z-[-1] mix-blend-screen opacity-20"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 30%, transparent 100%)",
        //   "radial-gradient(circle, transparent 0%, black 10%, transparent 80%)",
      }}
    >
      <defs>
        <pattern
          id="a"
          width="20"
          height="20"
          patternTransform="scale(2)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100%" height="100%" fill="#18181b" />
          <path fill="none" stroke="#615FFF" d="M10 0v20ZM0 10h20Z" />
        </pattern>
      </defs>
      <rect width="800%" height="800%" fill="url(#a)" />
    </svg>
  );
};

export default GridPattern;
