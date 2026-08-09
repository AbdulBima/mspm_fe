"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-12 lg:flex lg:items-center lg:gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <p className="text-sm font-semibold text-orange-500">404 Error</p>
          <h1 className="mt-3 text-3xl font-bold text-black md:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Oops! The page you are looking for doesn&apos;t exist. Try one of the options below.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center mt-6 gap-4">
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-200 sm:w-auto"
            >
              Take Me Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
              Go Back
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
    <span className="text-6xl font-semibold flex tracking-wide text-gray-900">
            Thaevion
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#d35400"
                  d="M8.824 9.618a5.294 5.294 0 0 1 5.294-5.295V3.265a6.353 6.353 0 0 0-6.353 6.353zm5.294-3.706a3.706 3.706 0 0 0-3.706 3.706h-1.06a4.765 4.765 0 0 1 4.766-4.765zm0 1.588A2.12 2.12 0 0 0 12 9.618h-1.059a3.177 3.177 0 0 1 3.177-3.177zm-4.765 7.412a5.294 5.294 0 0 1-5.294-5.294H3a6.353 6.353 0 0 0 6.353 6.352zM5.647 9.618a3.706 3.706 0 0 0 3.706 3.705v1.06a4.765 4.765 0 0 1-4.765-4.765zm1.588 0a2.12 2.12 0 0 0 2.118 2.117v1.059a3.177 3.177 0 0 1-3.177-3.176zm7.412-.53a5.294 5.294 0 0 1 5.294 5.294H21a6.353 6.353 0 0 0-6.353-6.353zm3.706 5.294a3.706 3.706 0 0 0-3.706-3.706V9.618a4.765 4.765 0 0 1 4.765 4.764zm-1.588 0a2.12 2.12 0 0 0-2.118-2.117v-1.06a3.177 3.177 0 0 1 3.176 3.177zm-5.295 0A2.12 2.12 0 0 1 9.354 16.5v1.059a3.176 3.176 0 0 0 3.177-3.177zm1.589 0a3.706 3.706 0 0 1-3.706 3.706v1.059a4.765 4.765 0 0 0 4.765-4.765zm-3.706 5.294a5.294 5.294 0 0 0 5.294-5.294h1.059a6.353 6.353 0 0 1-6.353 6.353z"
                />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
