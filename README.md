# weareneverthat

<img width="789" alt="스크린샷 2022-01-07 오후 1 16 57" src="https://user-images.githubusercontent.com/90169703/148521986-5e50c8a5-a59d-444f-adce-863c7257613b.png">

[weareneverthat 사이트 방문하기]()

## Members

<img src="https://user-images.githubusercontent.com/90169703/148523187-60bd1fac-668c-46fb-8c52-f067c6db0338.png" width="50px" height="50px"/> 강민수

<img src="https://user-images.githubusercontent.com/90169703/148521624-e9bf350b-7e2c-43a0-be07-f624426b68fd.png" width="50px" height="50px"/> 구민기

<img src="https://user-images.githubusercontent.com/90169703/148523297-0ffe083d-0e89-434c-afce-a3a3d7a33782.png" width="50px" height="50px"/> 민하늘

<img src="https://user-images.githubusercontent.com/90169703/148523411-dc9e0188-5263-4959-854f-d330e5c36db1.png" width="50px" height="50px"/> 정태영

## Introduction

대표적인 쇼핑몰 사이트인 디스이즈네버댓 사이트의 주요기능들을 학습 목적으로 클론 코딩한 프로젝트 개발.

### 기간 : 21.12.27~ 22.01.14

### 구성 : Front-end 2명, Back-end 2명

### 레포지토리 주소

- [백엔드 깃헙주소](https://github.com/wecode-bootcamp-korea/fullstack3-1st-weareneverthat-backend)
- [프론트엔드 깃헙주소](https://github.com/wecode-bootcamp-korea/fullstack3-1st-weareneverthat-frontend)

### Notion 프로젝트 소개

### 프로젝트 사이트 기능 구현 영상

[weareneverthat 구현 영상]()

### DB modeling

- weareneverthat db 자료 구조
  ![image](https://user-images.githubusercontent.com/87692499/148669964-0b122018-4261-4944-9015-8f63ac483735.png)

### Technologies

<백엔드 사용 기술>

💡 Prisma
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">

💡 MySQL
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

💡 Node.js
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">

💡 Postman
<img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">

💡 Express
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

<프론트 사용 기술>

💡 HTML5
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">

💡 Sass
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">

💡 JavaScript
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

💡 React
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

<공통 사용 기술>

💡 Github
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=#181717">

💡 VSCode
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

### 담당자 별 구현 기능.

<프론트 구현 기능>

- 강민수
1. 상품 리스트 페이지 전반적인 ui 구성 및 기능 추가.
- 상품 리스트 메인 이미지 호버 기능 구현
- 상품 리스트 서브 이미지 클릭시 메인 이미지 온클릭 기능 구현
- 상품 리스트 솔팅 버튼 기능 구현
- 상품 리스트에 따른 카테고리 버튼 표시 기능.
- 상품별 좋아요 기능 추가 

- 정태영

- 민하늘

- 구민기

<백엔드 구현 기능>

- 강민수
1. 회원가입, 로그인 api 구축
2. 회원가입 시 유효성 검증 로직 구현. (기존 회원 가입자 정보 존재 여부, 가입시 필수키 입력 여부 구현, 가입시 비밀번호 해쉬 암호화 구현)
3. 로그인 시 유효성 검증 로직 구현. (기존 회원 정보 이메일, 비밀번호 일치여부 조회, 가입시 토큰 부여 구현)
4. 리스트 페이지 상품 데이터 수집 후 가공.

- 정태영

1. 상품 리스트 API
   - 전체 상품 조회
   - 카테고리별 조회
   - 가격 오름차순, 내림차순, 등록일순 정렬
   - 상품 판매량순 정렬 -> 상품 순위 페이지
2. 인증 미들웨어
   - 암호화된 토큰을 받아 검증후 내용을 request에 담아 통과
3. 장바구니 API
   - 유저의 장바구니 목록 조회
   - 유저가 상품을 장바구니에 추가하면 토큰의 유저 id와 쿼리 파라미터의 상품 id를 이용해 장바구니 테이블에 데이터 추가
   - 장바구니 목록 삭제
4. 결제 API
   - 상품 결제시 해당 상품의 남은 재고 차감
   - 상품 결제시 해당 상품의 판매량 증가
   - 상품 결제시 장바구니 목록 제거
5. 좋아요 API
   - 상품 각각의 총 좋아요 개수 조회
   - 로그인 한 유저가 해당 상품에 좋아요를 눌렀는지 조회
   - 유저가 좋아요를 눌렀을 때 테이블에 해당 유저의 id와 상품의 id가 있는지 조회 -> 있으면 데이터 삭제, 없으면 데이터 추가

- 민하늘

- 구민기

### API Documentation

API Documentation(detail)
