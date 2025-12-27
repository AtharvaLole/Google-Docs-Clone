// liveblocks.config.ts (or liveblocks.types.ts)

declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example: real-time cursor
      // cursor: { x: number; y: number } | null;
    };

    // The Storage tree for the room
    Storage: {
      // Example: collaborative data
      // animals: LiveList<string>;
    };

    // IMPORTANT: This is what fixes your type error
    UserMeta: {
      id: string; // The userId (matches what you set in auth)
      info: {
        name: string;
        avatar: string;
        // Add any other fields you want here (e.g., color: string)
      };
    };

    // Custom broadcast events
    RoomEvent: {
      // Example:
      // | { type: "REACTION"; emoji: string };
    };

    // Metadata on threads (e.g., for comments positioning)
    ThreadMetadata: {
      // Example:
      // x: number;
      // y: number;
    };

    // Custom room info (for resolveRoomsInfo if you use it)
    RoomInfo: {
      // Example:
      // title: string;
      // url: string;
    };
  }
}

export {};