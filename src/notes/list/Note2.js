import React, {useState} from "react";
import style from "../css/ApiPractice.module.css"

export default function ApiPractice(){
  const [UserID, UserIDFunction] = React.useState(1);
  const [User, UserFunction] = React.useState('');
  const [Title, TitleFunction] = React.useState('');
  const [Text, TextFunction] = React.useState('');
  const [UserError, setError] = React.useState('');
  const [response, setResponse] = React.useState('');
  
  const handleGetUser = () =>{
    console.log(UserID);
    console.log(User);
    console.log(Title);
    console.log(Text);
    //https://jsonplaceholder.typicode.com/users/1
    fetch('https://jsonplaceholder.typicode.com/users/' + UserID).then(
        (res) => {
            if(!res.ok) throw new Error("no user");
            return res.json();
        }).then((user) => {
            console.log(user);
            return UserFunction(user);
        }).catch((error) => {
            setError(error.message);
            console.log(error);
        })
  }
  const handlePostBlog = () =>{
    console.log(UserID);
    console.log(User);
    console.log(Title);
    console.log(Text);
    //https://jsonplaceholder.typicode.com/users/1
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method : "POST",
        headers : {
            "Content-Type" : 'application/json; charset=UTF-8'
        },
        body : JSON.stringify ({
            title :  Title,
            body : Text,
            userID : 1
        })
    }).then(
        (res) => {    
            return res.json();
        }).then((data) => {
            console.log(data)
            setResponse(data);
        }).catch((error) => {
            setError(error.message);
            console.log(error);
        })
  }

  return<div className = {style.container}>
    <h1 className = {style.heading}>API연습</h1>
    <div className="style.section">
      <input 
      className = {style.input}
      type = "number"
      min = "1"
      max = "10"
      value = {UserID}
      onChange = {(e) => {UserIDFunction(e.target.value)}}
      placeholder = "User ID 1~10" />

      <button className = {style.button} onClick = {handleGetUser}>
        유저 정보 GET
      </button>
    <div className = {style.card}>
        <p>
            <strong>유저 이름 :</strong> {User.name}
        </p>
        <p>
            <strong>유저 e-mail :</strong> {User.email}
        </p>
        <p>
            <strong>유저 전화번호 :</strong> {User.phone}
        </p>
    </div>    
    </div>
    <hr/>
    <div className = {style.section}>
        <input className = {style.input}
            type = "text" 
            value = {Title}
            onChange = {(e) => {TitleFunction(e.target.value)}}
            placeholder = "게시글 제목"/>
        <textarea className = {style.textarea}
            placeholder = "게시글 내용"
            value = {Text}
            onChange = {(e) => {TextFunction(e.target.value)}}
            rows = "4" />
        <button  onClick = {handlePostBlog}>
            게시글 작성하기
        </button>
    </div>
    {response && 
    <div className = {style.success + " " + style.response}>
        게시글 정상 생성 : {response.id}
    </div>}

    {UserError && 
    <div className = {style.error + " " + style.response}>
        오류 : {UserError}
    </div>}

  </div>
}

//정답
/*import React, { useState } from "react";
import styles from "../css/ApiPractice.module.css"; // CSS 모듈 불러오기

function ApiPractice() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postResponse, setPostResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchUser = () => {
    const id = Number(userId);
    if (!id || id < 1 || id > 10) {
      setError("유저 ID는 1부터 10 사이 숫자여야 해요.");
      return;
    }

    setError(null);
    setUser(null);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("해당 유저를 찾을 수 없습니다.");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  };

  const handleCreatePost = () => {
    if (!postTitle || !postBody) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setError(null);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostResponse(data);
        setPostTitle("");
        setPostBody("");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📡 API 연습: GET + POST</h1>

      <div className={styles.section}>
        <input
          type="number"
          min="1"
          max="10"
          placeholder="유저 ID (1 ~ 10)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleFetchUser} className={styles.button}>
          유저 조회 (GET)
        </button>

        {user && (
          <div className={styles.card}>
            <p>
              <strong>이름:</strong> {user.name}
            </p>
            <p>
              <strong>이메일:</strong> {user.email}
            </p>
            <p>
              <strong>회사:</strong> {user.company.name}
            </p>
          </div>
        )}
      </div>

      <hr />

      <div className={styles.section}>
        <input
          type="text"
          placeholder="게시글 제목"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="게시글 내용"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          className={styles.textarea}
          rows="4"
        />
        <button onClick={handleCreatePost} className={styles.button}>
          게시글 작성하기 (POST)
        </button>
      </div>

      {postResponse && (
        <div className={`${styles.response} ${styles.success}`}>
          게시글이 생성되었습니다! ID: {postResponse.id}
        </div>
      )}

      {error && (
        <div className={`${styles.response} ${styles.error}`}>
          오류: {error}
        </div>
      )}
    </div>
  );
}

export default ApiPractice;*/