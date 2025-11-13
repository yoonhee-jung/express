import express from 'express';
import db from '../app/models/index.js'
import { Op, Sequelize } from 'sequelize';
import dayjs from 'dayjs';

const eduRouter = express.Router();

const { sequelize, Employee } = db;

eduRouter.get('/api/edu', async (request, response, next) => {
  try {
    // const fireDate = request.query.date;

    let result = null;

    // // 평문으로 실행하고 싶을 경우
    // const sql = `SELECT * FROM employees WHERE fire_at <= ?`;
    // // sql 인젝션 막으려고 세미콜론 넣고 truncate넣으면 안 되니까..

    // result = await sequelize.query(
      
    //   sql,
    //   {
    //     replacements: [fireDate],
    //     type: Sequelize.QueryTypes.SELECT
    //   }
    // );

    // 모델 메소드
    //SELECT * FROM employees; 전체 조회(조건 설정 가능)


    // result = await Employee.findAll({

    //   attributes: ['empId', 'name', 'birth'], //조회할 컬럼 지정(SELECT절)
    //   where: { empId: {[Op.between]:[50, 100]} //[Op.lte]: 100
    //  }
    // });


    //findOne() : 조건에 맞는 첫번째 레코드 조회
    //  result = await Employee.findOne({

    //   attributes: ['empId', 'name', 'birth'], //조회할 컬럼 지정(SELECT절)
    //   where: { empId: {[Op.between]:[50, 100]} //[Op.lte]: 100
    //  } // findOne으로 가져오면 데이터 타입이 객체object 한 개만 가져와서..
    //  // 여러 레코드 findAll .. 배열 형식..
    //  // 반환하는 데이터 타입 중요 > 루프 처리 달라짐
    // });


    //findByPk(id, options) : pk 기준 단일레코드 조회
    // result = await Employee.findByPk(30, {attributes: ['empId', 'name']});
    // //퍼포먼스 이슈 > 평문 수정.. 평문으로 바꿀 수 있는 연산 > 다시 어떻게 원래대로?


    // count(options), sum(field, options), max(field, options), min(field, options), avg(field, options)

    // result = await Employee.max('empId');

    // SELECT COUNT(*) FROM employees WHERE deleted_at IS NULL;
    //Employee.js에서 paranoid에서 soft delete설정해 놔서 count() 값이 줄어들어 보이는 것
    // result = await Employee.count({
      // paranoid: false, soft delete 설정을 쓰지 않겠다.. 
    // });


    //create(values, options) : 새 레코드 생성
    // result = await Employee.create({
    //   name: '테스트',
    //   birth: '2000-01-01',
    //   hireAt: dayjs().format('YYYY-MM-DD'),
    //   gender: 'F',
    // }); // result는 orm 안 쓰면 숫자가 옴?? 이 부분??


    //update(values, options) : 기존 레코드 수정 기존 모델 안 가져와도 됨
    //update into employees set name = '사자' where emp_id >= 100008;
  //   result = await Employee.update(
  //   {
  //     name: '정윤희'
  //   },
  //   {
  //   where: {
  //     empId: {
  //       [Op.gte]: 100008
  //   }  
  //   }
  //   }
  // );

  //트랜잭션 시작
  //save(): 모델 인스턴스를 기반.. 모델 가져오고 써야 함으로 생성 및 수정
  // const employee = await Employee.findByPk(100008);
  // employee.name = '둘리';
  // employee.birth = '1900-12-12';
  
    // const employee = await Employee.build(); // 빈 모델 객체 인스턴스 생성됨
    // employee.name = '또치';
    // employee.birth = '1980-01-01';
    // employee.gender = 'F';
    // employee.hireAt = dayjs().format('YYYY-MM-DD');
    // result = await employee.save();

  // result = await employee.save();

    //destroy(options) : 조건에 맞는 레코드 삭제해 줌
    // result = await Employee.destroy({
    //   where: {
    //     empId: 100009
    //   }, force: true // 모델에 'paranoid: true'일 경우에도, 물리적 삭제를 위한 옵션
    //   // 다른 쿼리들에는 paranoid 옵션 씀. 삭제할 때만 force 씀.
    // });


    //restore(options) : soft delete된 레코드를 복원
    // result = await Employee.restore({
    //   where: {
    //     empId: 100008
    //   }
    // });
    //조건 줘도 됨

    //이름이 '강가람'이고, 성별이 여자인 사원 정보 조회
    // result = await Employee.findAll({
    //   attributes: [
    //     'empId', 'name', 'gender'
    //   ],
    //   where: {
    //     name: '강가람', gender: 'F'
    //   }
    // });

    // 이름이 '강가람' 또는 '신서연'인 사원 조회
    // result = await Employee.findAll({
    //   attributes: [
    //     'empId', 'name', 'gender'
    //   ],
    //   where: {
    //     [Op.or]: [
    //       {name: '강가람'}, 
    //       {name: '신서연'}
    //     ], 
    //   }
    // });

  //   // 성별이 여자이고 이름이 '강가람' 또는 '신서연'인 사원 조회
  //   result = await Employee.findAll
  //  ({
  //   attrubutes: [],
  //   where: {
  //     [Op.and]: [
  //       {gender: 'F'},
  //       {
  //         [Op.or]: [
  //           {name: '강가람'},
  //           {name: '신서연'}
  //         ]
  //       }
  //     ]
  //   }
  //  }); 

    // 성별이 여자이고 이름이 '강가람' 또는 '신서연'인 사원 조회
  //   result = await Employee.findAll
  //  ({
  //   attrubutes: [],
  //   where: {
  //       gender: 'F',
  //         [Op.or]: [
  //           {name: '강가람'},
  //           {name: '신서연'}
  //         ]
  //       }
  //   }); // 이렇게 해도 됨

    // result = await Employee.findAll({
    //   where: {
    //     empId: {
    //       // [Op.notIn]: [1, 2, 3]
    //       // [Op.in]: [1, 2, 3]
    //       [Op.notBetween]: [1, 100]
    //       // [Op.between]: [1, 100]
    //     },
    //     name: {
    //       // [Op.like]: '%가람'
    //       [Op.iLike]: '%가람' // 대소문자 무시하면서 .. 데이터베이스의 문자 형식과 연관 > 반드시 대소문자 무시하면서 동작하는 것 아님.
    //     },
    //     fireAt: {
    //       [Op.is]: null // [Op.not]: null
    //     }
    //   }
    // });

    // result = await Employee.findAll({
    //   where: {
    //     empId: {
    //     [Op.gte]: 10000
    //     }
    //   },
    //   order: [

    //     ['name', 'ASC'],
    //     ['birth', 'DESC']

    //   ],
    //   limit: 10,
    //   offset: 2, // 적혀있는 n번째 페이지 가져옴
    // });

// group by, having절

result = await Employee.findAll({
  attributes: ['gender', [sequelize.fn('COUNT', sequelize.col('*')), 'cnt_gender']],
  group: ['gender'],
  having: sequelize.literal('cnt_gender >= 40000'),
});
// 효율에 따라 다름


    return response.status(200).send({
      msg: '정상 처리',
      data: result
    });

  } catch(error) {
    next(error);
  }
})

export default eduRouter;