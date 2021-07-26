import ScoreModel from "../schema/score.schema";
import Handler from "./handler";

class ScoreHandler extends Handler {
  constructor() {
    super();
  }

  public async create(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ScoreModel.create(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async update(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ScoreModel.updateOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async get(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ScoreModel.find(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async delete(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ScoreModel.deleteOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async getTopTenScores(): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ScoreModel.find().sore({ days: -1 }).limit(10);
        resolve(results);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default ScoreHandler;
