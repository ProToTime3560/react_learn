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
  let [title, settitle] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [작성시간, 작성시간변경] = useState([
    "2023년 4월 02일 17시 25분 30초",
    "2023년 3월 20일 16시 49분 18초",
    "2023년 2월 18일 17시 06분 25초"
  ])
   
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

  function 스테이터스값추가(item , input , setitem) {
    let temp = [...item];
    temp.unshift(input);
    setitem(temp);
  }

  function 스테이터스값제거(item, i, setitem) {
    let temp = [...item];
    temp.splice(i, 1);
    setitem(temp);
  }

  function 현재시간구하기() {
    let today = new Date();
  
    let result = today.getFullYear() + "년 " + (today.getMonth() + 1) +
    "월 " + today.getDate() + "일 " + today.getHours() + "시 " +
    today.getMinutes() + "분 " + today.getSeconds() + "초";
    return result;
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
          let tempNumber = i;
          return  (
            <div className="list" key={i}>
              <h4 onClick= { () => { 모달스위치(i) }} className="h4inline"> { 글제목[i] } </h4>
                  <span onClick= { (e) => { e.stopPropagation(); 반복문따봉변경(i) }}>👍 {" "} { 따봉[i] }</span> &nbsp;  
                  <button onClick= { () => {
                    스테이터스값제거(글제목, i, 글제목변경);
                    스테이터스값제거(따봉, i, 따봉변경);
                    스테이터스값제거(작성시간, i, 작성시간변경);
                        //let copy = [...글제목];
                        //copy.splice(i , 1);
                        //글제목변경(copy);
                  }}>글삭제</button>
              <p>작성일:  { 작성시간[i] }</p>
              {modal[i] == true ? <Modal titlenumber={ tempNumber } title={ title } 글제목변경= { 글제목변경 }글제목={글제목}  color ={'gray'}/> : null} 
              <hr/>
            </div>

          )
        })
      }
      <input onChange={ (e) => { 입력값변경(e.target.value) }}></input>
      <button onClick= { () => { 
        if(입력값 != "") {
          스테이터스값추가(글제목, 입력값, 글제목변경);
          스테이터스값추가(따봉, 0 ,따봉변경);
          let temptime = 현재시간구하기();
          스테이터스값추가(작성시간, 현재시간구하기(), 작성시간변경);
          //스테이터스값추가(작성시간, 현재시간구하기();
          //let titleplus_tempArray = [입력값 , ...글제목]
         //글제목변경(titleplus_tempArray);

          //titleplus_tempArray.unshift(입력값); 이런방법도있다.
          //글제목변경(titleplus_tempArray);
        }

      }}>글등록</button>
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
  let titlenumber = props.titlenumber
  let [userInput, userInputChange]= useState('');
  return (
    <> 
      <div className="modal" style= {{ background : props.color}}>
        <h4>{ props.글제목[titlenumber] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <input onChange={ (e) => { userInputChange(e.target.value) }}></input>
        <button onClick={ () => { 
          let TempArray = [...props.글제목];
          TempArray[titlenumber] = userInput;
          props.글제목변경(TempArray);
         }}>글수정</button>
      </div>
    </>
  );
}

export default App;