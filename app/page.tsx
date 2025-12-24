import LoginButton from "./components/LoginButton";
import SavedTracks from "./components/SavedTracks";
import TopTracks from "./components/TopTracks";

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Spotify Dashboard</h1>

      <LoginButton />

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Top Tracks</h2>
        <TopTracks />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Saved Tracks</h2>
        <SavedTracks />
      </section>
    </main>
  );
}
