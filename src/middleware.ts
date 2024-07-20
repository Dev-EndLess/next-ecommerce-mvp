import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export async function middleware(Request: NextRequest) {
  if ((await isAuthenticated(Request)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic",
        "Cache-Control": "no-store, no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
}

async function isAuthenticated(Request: NextRequest) {
  const authHeader =
    Request.headers.get("Authorization") ||
    Request.headers.get("authorization");

  if (authHeader === null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}

export const config = {
  matcher: "/admin/:path*",
};
