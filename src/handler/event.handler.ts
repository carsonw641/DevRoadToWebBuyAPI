import EventModel from "../schema/event.schema";
import Handler from "./handler";

class EventHandler extends Handler {
  constructor() {
    super();
  }

  public async create(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await EventModel.create(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async update(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await EventModel.updateOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async get(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await EventModel.find(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async delete(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await EventModel.deleteOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }
}

export default EventHandler;
