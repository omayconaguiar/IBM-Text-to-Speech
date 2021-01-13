import { Service, Inject } from 'typedi';
import { IUser, createCallInterface } from '../interfaces/IUser';
import createCallModel from '../business/user';

@Service()
export default class createCallService extends createCallInterface {
  private _controller: createCallModel;

  /* eslint-disable no-unused-vars */
  constructor(@Inject('logger') public logger: any) {
    super();
    this._controller = new createCallModel();
  }

  public createCall = async (input: IUser): Promise<any> => {
    try {
      this.logger.silly('Calling createCallSchema');
      return await this._controller.createCall(input);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  public getCall = async (input: IUser): Promise<any> => {
    try {
      return await this._controller.getCall(input);
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
