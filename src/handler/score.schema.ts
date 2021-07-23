import ScoreModel from "../schema/score.schema";
import Handler from "./handler";
import { Score } from "../interfaces/score";

class ScoreHandler extends Handler {
  private score: ScoreModel;
  constructor() {
    super();

    this.score = new ScoreModel();
  }
  public async create(data: Score): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.score
        .create(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async update(data: Score): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.score
        .update(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async get(data: Score): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.score
        .find(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async delete(data: Score): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.score
        .deleteOne(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }
}

export default ScoreHandler;
