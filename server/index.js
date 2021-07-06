const express = require("express");
const cors = require("cors");
const ctrl = require('./controller');
const { getHouses } = require("./controller");

const app = express();

app.use(express.json());
app.use(cors());

const port = 4004;

//endpoints
app.get("/api/houses", ctrl.getHouses);
app.delete("/api/houses/:id", ctrl.deleteHouse);
app.post("/api/houses", ctrl.createHouse);
app.put("/api/houses/:id", ctrl.updateHouse);

app.listen(port, ()=>{ console.log(`Server running on port ${port}.`);
});