import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);

  const ownerEmail = "your-owner-email@gmail.com";
  if (!session?.user?.email || session.user.email !== ownerEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // TODO: implement real session reset
  // Jika pakai database/session store, hapus semua session di sini
  return NextResponse.json({ message: "All sessions reset (simulated)" });
}
