PORT = "tcp://localhost:5555"

const multer = require("multer"); //for file upload
const zmq = require("zeromq");

const socket = new zmq.Request();
socket.connect(PORT); 

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

      const [ response ] = await socket.receive();
      const responseStr = response.toString();
      console.log(responseStr)
      const { status, audioFiles } = JSON.parse(responseStr);

      if(status == "canceled")
      {
        console.log("Communication socket received cancelation: aborting...");
        return new Response(JSON.stringify({ audioFiles }), { status: 201 });
      }else{
        console.log("received ", audioFiles, " and is now passing it down...");
        return new Response(JSON.stringify({ audioFiles }), { status: 200 });
      }

    }catch (err) {
      console.error("Error:", err);
      return new Response(JSON.stringify({ error: "something failed" }), { status: 400 });
    }
  }else{
    return new Response(JSON.stringify({ error: "no valid file" }), { status: 400 });
  }
};
