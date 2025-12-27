import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId, orgId } = await auth(); // ✅ use orgId from auth()
    if (!userId) {
      return new Response("Unauthorized: No session", { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized: No user", { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const room = body?.room;

    if (!room || typeof room !== "string") {
      return new Response("Bad Request: Missing or invalid room", { status: 400 });
    }

    const documentId = room as Id<"documents">;
    const document = await fetchQuery(api.documents.getById, { id: documentId });

    // DEBUG
    console.log("=== LIVEBLOCKS AUTH DEBUG ===");
    console.log("userId:", userId);
    console.log("orgId:", orgId);
    console.log("room:", room);

    let hasAccess = false;

    if (document) {
      const isOwner = document.ownerId === userId; // ✅ compare to userId
      const isOrgMember =
        !!document.organizationId && !!orgId && document.organizationId === orgId; // ✅ orgId

      hasAccess = isOwner || isOrgMember;

      console.log("Document ownerId:", document.ownerId);
      console.log("Document organizationId:", document.organizationId);
      console.log("isOwner:", isOwner);
      console.log("isOrgMember:", isOrgMember);
      console.log("hasAccess:", hasAccess);
    } else {
      // your choice: allow creator / or deny
      hasAccess = true;
    }

    if (!hasAccess) {
      return new Response("Forbidden", { status: 403 });
    }

    const session = liveblocks.prepareSession(userId, {
      userInfo: {
        name:user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar:user.imageUrl
      },
    });

    session.allow(room, session.FULL_ACCESS);

    const { body: lbBody, status } = await session.authorize();

    return new Response(lbBody, {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Liveblocks auth endpoint error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
