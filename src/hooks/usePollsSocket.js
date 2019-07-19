import { useEffect } from 'react';

import { useSocket } from 'hooks';

function usePollsSocket(room, handler) {
    const [socket, connected] = useSocket();

    useEffect(() => {
        if (connected) {
            socket.emit('room', room);
            socket.on('message', handler);
            return () => {
                socket.emit('leave', room);
                socket.off('message', handler);
            };
        }

    }, [connected, socket, room, handler]);
}

export default usePollsSocket;
