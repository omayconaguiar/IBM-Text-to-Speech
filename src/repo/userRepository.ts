import { QueryTypes } from 'sequelize';
import { IUser } from '../interfaces/IUser';
import sequelize from '../loaders/sequelize';

export class userRepository {
  async createCall(input: IUser): Promise<any> {
    try {
      return await sequelize.transaction(async function () {
        const origin = input.origin ? 'WHERE origin = :origin AND' : null;
        const destiny = input.destiny ? 'destiny = :destiny AND' : null;
        let percentage;

        const vxtel: any = await sequelize.query(
          `
          SELECT per_hour AS perHour, origin, destiny FROM vxtel           
          ${origin}
          ${destiny}          
          id IS NOT NULL
          `,
          {
            replacements: {
              origin: input.origin,
              destiny: input.destiny,
            },
            type: QueryTypes.SELECT,
          },
        );

        if (!vxtel.length) {
          return Promise.reject({
            message:
              'Origin and destiny may be wrong, try again with another values',
            status: 400,
          });
        }

        if (parseInt(input.talkMore) === 30) {
          if (parseInt(input.perHour) <= 30) {
            percentage = 'Value of plan FaleMais30';
          } else {
            percentage = parseInt(input.perHour) - 30;
            percentage *= 1.1;
          }
        }
        if (parseInt(input.talkMore) === 60) {
          if (parseInt(input.perHour) <= 60) {
            percentage = 'Value of plan FaleMais60';
          } else {
            percentage = parseInt(input.perHour) - 60;
            percentage *= 1.1;
          }
        }
        if (parseInt(input.talkMore) === 120) {
          if (parseInt(input.perHour) <= 120) {
            percentage = 'Value of plan FaleMais120';
          } else {
            percentage = parseInt(input.perHour) - 120;
            percentage *= 1.1;
          }
        }

        const resolvePlan = {
          paymentWithPlan: percentage,
          paymentWithouPlan: vxtel[0].perhour * parseInt(input.perHour),
          origin: vxtel[0].origin,
          destiny: vxtel[0].destiny,
        };

        await sequelize.query(
          `
         INSERT INTO "user" (payment_plan, payment_without_plan, origin, destiny)
         VALUES('${resolvePlan.paymentWithPlan}', ${resolvePlan.paymentWithouPlan}, ${resolvePlan.origin}, ${resolvePlan.destiny})
         `,
          {
            type: QueryTypes.INSERT,
          },
        );

        return Promise.resolve(resolvePlan);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getCall(): Promise<any> {
    try {
      return await sequelize.transaction(async function () {
        const getAll: any = await sequelize.query(
          `
          SELECT payment_plan AS paymentPlan,
          payment_without_plan AS paymentWithoutPlan,
          origin, destiny
           from "user"
          `,
          {
            type: QueryTypes.SELECT,
          },
        );

        return Promise.resolve(getAll);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
