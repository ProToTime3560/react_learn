import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "강남 우동맛집",
    "파이썬독학",
  ]);

  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal] = useState([false,false,false]);

  function 제목바꾸기(targetTitle) {
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

  function 모달스위치(i) {
    if (modal[i] == false) {
      <Modal />;
      let tempArray = [...modal];
      let newModal = true;
      tempArray[i] = newModal;
      setModal(tempArray);
      //setModal(!modal) 이걸로 setModal 자료 반대로바꾸는것 가능
    } else {
      let tempArray = [...modal];
      let newModal = false;
      tempArray[i] = newModal;
      setModal(tempArray);
    }
  }

  function 반복문따봉변경(i) {
    let tempArray = [...따봉];
    tempArray[i] +=1;
    따봉변경(tempArray);
    //return 따봉[i];
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

      { 
        글제목.map(function(a, i) {
          return  (
            <div className="list" key={i}>
              <h4 onClick= { () => { 모달스위치(i) }} className="h4inline"> { 글제목[i] } </h4>
                  <span onClick= { () => { 반복문따봉변경(i) }}>👍 {" "} { 따봉[i] }</span>
              <p>2월 18일 발행</p>
              {modal[i] == true ? <Modal 글제목변경={ 글제목변경 } 글제목={글제목[i]}  color ={'gray'}/> : null} 
              <hr/>
            </div>

          )
        })
      }
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
  props 부모->자식 state 전송가능 ex) <Modal 글제목={글제목[i]}
  style= {{ background : props.color}}
  color ={'orange'}
*/
function Modal(props) {
  return (
    <> 
      <div className="modal" style= {{ background : props.color}}>
        <h4>{ props.글제목 }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick= { () => { props.글제목변경(['여자코트 추천', '강남 우동맛집', '파이썬독학'])}}>글수정</button>
      </div>
    </>
  );
}

export default App;