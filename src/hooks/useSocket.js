import { useEffect, useState, useContext } from 'react';

import { SocketContext } from 'utils';

function useSocket() {

    const socket = useContext(SocketContext);
    const [connected, setConnected] = useState(socket.connected);

    useEffect(() => {
        if (!connected && socket.connected) {
            setConnected(true);
            return;
        }

        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);

        if (connected) {
            socket.once('disconnect', onDisconnect);
            return () => socket.off('disconnect', onDisconnect);
        }
        else {
            socket.once('connect', onConnect);
            return () => socket.off('connect', onConnect);
        }
    }, [connected, socket]);

    return [socket, connected];
}

export default useSocket;
