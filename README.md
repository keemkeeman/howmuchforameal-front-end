## 한끼얼마
- 식비를 기록하면 내 한끼당 식사 비용을 계산해주는 웹앱입니다.
- 해당 프로젝트는 MERN (MongoDB, Express, Reactjs, Nodejs) 스택을 활용해서 만들었습니다.
- 백엔드 rest api 는 [여기](https://github.com/keemkeeman/howmuchforameal-back-end)를 참고해주세요.
![image](https://github.com/keemkeeman/manstagram/assets/82154123/35718b42-bd11-446a-8519-a204eb28fcf2)
*2인 가족의 8월 식비 기록입니다.

## Link
https://howmuchforameal.vercel.app/

## Libraries
프론트엔드
- react v18.2
- react-dom v18.2
- react-router-dom v6.14
- react-datepicker
- react-icons
- react-hot-toast
- react-spinners
- recoil
- axios
- tailwindcss v3
  
백엔드
- express v4.18,
- bcrypt,
- mongoose 7.4

## Features
pc/테블릿/모바일 디스플레이에 따른 반응형 웹, 쿠키/세션을 이용한 사용자 인증(로그인, 로그아웃), 회원가입, 식비/끼니 카드 CRUD, 날짜 범위 설정에 따른 식비 정보 fetch

## Deploy
프론트엔드 배포
- Vercel
  
서버 배포
- Heroku

## Roadmap
랜더링 최적화, PWA, 사용자 및 데이터 수에 따른 랭킹 기능, 식비 관련 정보를 나눌 수 있는 커뮤니티 기능, SEO 최적화, 광고 등 수익모델

## Architecture
![Frame 1](https://github.com/keemkeeman/manstagram/assets/82154123/d99b2b57-6654-4db2-bdba-90ec4ef03afb)
- vercel, heroku로 배포(CI, CD)
- 프론트는 reactjs, tailwindcss, recoil로 전역상태관리
- 백엔드는 nodejs, express, mongoose로 RSET API 서버 구축
- DB는 mongoDB, mongoose 사용
