import { IComment } from '../interfaces/IComment';
import sequelize from '../loaders/sequelize';
import { QueryTypes } from 'sequelize';

export class commentRepository {
  async createComment(input: IComment): Promise<any> {
    try {
      return await sequelize.transaction(async function (t) {
        await sequelize.query(`
          INSERT INTO comment (text)
          VALUES(:text)
          `, {
          replacements: {
            text: input.text
          }, type: QueryTypes.INSERT
        });
        return Promise.resolve()
      })
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAll(input: IComment): Promise<any> {
    try {
      return await sequelize.transaction(async function (t) {
        const comment: any = await sequelize.query(`
          SELECT *
          FROM comment        
          `, {
          type: QueryTypes.SELECT
        });
        return Promise.resolve(comment)
      })
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /*
  async getById(input: IComment): Promise<any> {
    try {
      return await sequelize.transaction(async function (t) {
        const comment: any = await sequelize.query(`
          SELECT 
            *
          FROM 
            "comment"  
          WHERE id = :id
          `,  {
            replacements: {
              id: input.id          
            }, type: QueryTypes.SELECT
        });      
        return Promise.resolve(comment)
      })
    } catch (e) {
      return Promise.reject(e);
    }
  }
  */

}



