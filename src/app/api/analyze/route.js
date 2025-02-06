const multer = require("multer");
const zmq = require("zeromq");
const path = require("path");

const socket = new zmq.Request();
socket.connect("tcp://localhost:5555"); 


// youtube link
export async function POST(req) 
{
  const { fileType, file, extractAccompaniment } = await req.json();
  const pkg = JSON.stringify(
  {
    fileType,
    file,
    extractAccompaniment,
  })

  console.log(pkg)

  if (file) 
  {
    try 
    {
      await socket.send(pkg);
      const [response] = await socket.receive();
      const { mp3Files } = JSON.parse(response);
      return new Response(JSON.stringify({ mp3Files }), { status: 200 });

    }catch (err) {
      console.error("Error:", err);
      return new Response(JSON.stringify({ error: "something failed" }), { status: 400 });
    }
  }else{
    return new Response(JSON.stringify({ error: "no valid file" }), { status: 400 });
  }

};
