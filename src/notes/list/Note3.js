import React, { useState, useEffect } from "react";
import styles from "../css/PropsPractice.module.css";

// UserCard 컴포넌트를 완성하세요
function UserCard({name, age, likes, onlike}) {
  return (
    /*************** EDIT START ***************/
    <div className={styles.userCard}>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{likes}</p>
      <button onClick = {onlike}>좋아요❤️</button>
    </div>
  );
  /*************** EDIT END ***************/
}

function PropsPractice(props) {
  /*************** EDIT START ***************/
  // Alice와 Bob의 likes를 위한 state를 선언하세요
  const [AliceLikes, setAlice] = useState(0)
  const [BobLikes, setBob] = useState(0)

  // Alice의 좋아요를 2씩 증가시키는 함수
  const AliceClick = () => setAlice((AliceLikes) + 2);
  // Bob의 좋아요를 1씩 증가시키는 함수
  const BobClick = () => setBob(BobLikes + 1);
  // useEffect를 사용하여  Bob과 Alice의 좋아요 수가 10이 넘고 동시에 같다면 alert을 띄우세요
  useEffect(() => {
    if (AliceLikes > 10 && BobLikes > 10 && AliceLikes === BobLikes) {
      alert("Alice > 10 && Bob > 10 && Alice == Bob");
    }
  }, [AliceLikes, BobLikes]);

  /*************** EDIT END ***************/
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/*************** EDIT START ***************/}
      <UserCard 
        name = 'Alice'
        age = {22}
        likes = {AliceLikes}
        onlike = {AliceClick}
      />
      <UserCard 
        name = 'Bob'
        age = {25}
        likes = {BobLikes}
        onlike = {BobClick}
      />
      {/*************** EDIT END ***************/}
    </div>
  );
}

export default PropsPractice;
