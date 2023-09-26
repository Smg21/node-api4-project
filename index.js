require("dotenv").config();

server = require("./server");

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})