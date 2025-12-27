"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
  const client = await clerkClient();

  const list = await client.users.getUserList({
    limit: 100,
  });

  return list.data.map((u) => ({
    id: u.id,
    name:
      u.fullName ||
      [u.firstName, u.lastName].filter(Boolean).join(" ") ||
      u.primaryEmailAddress?.emailAddress ||
      "Anonymous",
    avatar: u.imageUrl,
  }));
}
