import DBConnection from "../util/db";

abstract class Handler {
  private dbConnection: DBConnection;

  constructor() {
    this.dbConnection = DBConnection.Instance();
  }

  abstract create(): Promise<any>;

  abstract update(): Promise<any>;

  abstract get(): Promise<any>;

  abstract delete(): Promise<any>;
}

export default Handler;
