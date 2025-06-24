// src/app/page.tsx

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🏌️‍♂️ Sonic Golf</h1>
      <p className="text-lg mb-6">Your live golf event scoring web app.</p>
      <div className="flex flex-col gap-4 items-center">
        <a
          href="/player/scorecard"
          className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
        >
          Go to Player Scorecard
        </a>
        <a
          href="/leaderboard"
          className="bg-gray-200 px-6 py-3 rounded hover:bg-gray-300 transition"
        >
          View Leaderboard
        </a>
      </div>
    </main>
  );
}
