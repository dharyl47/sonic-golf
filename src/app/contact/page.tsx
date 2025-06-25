'use client';

import Header from '../../components/Header';

export default function ContactPage() {
  return (
    <>
      <Header transparent />
      <div className="min-h-screen p-6 bg-gray-400 text-gray-800">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-10 space-y-6">
          <h1 className="text-3xl font-bold text-center text-green-700">Contact Us</h1>

          <div className="space-y-4">
            {/* Address */}
            <div>
              <h2 className="text-lg font-semibold">Address</h2>
              <p className="text-gray-600">Davao City, Philippines</p>
            </div>

            {/* Phone */}
            <div>
              <h2 className="text-lg font-semibold">Mobile Number</h2>
              <p className="text-gray-600">0935 711 1153</p>
            </div>

            {/* Telephone */}
            <div>
              <h2 className="text-lg font-semibold">Telephone</h2>
              <p className="text-gray-600">(082) 221-4567</p>
            </div>
          </div>

          <div className="pt-6 border-t text-sm text-gray-500 text-center">
            We&apos;ll get back to you as soon as possible!
          </div>
        </div>
      </div>
    </>
  );
}
