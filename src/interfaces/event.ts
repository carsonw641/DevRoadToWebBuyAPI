export interface Event {
  id: number;
  name: string;
  initDescription: string;
  successDescription: string;
  failDescription: string;
  strengthReq: number;
  wisdomReq: number;
  healthReq: number;
  luckReq: number;
  successType: string;
  successValue: number;
  failType: string;
  failValue: number;
  keyItemName: string;
}
