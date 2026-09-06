const CustomerSay = () => {
  const reviews = [
    {
      id: 1,
      name: "Aayush Sharma",
      message:
        "Really happy with the product quality. The delivery was also fast and smooth.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sujan Thapa",
      message:
        "The website is easy to use and the product arrived exactly as shown. Loved it!",
      rating: 4,
    },
    {
      id: 3,
      name: "Prabin Karki",
      message:
        "Good products, reasonable prices and quick delivery. Will definitely shop again.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Customer Reviews
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 mt-3">
            See what our customers have to say about their shopping experience.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= review.rating
                        ? "text-yellow-400 text-lg"
                        : "text-gray-300 text-lg"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{review.message}"
              </p>

              {/* Customer */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-semibold text-blue-600">
                    {review.name.charAt(0)}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerSay;