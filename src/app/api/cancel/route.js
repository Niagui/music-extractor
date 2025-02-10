PORT = "tcp://localhost:5556"

const zmq = require("zeromq");

const cancelSocket = new zmq.Push();
cancelSocket.connect(PORT);

export async function POST(req)
{
    try {
        const cancelCommand = { command: "cancel" };
        await cancelSocket.send(JSON.stringify(cancelCommand));  // Send the cancel request
        console.log("Sent cancel request from cancel socket...");
        return new Response(JSON.stringify({ status: "canceled" }), { status: 200 });
    }catch(err){
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to send cancel request" }), { status: 400 });
    }
}