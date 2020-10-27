import { Service, Inject } from 'typedi';
import { IComment } from '../interfaces/IComment';
import commentModel from '../business/comment';
import axios from 'axios';
import config from '../config';

@Service()
export default class commentService {
  private _controller: commentModel

  constructor(
    @Inject('logger') private logger: any
  ) {
    this._controller = new commentModel();

  }

  public async createComment(input: IComment): Promise<any> {
    try {
      this.logger.silly('Calling createCommentSchema');
      return await this._controller.createComment(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  public async getAll(input: IComment): Promise<any> {
    try {
      this.logger.silly('Calling cgetAllSchema');
      return await this._controller.getAll(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  public async getById(input: IComment): Promise<any> {
    try {
        this.logger.silly('Calling getBalance');
                    
        var bankAccount =  (await axios.post(
          config.PaymentsApi.host + config.PaymentsApi.endpoints.createClient,
          input,
          {
              headers: {
                  "Content-Type": "application/json"
              },
              auth : {
                  username: config.PaymentsApi.username,
                  password: config.PaymentsApi.password
              },
          }
      )).data                            
                    
      return Promise.resolve(bankAccount);
    }
    catch (e) {
        return Promise.reject(e);
    }
}

}


