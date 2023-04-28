import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

const client = createClient({
  publicApiKey:
    'pk_dev_e7AHYE_IXcKX20ZCwTwjuH3lx5DJCcw2HEj-a3amLmRWnsPjZJMvleYnhMR820Mi',
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
