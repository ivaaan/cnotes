import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

if (!process.env.REACT_APP_LIVEBLOCK_PUBLIC_API_KEY) {
  throw new Error(
    "REACT_APP_LIVEBLOCK_PUBLIC_API_KEY must be defined in your environment variables."
  );
}

const client = createClient({
  publicApiKey: process.env.REACT_APP_LIVEBLOCK_PUBLIC_API_KEY,
});


type Storage = {
  drawing: LiveList<any>;
  todos: LiveList<any>;
  agendaItems: LiveList<any> | undefined;
  shapes: LiveMap<any, any>;
};


type Presence = {
  cursor: { x: number; y: number } | null;
  isTyping: any;

};

export const {
  suspense: {
    RoomProvider,
    useMutation,
    useOthers,
    useStorage,
    useMyPresence,
    useUpdateMyPresence,
    useMap,
    useHistory,
    useBatch,
    useRoom,
    useSelf,
    useOthersMapped,
    useCanUndo,
    useCanRedo,
  },
} = createRoomContext<Presence, Storage>(client);
