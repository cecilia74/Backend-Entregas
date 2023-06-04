const socket = io();

const chatBox = document.getElementById("input-msg");
let userName = "";

async function main() {
    const { value: nombre } = await Swal.fire({
        title: "Enter your name",
        input: "text",
        inputLabel: "Your name",
        inputValue: "",
        showCancelButton: false,
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return "You need to write something!";
            }
        },
    });
    userName = nombre;
}
    main();

chatBox.addEventListener("keyup", ({ key }) => {

    if (key == "Enter") {
        socket.emit("msg_front_to_back", {
            msg: chatBox.value,
            user: userName,
        });
        chatBox.value = "";
    }
});

socket.on("listado_de_msgs", (msgs) => {
    // console.log(msgs)
    const divMsg = document.getElementById("div-msgs");
    let format = "";

        msgs.forEach((msg) => {
            format = format + "<p>user " + msg.user + ": " + msg.msg + "</p>"

        })
        divMsg.innerHTML = format;

    })

