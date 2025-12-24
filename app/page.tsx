import LoginButton from "./components/LoginButton";
import SavedTracks from "./components/SavedTracks";
import TopTracks from "./components/TopTracks";
import OwnerMenu from "./components/OwnerMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark text-white">
      <Header />

      <div className="p-4 max-w-4xl mx-auto">
        <LoginButton />

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Top Tracks</h2>
          <TopTracks />
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Saved Tracks</h2>
          <SavedTracks />
        </section>

        {/* Owner/Admin Menu */}
        <OwnerMenu />
      </div>

      <Footer />
    </main>
  );
}
