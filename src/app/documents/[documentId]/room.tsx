"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/fullscreenloader";
import { useOrganization } from "@clerk/nextjs";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const { organization, isLoaded } = useOrganization();
  const [orgMembers, setOrgMembers] = useState<User[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  useEffect(() => {
  if (!isLoaded || !organization) {
    setIsLoadingMembers(false);
    return;
  }

  setIsLoadingMembers(true);

  organization
    .getMemberships()
    .then((membershipsPage) => {
      const members = membershipsPage.data; // Array of OrganizationMembership

      const loadedMembers: User[] = members.map((m) => {
        const pud = m.publicUserData; // Can be null in rare cases

        return {
          id: pud?.userId ?? "unknown", // Fallback if somehow missing
          name:
            pud
              ? `${pud.firstName ?? ""} ${pud.lastName ?? ""}`.trim() ||
                pud.identifier ||
                "Unknown User"
              : "Unknown User",
          avatar: pud?.imageUrl ?? "/default-avatar.png", // Or your fallback
        };
      });

      setOrgMembers(loadedMembers);
    })
    .catch((e) => {
      console.error("Failed to load org members:", e);
      setOrgMembers([]);
    })
    .finally(() => setIsLoadingMembers(false));
}, [organization, isLoaded]);
  if (!isLoaded) {
    return <FullScreenLoader label="Loading organization..." />;
  }

  if (!organization) {
    // Optional: Handle no active org (e.g., personal account)
    return <div>Please select or create an organization to collaborate.</div>;
  }

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={async ({ userIds }) => {
        if (isLoadingMembers) {
          return userIds.map(() => undefined);
        }

        return userIds.map((userId) => {
          const member = orgMembers.find((m) => m.id === userId);
          return member ? { name: member.name, avatar: member.avatar } : undefined;
        });
      }}
      resolveMentionSuggestions={async ({ text }) => {
        if (isLoadingMembers) return [];

        const search = text?.toLowerCase() || "";
        return orgMembers
          .filter((m) => m.name.toLowerCase().includes(search))
          .map((m) => m.id);
      }}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Loading document..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}