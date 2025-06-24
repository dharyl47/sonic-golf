import EventBanner from "../../../components/EventBanner";
import ScoreCard from "../../../components/ScoreCard";

export default function PlayerScorecardPage() {
  const holes = Array.from({ length: 18 }, (_, i) => ({
    holeNumber: i + 1,
    par: i < 4 ? 3 : i < 14 ? 4 : 5,
  }));

  return (
    <div className="flex flex-col items-center">
      <EventBanner />
      <main className="container">
        <ScoreCard holes={holes} />
      </main>
    </div>
  );
}
