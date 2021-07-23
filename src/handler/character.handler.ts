import CharacterModel from "../schema/character.schema";
import { Character } from "../interfaces/character";
import Handler from "./handler";

class CharacterHandler extends Handler {
  private character: CharacterModel;
  constructor() {
    super();

    this.character = new CharacterModel();
  }
  public async create(data: Character): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.character
        .create(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async update(data: Character): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.character
        .update(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async get(data: Character): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.character
        .find(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async delete(data: Character): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.character
        .deleteOne(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }
}

export default CharacterHandler;
