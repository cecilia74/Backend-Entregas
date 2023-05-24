const socket = io();
socket.emitt("msg_fornt_back",{
msg: "hellooo",
user: "usuario anonimo"
});