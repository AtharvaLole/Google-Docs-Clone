// components/OrgActiveSetter.tsx
"use client";

import { useEffect } from "react";
import { useOrganizationList, useAuth } from "@clerk/nextjs";

export function OrgActiveSetter() {
  const { userId } = useAuth();

  // ← CRITICAL: Add { userMemberships: true }
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: true,
  });

  useEffect(() => {
    if (!isLoaded || !userId) return;

    if (userMemberships.data?.length > 0) {
      const firstOrg = userMemberships.data[0].organization;
      setActive({ organization: firstOrg.id });
      console.log("Auto-activated organization:", firstOrg.name, "(ID:", firstOrg.id, ")");
    }
  }, [isLoaded, userId, userMemberships.data, setActive]);

  return null;
}