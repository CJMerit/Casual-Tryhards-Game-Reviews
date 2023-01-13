const { default: axios } = require('axios');
const fs = require('fs');

const clientID = 'yhi158eigvpc2bgh1kbam0xvl2iv49';
const clientSec = '2gm90la4tna3vpgrgrjpme6xfln2mj';
const url = 'https://api.igdb.com/v4/games';

// gets the access bearer token
// https://id.twitch.tv/oauth2/token?client_id=yhi158eigvpc2bgh1kbam0xvl2iv49&client_secret=2gm90la4tna3vpgrgrjpme6xfln2mj&grant_type=client_credentials

let gameObj = {
    title: "",
    platforms: [],
    game_description: "",
    release_date: "",
    cover: ""
}

async function getGame() {
    let writeGame = true;
    let gamesInfo = await axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'yhi158eigvpc2bgh1kbam0xvl2iv49',
            'Authorization': "Bearer fqj7x4iggqyb57gbg001l6c6orpclp",
        },
        data: `fields name,platforms.name,summary,release_dates.human,cover.url; limit 500;`
    })
    //gameID++;
    for(let i=0;i<500;i++) {
        if(gamesInfo.data[i]){
            if(gamesInfo.data[i].name && gamesInfo.data[i].platforms && gamesInfo.data[i].summary && gamesInfo.data[i].release_dates){
                gameObj.title = gamesInfo.data[i].name;
                for(let j=0;j<gamesInfo.data[i].platforms.length;j++) {
                    gameObj.platforms[j] = gamesInfo.data[i].platforms[j].name;
                }
                gameObj.game_description = gamesInfo.data[i].summary.replace(/"/g,"'");
                gameObj.game_description = gameObj.game_description.replace(/\n/g,"");
                gameObj.release_date = gamesInfo.data[i].release_dates[0].human;
                if(gamesInfo.data[i].cover){
                    gameObj.cover = gamesInfo.data[i].cover.url;
                }
            }
        }
        let data = fs.readFileSync('../seeds/Games.json');
        let gamesWritten = JSON.parse(data);
        console.log(gamesWritten.length)
        
        for(let k=0;k<gamesWritten.length;k++){
                if(gameObj.title === gamesWritten[k].title) {
                    writeGame = false;
                    break;
                }
                else {
                    writeGame = true;
                }
            }
        if(writeGame) {
            gamesWritten.push(gameObj);
            let newGamesWritten = JSON.stringify(gamesWritten).replaceAll('"},','"\n},\n');
            newGamesWritten = newGamesWritten.replaceAll('",', '",\n');
            newGamesWritten = newGamesWritten.replaceAll('{', '{\n');
            newGamesWritten = newGamesWritten.replaceAll('],', '],\n');
            newGamesWritten = newGamesWritten.replaceAll('[', '[\n');
            fs.writeFileSync('../seeds/Games.json', newGamesWritten);
        }
        writeGame = true;
    }

}

getGame();
