export abstract class createCallInterface {
  abstract createCall: (
    /* eslint-disable no-unused-vars */
    input: IUser,
  ) => Promise<{ message: string; erros: any[] }>;
}

export interface IUser {
  origin: string;
  destiny: string;
  perHour: string;
  talkMore: string;
}
