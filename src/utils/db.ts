import mongoose from "mongoose";

class DBConnection {
  private readonly connectionString: string =
    "mongodb+srv://root:PxfcwYXiZKVQlrfq@cluster0.vj5bm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  private static _instance: DBConnection;

  private constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await mongoose.connect(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  }

  public static get Instance(): DBConnection {
    return this._instance || (this._instance = new this());
  }
}

export default DBConnection;
