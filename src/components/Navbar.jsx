"use client";
import Link from "next/link";
import { getRole, getCurrentStudent, logout } from "@/lib/auth";

export default function Navbar() {
  const role = getRole();
  const student = getCurrentStudent();

  return (
    <header className="border-b bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 grid place-items-center text-white font-bold">CP</div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">College Placement Portal</h1>
        </Link>
        <div className="flex items-center gap-3">
          {!role && <Link href="/login" className="btn">Login</Link>}
          {role && (
            <>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${role==="student" ? "bg-blue-100 text-blue-700":"bg-green-100 text-green-700"}`}>
                {role === "student" ? "Student" : "Faculty"}
              </span>
              {student && <span className="text-sm text-gray-600 hidden sm:block">{student.first_name} {student.last_name}</span>}
              <button onClick={() => { logout(); location.href = "/"; }} className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
