const Sidebar = () => {
  return (
    <div className="h-screen border-2 border-blue-300 rounded flex flex-col gap-4">
      <div className="w-full flex items-center justify-center px-4 py-2 border-2 rounded-xl">
        LOGO
      </div>
      <div className="w-full flex-1 flex items-center justify-center px-4 py-2 border-2 rounded-xl">
        Chat History
      </div>
    </div>
  );
};

export default Sidebar;
