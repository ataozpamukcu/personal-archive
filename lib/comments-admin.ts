import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const adminCookieName = "comments_admin";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function getAdminPassword() {
  return process.env.COMMENTS_ADMIN_PASSWORD ?? "";
}

export function verifyCommentsAdminPassword(candidate: string) {
  const password = getAdminPassword();
  return password.length > 0 && safeEqual(hash(candidate), hash(password));
}

export async function isCommentsAdmin() {
  const password = getAdminPassword();
  const cookieValue = (await cookies()).get(adminCookieName)?.value ?? "";

  return (
    password.length > 0 &&
    cookieValue.length > 0 &&
    safeEqual(cookieValue, hash(password))
  );
}

export async function setCommentsAdminCookie() {
  const password = getAdminPassword();
  if (!password) throw new Error("COMMENTS_ADMIN_PASSWORD must be configured.");

  (await cookies()).set(adminCookieName, hash(password), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin/comments",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearCommentsAdminCookie() {
  (await cookies()).delete(adminCookieName);
}
