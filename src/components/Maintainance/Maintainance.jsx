const Maintenance = () => {


const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center px-4">

      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Maintenance"
        className="mb-8 h-40"
      />

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 dark:text-white mb-4">
        Site is under maintenance
      </h1>

      <p className="text-center text-gray-500 dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl">
        We're working hard to improve the user experience. Stay tuned!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">

        {/* Contact Us */}
        <button
          onClick={() => window.location.href = "mailto:ishannojhaa@gmail.com"}
          className="
            bg-gray-800
            hover:bg-gray-700
            text-white
            font-bold
            py-3
            px-6
            rounded
            transition
          "
        >
          Contact Us
        </button>

        {/* Reload */}
        <button
          onClick={handleReload}
          className="
            border-2
            border-gray-800
            text-black
            font-bold
            py-3
            px-6
            rounded
            hover:bg-gray-800
            hover:text-white
            transition
            dark:text-white
            dark:border-white
            dark:hover:bg-white
            dark:hover:text-gray-800
          "
        >
          Reload
        </button>

      </div>
    </div>
  );
};

export default Maintenance;
