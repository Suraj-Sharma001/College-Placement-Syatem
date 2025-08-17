import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-4xl font-bold mb-3">College Placement Portal</h2>
        <p className="text-gray-600 mb-8">Your gateway to a successful career.</p>
        <div className="flex gap-4 justify-center">
          <Link className="btn" href="/login">Get Started</Link>
        </div>
      </div>
    </>
  );
}
