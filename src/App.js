import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "강남 우동맛집",
    "파이썬독학",
  ]);

  let posts = "강남 고기 맛집";

  let [따봉, 따봉변경] = useState(0);
  let [modal, setModal] = useState(false);

  function 함수() {
    return 100;
  }

  function 제목바꾸기() {
    let newArray = [...글제목];
    //var newArray = [...글제목]; 이것도 된다.
    newArray[0] = "여자코트 추천";
    글제목변경(newArray);
  }

  //https://hianna.tistory.com/409
  function 가나다순정렬() {
    let newArray = [...글제목];
    newArray.sort(function (a, b) {
      if (a > b) return 1;
      if (a == b) return 0;
      if (a < b) return -1;
    });
    글제목변경(newArray);
  }

  function 모달스위치() {
    if (modal == false) {
      <Modal />;
      let newModal = true;
      setModal(newModal);
      //setModal(!modal) 이걸로 setModal 자료 반대로바꾸는것 가능
    } else {
      let newModal = false;
      setModal(newModal);
    }
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button
        onClick={() => {
          가나다순정렬();
        }}
      >
        가나다순정렬
      </button>

      <button
        onClick={() => {
          제목바꾸기();
        }}
      >
        글수정
      </button>
      <div className="list">
        <h3>
          {" "}
          {글제목[0]}{" "}
          <span
            onClick={() => {
              따봉변경(따봉 + 1);
            }}
          >
            👍
          </span>{" "}
          {따봉}{" "}
        </h3>
        <p>2월 17일 발행</p>
        <hr />
      </div>
      <div className="list">
        <h3> {글제목[1]} </h3>
        <p>2월 18일 발행</p>
        <hr />
      </div>
      <div className="list">
        <h3
          onClick={() => {
            모달스위치();
          }}
        >
          {" "}
          {글제목[2]}{" "}
        </h3>
        <p>2월 19일 발행</p>
        <hr />
      </div>

      {modal == true ? <Modal /> : null}
    </div>
  );
}

/**컴포넌트 쓰는법
  1.반복적인 html 축약
  2.큰페이지들
  3. 자주변경되는 것들
  let Modal = () => {
    return ()
  } 
  이것도 됨
  const Modal = () => {} 이렇게 만들면 나중에 에러가 생길시 알려줌
*/
function Modal() {
  return (
    <>
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  );
}

export default App;
