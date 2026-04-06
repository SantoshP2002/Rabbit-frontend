const ProgressLoader = ({ content = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 gap-6">
      <div className="orbit-loader">
        <div className="center-dot"></div>
        <div className="orbit orbit1"></div>
        <div className="orbit orbit2"></div>
      </div>

      <p className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
        {content}
      </p>
    </div>
  );
};

export default ProgressLoader;
