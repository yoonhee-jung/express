import express from 'express'; //express 모듈 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
// ern(정적파일), was(동적파일 전달)
// 요청하는 파일, 사람, 등등. 


const app = express();

// 얘가 있어야 'Request.body' 쓸 수 있음
app.use(express.json()); // JSON으로 요청 올 때 파싱 처리 해 주는 미들웨어

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router

app.get('/', (request, response, next) => {
    response.status(200).send('안녕 익스프레스..');
});
// 라우트 정리
// next 미들웨어 때..

// 클라이언트가 '/' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/', (request, response, next) => {
  response.status(200).send('포스트 익스프레스');
});

// 클라이언트가 '/' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/', (request, response, next) => {
  response.status(200).send('풋 익스프레스');
});

// 클라이언트가 '/' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/', (request, response, next) => {
  response.status(200).send('딜리트 익스프레스');
});

//
// Query Parameter 제어..
// Request.query 프로퍼티를 통해서 접근 가능
// 모든 값을 string으로 받기 때문에 주의 필요
app.get('/posts', (request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age= request.query.age;

  console.log(name, age)
  response.status(200).send(params);
})

// Segment Parameter
// Request.params 를 통해서 접근 가능함
// post의 상세: api/posts/30
app.get('/posts/:id', (request, response, next) => {
    const postId = request.params.id;
    // DB 검색 postId로
    // const result = {id: postId, title: newtest }
    console.log(typeof(postId));
    response.status(200).send(postId);
});

// 위의 코드가 옳기 때문에 실행 안 됨
app.get('/posts/test', (request, response, next) => {
  response.status(200).send('tt');
})

// 얘는 계층 구조가 달라서 실행됨
app.get('/new/test', (request, response, next) => {
  response.status(200).send('tt');
})

// 얘도 실행됨 유저가 파라미터 주든 안 주든 하는 일 함
app.get('/new/:test', (request, response, next) => {
  response.status(200).send('tt');
})


// '/posts/:(이 값)'이랑 const postId = request.params.(이 값); 이 값 같아야 함.


// JSON 요청 제어
// const form = new FormData();
// 'Request.body'를 통해서 접근 가능 (** express.json() 추가 필요 **)
app.post('/posts', (request, response, next) => {
    const {account, password, name} = request.body;
    // const account = request.body.account;
    // const password = request.body.password;
    // const age = parseInt(request.query.age);
    response.status(200).send({account, password, name});
});


// 라우트 그룹
// 라우트 모듈로 나누고 그룹핑해 관리
app.use('/api', authRouter);

// 보통 디렉토리 명은 복수형으로 지음

// 대체 라우트보다 위에 라우트 그룹 있어야 함
app.use('/users', usersRouter);

// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
app.use((request, response, next)=>{
    response.status(404).send({
    code: 'E01',
    msg: '찾을 수 없는 페이지입니다'
    });
});

// 서버를 주어진 포트에서 시작
app.listen( 3000, () => {
    console.log(`3000 포트에서 리스닝..`);
} );

