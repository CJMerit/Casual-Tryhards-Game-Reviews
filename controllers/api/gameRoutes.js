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
        const game = gameData.map((game)=> game.get({plain: true}));
        res.render('search', {
          ...game,
          logged_in: req.session.logged_in
        });
    }catch (err) {
        res.status(500).jason(err);
    }
});

router.get("/:id", async (req, res) => {
    //retro fit this code to our db
    try {
        const gameData = await Games.findByPk(req.params.id, {
            include:[{
                model: Review,
                attributes: ["id","review_body","review_date","user_id"],
            },],
        },);
        if (!gameData) {
            res.status(404).json({message:'No Game found with this id'});
            return;
        }
        const game = gameData.get({plain: true});
        res.render('games', {
          ...game,
          logged_in: req.session.logged_in
        })
    }catch (err) {
        res.status(500).json(err);
}
});

router.post("/", async (req, res) => {
    try {
      console.log("---------------POSTING--------------");
      console.log(req.body);
      const gamesData = await Games.create(req.body, {
        title: req.body.title,
        game_description: req.body.game_description,
        release_date: req.body.release_date,
        background_image: req.body.background_image
      });
      res.status(200).json("Nice job. You added to the DB");
    } catch (err) {
      res.status(500).json(err);
    }
});
 // delete user
 router.delete("/:id", async (req, res) => {
    try {
      const userData = await Games.destroy({ where: { id: req.params.id } });
      if (!userData) {
        res.status(404).json("User Not Found");
      }
      res.status(200).json("Succesfully Deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;


