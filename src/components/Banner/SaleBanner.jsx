import { useState, useEffect } from "react";

const SaleBanner = () => {
  // Set a fixed end date (Change this to your real sale end date)
  const SALE_END_DATE = new Date("2025-09-15T23:59:59").getTime();

  const calculateTimeLeft = () => {
    const difference = SALE_END_DATE - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* Left Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Summer Sale
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Up to 50% off on selected items. Limited time offer.
            </p>

            {/* Countdown */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 rounded-lg p-4 text-center min-w-[70px]"
                >
                  <span className="block text-3xl font-bold">
                    {formatNumber(item.value)}
                  </span>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>

            <a
              href="/sale"
              className="inline-block py-3 px-8 bg-white text-gray-900 font-medium rounded-button hover:bg-gray-100 transition-colors"
            >
              Shop the Sale
            </a>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2">
            <img
              src="https://readdy.ai/api/search-image?query=stylish%20summer%20clothing%20collection%20with%20discount%20tags%2C%20professional%20fashion%20photography%2C%20multiple%20items%20arranged%20elegantly%2C%20high-end%20apparel%20on%20minimal%20background&width=600&height=400&seq=sale1&orientation=landscape"
              alt="Summer Sale"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;