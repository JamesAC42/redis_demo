export const handleConnection = (socket:any) => {
    
    const address = socket.handshake.headers['x-forwarded-for'];
    console.log(`User connected. Address: ${address}`);
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
}