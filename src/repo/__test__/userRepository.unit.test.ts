// import R from 'ramda';
// import { Chance } from 'chance';
// import nock from 'nock';
// import httpStatus from 'http-status-codes';
// import { IUser } from '../../interfaces/IUser'
// import { userRepository } from '../userRepository';

// const chance = new Chance();

// describe('#createTalkMore', () => {
//     it('should createTalkMore', async () => {
//         const params = {
//             // input: IUser
//         };

//         const response = {
//             "paymentWithPlan": 5.5,
//             "paymentWithouPlan": 66.5,
//             "origin": 11,
//             "destiny": 16
//         };

//         nock('http://localhost:3000')
//             .post('/user')
//             .reply(httpStatus.OK, response);

//         const d = new userRepository

//         // const result = await d.createCall(IUser);

//         expect(response).toEqual({
//             "paymentWithPlan": 5.5,
//             "paymentWithouPlan": 66.5,
//             "origin": 11,
//             "destiny": 16

//         });

//         // it('should return a valid response', async () => {
//         //     const fakeContext = {
//         //         userRepository: {
//         //             userRepository: jest.fn().mockResolvedValue(true),
//         //         },
//         //     };

//         //     const accountToCreate = {
//         //         "origin": "011",
//         //         "destiny": "016",
//         //         "talkMore": 30,
//         //         "perHour": 35
//         //     };

//         //     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//         //     // @ts-ignore
//         //     const svc = new AccountService(fakeContext);

//         //     const response = await svc.createJuridicalAccount(accountToCreate);
//         //     expect(response).toBeTruthy();
//         // });
//     });
// });
