'use client';

import Header from '../../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen p-6 bg-gray-400 text-gray-800">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-10 space-y-6">
          <h1 className="text-3xl font-bold text-center text-green-700">About Us</h1>

          <p className="text-gray-700 text-base leading-relaxed">
            <strong>Sonic Golf</strong> is a modern golf scoring web application designed
            to provide real-time match tracking, leaderboards, and seamless user experience
            for golf enthusiasts and tournament organizers. Our goal is to bring simplicity,
            accuracy, and elegance to every swing, putt, and score.
          </p>

          <p className="text-gray-700 text-base leading-relaxed">
            Whether you&apos;re playing solo, with a team, or managing an event, Sonic Golf ensures
            you stay on top of every stroke and every leaderboard. Built with performance,
            usability, and aesthetics in mind — it’s golf, modernized.
          </p>

          <div className="pt-4 border-t text-center text-sm text-gray-500">
            App Version: <strong>1.0</strong>
          </div>
        </div>
      </div>
    </>
  );
}
