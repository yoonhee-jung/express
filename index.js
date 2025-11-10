import express from 'express'; //express 모듈 가져오기
// ern(정적파일), was(동적파일 전달)
// 요청하는 파일, 사람, 등등. 


const app = express();

// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router

app.get('/',(request, response, next) => {
    response.status(200).send('안녕 익스프레스..');
});
// 라우트 정리
// next 미들웨어 때..

// 클라이언트가 '/' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/',(request, response, next) => {
  response.status(200).send('포스트 익스프레스');
});

// 클라이언트가 '/' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/',(request, response, next) => {
  response.status(200).send('풋 익스프레스');
});

// 클라이언트가 '/' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/',(request, response, next) => {
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
    console.log(typeof(postId));
    response.status(200).send(postId);

});
// '/posts/:(이 값)'이랑 const postId = request.params.(이 값); 이 값 같아야 함.

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

