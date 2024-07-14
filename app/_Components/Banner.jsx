import React from "react";

const Banner = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Effortlessly Manage Your Customers{" "}
            <strong className="font-extrabold text-gray-700 sm:block">
              {" "}
              and Transactions{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Retrieve and Analyze Customer Transactions with Ease , Transforming
            Data Management: Retrieve and Display Customer Transactions
            Effortlessly
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-gray-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium shadow hover:text-gray-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
