import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.REACT_APP_LIVEBLOCK_PUBLIC_API_KEY
  //   "pk_dev_e7AHYE_IXcKX20ZCwTwjuH3lx5DJCcw2HEj-a3amLmRWnsPjZJMvleYnhMR820Mi",
  // // publicApiKey: "pk_dev_uZqdsoIQA_2keqWocagbZuhwa8tJo0rbPle2uFJgcDABnl3MB9w4jhP7jejOT3xA",
});
// type Storage = {
//   // animals: LiveList<string>,
//   // ...
// };

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
} = createRoomContext(client);
