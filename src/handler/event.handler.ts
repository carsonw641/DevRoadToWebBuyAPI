import EventModel from "../schema/event.schema";
import Handler from "./handler";
import { Event } from "../interfaces/event";

class EventHandler extends Handler {
  private event: EventModel;
  constructor() {
    super();

    this.event = new EventModel();
  }
  public async create(data: Event): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.event
        .create(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async update(data: Event): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      await this.event
        .update(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async get(data: Event): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.event
        .find(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async delete(data: Event): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.event
        .deleteOne(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }
}

export default EventHandler;
