"use client";
import { useState } from "react";

export default function OwnerMenu() {
  const [show, setShow] = useState(false);

  // List akun/fitur dummy, bisa disambung ke database nanti
  const users = [
    { name: "ReyyZhouuZi", email: "ryyxiaoyan@gmail.com" },
    { name: "ReyyDeveloperUiFx", email: "youkaze1@gmail.com" }
  ];

  return (
    <div className="border p-4 rounded bg-gray-800 text-white mt-4">
      <button
        className="px-2 py-1 bg-green-600 rounded"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide Owner Menu" : "Show Owner Menu"}
      </button>

      {show && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Registered Users:</h3>
          <ul className="list-disc pl-5">
            {users.map((u) => (
              <li key={u.email}>
                {u.name} - {u.email}
              </li>
            ))}
          </ul>

          <button
            className="mt-4 px-2 py-1 bg-red-600 rounded"
            onClick={() => alert("Reset session feature coming soon!")}
          >
            Reset All Sessions
          </button>
        </div>
      )}
    </div>
  );
}
