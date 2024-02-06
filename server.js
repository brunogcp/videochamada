const express = require('express');
const { ExpressPeerServer } = require('peer');
const app = express();
const server = require('http').createServer(app);

// Configuração do Peer Server
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.send('🎉 Servidor de Videochamada Rodando!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🌍 Servidor rodando na porta ${PORT}`));