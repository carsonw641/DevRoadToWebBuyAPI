import express from "express";
import CharacterHandler from "./handler/character.handler";
const app = express();

app.use(express.json());

const port: number = 3000;

// endpoints
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/battle", async (req: any, res: any) => {
  const handler: CharacterHandler = new CharacterHandler();

  const response: any = handler.create({
    name: "Test",
    wuTangName: "Cool Test",
    stength: 10,
    luck: 10,
    wisdom: 10,
    health: 10,
    bonusName: "Bonus Test",
    bonusType: "Bonus",
    bonusValue: 10,
    toolName: "Testinator"
  });

  res.json({ response });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
