<div align="center">
  <h3 align="center">Videochamada</h3>
  <div>
  <a href="https://bgcp.com.br/article/0159af3d-70ee-4c0a-80d8-316ff1e7d66a">
  <img src="https://img.shields.io/badge/Download PDF (ENGLISH)-black?style=for-the-badge&logoColor=white&color=000000" alt="three.js" />
  </a>
  </div>
</div>

## 🚀 Introdução à Videochamada com Node.js

A videochamada tornou-se uma ferramenta essencial para comunicação pessoal e profissional, permitindo que pessoas se conectem visual e auditivamente de qualquer parte do mundo. Utilizando Node.js e a biblioteca PeerJS, você pode criar uma aplicação de videochamada robusta e eficiente.

### 🌟 Principais Características:

- **🎥 Chamada de Vídeo em Tempo Real**: Conecte-se visualmente com qualquer pessoa online.
- **🔊 Áudio Claro**: Comunicação auditiva integrada para uma experiência completa.
- **👥 Multiusuários**: Suporte para múltiplos participantes numa única chamada.
- **🔒 Privacidade e Segurança**: Garanta a segurança das comunicações com criptografia.

## 🛠️ Instalação

Este tutorial focará no uso de Node.js, Express e PeerJS.

### Passos para Instalação:

1. **Configuração do Projeto**:
   - Inicie um novo projeto Node.js: `npm init -y`.
   
2. **Instalar Dependências**:
   - Instale o Express e Peer: `npm install express peer`.

3. **Instalar o PeerJS Globalmente** (opcional):
   - Para testar localmente, você pode querer instalar o PeerJS globalmente: `npm install -g peer`.

## 📊 Uso Básico

### Configuração Inicial:

1. **Configurar o Servidor Express**:
   - Crie um arquivo `server.js` para iniciar um servidor Express básico.
   
2. **Integrar PeerJS**:
   - Utilize o PeerJS para gerenciar as conexões de videochamada.

### Criando uma Aplicação de Videochamada:

1. **server.js**: Configuração do Servidor e Peer Server.

```javascript
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
```

2. **Frontend**:
   - Crie uma interface simples com HTML/CSS para iniciar e receber chamadas.
   
3. **Conexão Peer**:
   - Utilize o PeerJS no cliente para conectar os usuários através do ID único.

## 🚀 Parte 1: Configuração do Backend

### 🛠️ Instalação e Configuração

1. **Crie uma pasta para o projeto** e inicialize um novo projeto Node.js:
   ```bash
   mkdir videochamada-app
   cd videochamada-app
   npm init -y
   ```

2. **Instale as dependências necessárias**:
   ```bash
   npm install express peer socket.io
   ```

3. **Crie um arquivo `server.js`** na raiz do projeto com o seguinte código para configurar o servidor Express e o Peer Server:

```javascript
const http = require('http');
const express = require('express');
const app = express();

const { ExpressPeerServer } = require('peer');

// use express static to deliver resources HTML, CSS, JS, etc)
// from the public folder
app.use(express.static('public'));

const server = http.createServer({}, app)

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
  perMessageDeflate: false,
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('call-user', (data) => {
        console.log(`call-user event from ${data.callerID} to ${data.userID}`);
        socket.to(data.userID).emit('call-made', {
            offer: data.offer,
            callerID: data.callerID
        });
    });

    socket.on('make-answer', data => {
        console.log(`make-answer event from ${data.calleeID} to ${data.callerID}`);
        socket.to(data.callerID).emit('answer-made', {
            answer: data.answer,
            calleeID: data.calleeID
        });
    });

    socket.on('reject-call', data => {
        console.log(`reject-call event from ${data.calleeID} to ${data.callerID}`);
        socket.to(data.callerID).emit('call-rejected', {
            calleeID: data.calleeID
        });
    });

    socket.on('user-connected', (userID) => {
        console.log(`user-connected event for ${userID}`);
        socket.broadcast.emit('user-connected', userID);
    });

    socket.on('user-disconnected', (userID) => {
        console.log(`user-disconnected event for ${userID}`);
        socket.broadcast.emit('user-disconnected', userID);
    });
});

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peerjs', peerServer);
app.get('/', (req, res, next) => res.redirect('/index.html'));
server.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
```


4. **Create the frontend file**: `indx.html`
   ```html
 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Chat</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" />

    <!-- Peer.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.4.7/peerjs.min.js"
        integrity="sha512-y23HV23IWVEWlGpIez8Kvr87ZT16V9gICf5dfqu5rjxs7ip66pcIf87/uFbxn9tStGCgohZeIktIAHg9fjubsw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>


    <!-- Socket.io -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.1/socket.io.js"
        integrity="sha512-xbQU0+iHqhVt7VIXi6vBJKPh3IQBF5B84sSHdjKiSccyX/1ZI7Vnkt2/8y8uruj63/DVmCxfUNohPNruthTEQA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- Custom CSS -->
    <style>
        /* Set width of video elements */
        video {
            width: 100%;
        }

        /* Set height of video elements based on screen size */
        @media (max-width: 767.98px) {
            video {
                height: 40vw;
            }
        }

        @media (min-width: 768px) {
            video {
                height: 50vh;
            }
        }

        /* Set margin of call and hangup buttons */
        #callButton,
        #hangupButton {
            margin-top: 10px;
        }
    </style>

</head>

<body>
    <div class="container mt-3">
        <h1 class="text-center">Video Chat</h1>
        <div id="myId"></div>

        <div class="row mt-3">
            <div class="col-md-6">
                <h2>Your Video</h2>
                <video id="localVideo" autoplay playsinline muted></video>
            </div>

            <div class="col-md-6">
                <h2>Remote Video</h2>
                <video id="remoteVideo" autoplay playsinline></video>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-12 text-center">
                <button id="callButton" class="btn btn-success">Call</button>
                <button id="hangupButton" class="btn btn-danger" disabled>Hang Up</button>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

    <!-- Bootstrap JS -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <!-- WebRTC Adapter -->
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

    <!-- JavaScript -->
    <script>
        // Get video elements
        const localVideo = document.getElementById("localVideo");
        const remoteVideo = document.getElementById("remoteVideo");
        // Initialize Peer object
        const peer = new Peer();

        // Initialize socket.io object
        const socket = io();
        peer.on('open', (id) => {
            const myId = document.getElementById('myId');
            localPeerId = id;
            myId.innerText = `My ID: ${id}`;

        });


        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            // Add stream to local video element
            localVideo.srcObject = stream;

            // Save stream to variable for later use
            localStream = stream;

            // Listen for incoming call
            peer.on("call", (call) => {
                // Answer call
                call.answer(localStream);

                // Add stream to remote video element
                call.on("stream", (remoteStream) => {
                    remoteVideo.srcObject = remoteStream;
                });

                // Enable hangup button
                document.getElementById("hangupButton").disabled = false;
            });

            // Add event listener for call button
            document.getElementById("callButton").addEventListener("click", () => {
                // Get ID of remote peer
                const remotePeerID = prompt("Enter ID of remote peer:");

                // Call remote peer
                const call = peer.call(remotePeerID, localStream);

                // Add stream to remote video element
                call.on("stream", (remoteStream) => {
                    remoteVideo.srcObject = remoteStream;
                });

                // Add event listener for hangup button
                document.getElementById("hangupButton").addEventListener("click", () => {
                    // End call
                    call.close();

                    // Disable hangup button
                    document.getElementById("hangupButton").disabled = true;
                });


                // Enable hangup button
                document.getElementById("hangupButton").disabled = false;
            });

        }).catch((error) => {
            console.log(error);
        });

    </script>
</body>

</html>
   ```

5. **Run the server**:
   ```bash
   node server.js
   ```

## 🏆 Conclusão

Neste tutorial, você aprendeu como criar uma aplicação básica de videochamada usando Node.js e PeerJS. Essa tecnologia permite comunicações em tempo real, abrindo portas para reuniões virtuais, aulas online e muito mais.

Espero que este guia inspire você a construir suas próprias soluções de comunicação. O mundo da programação está cheio de possibilidades – continue explorando e criando! 🚀👩‍💻