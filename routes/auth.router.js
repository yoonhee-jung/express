// 실제기능명.하는일.확장자
// express 파일명 만드는 법

import express from 'express';
import loginValidator from '../app/middlewares/validations/validators/login.validator.js';
import { validatorHandler } from '../app/middlewares/validations/validations-handler.js';
import registrationValidator from '../app/middlewares/validations/validators/registration.validator.js';

const authRouter = express.Router(); // 라우터 객체를 인스턴스

authRouter.post('/auth/login', loginValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('로그인 성공');
}); // path 만드는 것은 전적으로 개발자 권한

authRouter.post('/auth/signin', registrationValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('회원가입 성공');
});



//라우터 정의 ..

export default authRouter;