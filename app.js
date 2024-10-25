const express = require("express")
const app = express()
const port = 3000

//routing
app.get("/", (req, res) => {
    res.send("Halo Prabowo!")
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
})