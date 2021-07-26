import CharacterModel from "../schema/character.schema";
import Handler from "./handler";

class CharacterHandler extends Handler {
  constructor() {
    super();
  }

  public async create(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await CharacterModel.create(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async update(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await CharacterModel.updateOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async get(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await CharacterModel.find(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async delete(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await CharacterModel.deleteOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }
}

export default CharacterHandler;
