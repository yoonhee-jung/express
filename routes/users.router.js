import express from 'express';
import pool from './db/mydb.js';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';

const usersRouter = express.Router();

usersRouter.get('/', eduUsersTest, (request, response, next) => {
  response.status(200).send('전체 정보 조회 완료');
});

usersRouter.get('/info/:id', async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    // QUERY 작성
    const sql = 
      `SELECT *
      FROM employees
      WHERE
        emp_id = ${id}
      `;

    // const [result] = await pool.query(sql);
    // prepared statement emp_id = ? >> 세팅되는 값 데이터베이스한테 전달, db가 sql 따로 id 따로 최종적으로 db쪽에서 
    //prepare test from 'select * from employees where emp_id = ?'
    //set @a = 1;
    //execute test usign @a;
    //이런 구문으로..
    // prepated statement 두 번째 방어 수단
    const [result] = await pool.execute(sql, [id]); 
    // sql인젝션.. 막기 위해..


  return response.status(200).send(result);
  
  } catch(error) {
    next(error);
  }
});

usersRouter.put('/info/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
});

// usersRouter.put('/info/modify', (request, response, next) => {
//   response.status(200).send('유저 정보 수정 완료');
// });

export default usersRouter;