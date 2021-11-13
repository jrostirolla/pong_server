import express from "express"
import path from 'path'; 
import cors from 'cors';
import { time } from "console";
import bodyParser from 'body-parser'

interface IGame {
    paddleAPosition: number,
    paddleBPosition: number,
 
    scoreA: number,
    scoreB: number,
 
    latestBounceEvent: {
        time: number;
        paddle: "A" | "B";
        paddlePosition: number;
        ballY: number;
      }
     
 }
 
    const emptyGame: IGame = {
        paddleAPosition: 0,
        paddleBPosition: 0,

        scoreA: 0,
        scoreB: 0,

        latestBounceEvent: {
            time: 0,
            paddle: 'A',
            paddlePosition: 0,
            ballY: 0,
        }
    }

const games = new Map<string, IGame>();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/time', (req, res) => {
    res.json({ time: Date.now() });
})

app.get('/game/:gameId', (req, res) => {
    const game = games.get( req.params.gameId );
    res.json({ game : game || null });
})

app.put('/game/:gameId', (req, res) => {
    const gameId = req.params.gameId

    const existingGame = games.get( gameId ) || emptyGame;

    const updatedGame = { ...existingGame, ...req.body.game };

    games.set(gameId, updatedGame);

    res.json({ game: updatedGame });
}
)

app.listen(PORT, () => {
    console.log(`Server live: now listening on port ${PORT}`)
})
