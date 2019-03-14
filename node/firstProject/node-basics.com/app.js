//NPM Package
var express     = require("express"),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
methodOverride  = require("method-override"),
app             = express();

//Config
mongoose.connect("mongodb://localhost:27017/node-basics", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//Mongoose Schema
var gameSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    score: Number,
    created: {type: Date, default: Date.now()}
});

var Game = mongoose.model("Game", gameSchema);

//Dummy Data

// Game.create({
//     title: "Fallout 2",
//     image: "https://static.giantbomb.com/uploads/scale_medium/3/30036/1285936-fallout2front.jpg",
//     content: "It's been 80 long years since your ancestor trod across the wastelands. As you search for the Garden of Eden Creation Kit to save your primitive village, your path is strewn with crippling radiation, megalomaniac mutants, and a relentless stream of lies, deceit, and treachery. You begin to wonder if anyone really stands to gain anything from this brave new world.",
//     score: 9.1
// });

//Routes
app.get("/", (req, res)=> {
    res.redirect("/games");
});

app.get("/games", (req, res)=> {
    Game.find({}, (err, games)=> {
        if(err) {
            console.log("Something go wrong!");
        } else {
            res.render("index", {games: games});
        }
    });
});

app.get("/games/new", (req, res)=> { 
     res.render("new");
});

app.post("/games", (req, res)=> {
    Game.create(req.body.game, (err, newGame)=> {
         if(err) {
            console.log("Something go wrong!");
        } else {
            res.redirect("/games");
        }
    });
});

app.get("/games/:id", (req, res)=> {
    Game.findById(req.params.id, (err, foundedGame)=> {
        if(err) {
            console.log("Something go wrong!");
        } else {
            res.render("show", {game: foundedGame});
        }
    });
});

app.get("/games/:id/edit", (req, res)=> {
    Game.findById(req.params.id, (err, foundedGame)=> {
        if(err) {
            console.log("Something go wrong!");
        } else {   
            res.render("edit", {game: foundedGame});
        }
    });    
});

app.put("/games/:id", (req, res)=> {
    Game.findByIdAndUpdate(req.params.id, req.body.game, (err, updatedGame)=> {
        if(err) {
            console.log("Something go wrong!");
        } else {   
            res.redirect("/games/" + req.params.id);
        }
    });    
});

app.delete("/games/:id", (req, res)=> {
    Game.findByIdAndRemove(req.params.id, (err, foundedGame)=> {
        if(err) {
            console.log("Something go wrong!");
        } else {
            res.redirect("/games");
        }
    });
});

//Listener
app.listen(process.env.PORT, process.env.IP, ()=> {
   console.log("Server is running!"); 
});
