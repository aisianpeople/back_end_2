const houses = require('./db.json');

let houseID = 4;

const findTheIndex = (id) => {
    const index = houses.findIndex((house) => {
      return house.id === +id;
    });
    return index;
};

module.exports = {
    getHouses: (req, res)=>{
        res.status(200).send(houses);
    },
    
    deleteHouse: (req, res)=>{
        const { id } = req.params;

        const index = findTheIndex(id);

        if(id === -1){
            res.status(400).send({error: 'There is no such id.'});
        } else {
            houses.splice(index, 1);
            res.status(200).send(houses);
        }
    },
    
    createHouse: (req, res)=>{
        const { address, price, imageURL } = req.body;

        const newHouse = { id: houseID, address, price, imageURL };

        houses.push(newHouse);
        houseID++;

        res.status(200).send(houses);
    },
    
    updateHouse: (req, res)=>{
        const { id } = req.params;
        const { type } = req.body;

        const index = findTheIndex(id);

        const specificHouse = houses[index]

        if(index !== -1 && type === 'plus'){
            specificHouse.price += 10000;
            res.status(200).send(houses);
        } else if (index !== -1 && type === 'minus' && specificHouse.price > 10000){
            specificHouse.price -= 10000;
            res.status(200).send(houses);
        } else {
            res.status(400).send({error: 'Could not edit price.'});
        }
    }
}