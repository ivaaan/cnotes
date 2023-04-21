import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

const client = createClient({
  publicApiKey:
    'pk_dev_JMMIZJW_JvYGqfhcz5nQzLFQZjjGga3NpRheMFhXAU1fkky-rT3rRucTHWavILAW',
});

export const {
  suspense: {
    RoomProvider,
    useMutation,
    useOthers,
    useStorage,
    useMyPresence,
    useUpdateMyPresence,
    useMap,
  },
} = createRoomContext(client);
