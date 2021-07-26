import CharacterHandler from "./handler/character.handler";
import ScoreHandler from "./handler/score.handler";
import ToolHandler from "./handler/tool.handler";

import { Character } from "./interfaces/character";
import { Score } from "./interfaces/score";
import { Tool } from "./interfaces/tool";

import DoorKicker from "./services/door-kicker";

import * as dayjs from "dayjs";
import express from "express";

const app = express();

app.use(express.json());

const port: number = 3000;

// endpoints
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/tools", async (req, res) => {
  const tools: Tool[] = await new ToolHandler().get({});

  return {
    succuess: true,
    code: 200,
    message: "Success",
    tools
  };
});

app.get("/characters", async (req, res) => {
  const characters: Character[] = await new CharacterHandler().get({});

  return {
    success: true,
    code: 200,
    message: "Success",
    characters
  };
});

app.get("/dailyScoreBoard", async (req, res) => {
  const scores: Score[] = await new ScoreHandler().get({
    // @ts-ignore
    date: { $gte: dayjs().startOf('day').toString() }
  });

  return {
    success: true,
    code: 200,
    message: "Success",
    scores
  };
});

app.get("/globalScoreBoard", async (req, res) => {
  const scores: Score[] =  await new ScoreHandler().getTopTenScores();

  return {
    success: true,
    code: 200,
    message: "Success",
    scores
  }
});

app.post("/battle", async (req: any, res: any) => {
  console.log(req.body); // { Test: "Test" }
  
  const doorKicker: DoorKicker = new DoorKicker(
    req.body.userName,
    req.body.partySelection);


  await new Promise<void>((resolve: any, reject: any) => {
    doorKicker.initialized.on("ready", () => resolve());
  });

  const { score, log } = await doorKicker.survive();

  res.json({
    code: 200,
    message: "Success",
    success: true,
    score,
    log
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
