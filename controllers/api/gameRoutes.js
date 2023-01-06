const router = require("express").Router();
const {Games, Review} =require("../../models");

//api/games endpoint

router.get("/",async(req,res) => {
    //retro fit this code to our db
    try{
        const gameData = await Games.findAll({
            include: [{
                model: Review,
                attributes:["id","review_body","review_date","user_id"],
            },],
        });
        console.log(gameData)
        const game = gameData.map((game)=> game.get({plain: true}));
        console.log("game",game);
        res.status(200).json(gamesData);
        console.log()
    }catch (err) {
        res.status(500).jason(err);
    }
});

router.get("/:id", async (req, res) =>{
    //retro fit this code to our db
    try {
        const gamesData = await Games.findByPk(req.params.id, {
            include:[{
                model: Review,
                attributes: ["id","review_body","review_date","user_id"],
            },],
        });
        if (!gameData) {
            res.status(404).json({message:'No Game found with this id'});
            return;
        }
        res.status(200).json(gameData);
    }catch (err) {
        res.status(500).jason(err);
});

