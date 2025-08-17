// app/login/page.jsx
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("student");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        {role === "student" ? (
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Official College Email"
              className="w-full border rounded-md p-2"
            />
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <input
              type="password"
              placeholder="Faculty Key"
              className="w-full border rounded-md p-2"
            />
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
              Faculty Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
