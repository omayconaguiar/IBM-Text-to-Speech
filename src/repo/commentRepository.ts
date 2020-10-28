import { IComment } from '../interfaces/IComment';
import sequelize from '../loaders/sequelize';
import { QueryTypes } from 'sequelize';
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
import config from '../config';

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

  async getById(input: IComment): Promise<any> {
    try {
      return await sequelize.transaction(async function (t) {
        var output: any = await sequelize.query(`
          SELECT 
            text AS text
          FROM 
            comment
          WHERE id = :id
          `, {
          replacements: {
            id: input.id
          }, type: QueryTypes.SELECT
        });

        const textToSpeech = new TextToSpeechV1({
          authenticator: new IamAuthenticator({
            apikey: config.ibm.apikey,
          }),
          version: '5.7.1 ',
          serviceUrl: config.ibm.url,
        });

        const synthesizeParams = {
          text: `${output[0].text}`,
          accept: 'audio/wav',
          voice: 'pt-BR_IsabelaVoice',
        };

        var text = textToSpeech.synthesize(synthesizeParams)
          .then(response => {
            // only necessary for wav formats,
            // otherwise `response.result` can be directly piped to a file
            return textToSpeech.repairWavHeaderStream(response.result);
          })
          .then(buffer => {
            fs.writeFileSync('work.wav', buffer);
          })
          .catch(err => {
            console.log('error:', err);
          });

        return Promise.resolve(text)
      })
    } catch (e) {
      return Promise.reject(e);
    }
  }

}



