import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import styles from "../css/CalendarTodoApp.module.css";
import { db } from "../../firebase/firebaseConfig";

export default function CalendarTodoApp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const formattedSelected = format(selectedDate, "yyyy-MM-dd");



  // =========== 구현 1 시작 ===========
  // TODO: Firestore의 todos 컬렉션에 실시간으로 반응하여 데이터를 가져오고, 이를 React 컴포넌트의 상태로 저장하기
  // 사용해야하는 훅: useEffect, onSnapshot, setAllTodos
  // Firebase Collection 이름: todos
  // useEffect와 onSnapshot을 이용해 Firestore의 특정 컬렉션(todos)을 실시간으로 구독해보세요.
  // 컴포넌트가 언마운트 될 때 메모리 누수가 없도록 구독을 해제하는 코드를 추가하세요.
  // onSnapshot을 사용하여 Firestore의 todos 컬렉션을 실시간으로 구독하고, 실시간 구독 데이터를 setAllTodos 함수에 전달하여 allTodos 상태에 저장합니다.
  // =========== 구현 1 끝 ===========
    const todosref = collection(db, "todos");
    useEffect(()=>{
        const unsubscribe = onSnapshot(todosref, (snapshot)=>{
            setAllTodos(snapshot.docs.map((doc) => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            }))
        });

        return () => unsubscribe();
    },[]);
  

  useEffect(() => {
    const filtered = allTodos.filter((todo) => todo.date === formattedSelected);
    setTodos(filtered);
  }, [allTodos, formattedSelected]);

  // =========== 구현 2 시작 ===========
  // TODO: 새로운 할 일을 Firestore의 todos 컬렉션에 추가하는 비동기 함수를 구현하세요.
  // 함수 이름: addTodo
  // 인풋 Parameter: 없음
  // Firebase Collection 이름: todos
  // 사용해야 하는 함수: addDoc, collection, setNewTodo
  // 입력된 텍스트가 공백이 아닐 경우에만 Firestore에 문서를 추가해야 합니다.
  // 문서에는 text, completed, date 필드가 포함되어야 하며, 각각 newTodo, false, formattedSelected을 저장합니다.
  // Firestore에 데이터 추가가 완료되면 setNewTodo함수를 활용하여 입력 필드를 초기화하세요.
  // =========== 구현 2 끝 ===========
    const addTodo = async() => {
        if(newTodo.trim()){
            await addDoc(todosref, {
                text : newTodo,
                completed : false,
                date : formattedSelected
            })
            setNewTodo('');

        }
    }

  // =========== 구현 3 시작 ===========
  // TODO: 특정 ID를 가진 할 일을 Firestore의 todos 컬렉션에서 삭제하는 함수를 작성하세요.
  // 함수 이름: deleteTodo
  // 인풋 Parameter: id
  // Firebase Collection 이름: todos
  // 사용해야 하는 함수: deleteDoc, doc
  // Parameter로 전달받은 id를 이용해 해당 문서를 참조하고, Firestore에서 삭제 요청을 비동기로 실행하세요.
  // 삭제 후에는 별도의 상태 갱신 없이도 실시간 구독으로 UI가 자동 업데이트됩니다.
  // =========== 구현 3 끝 ===========

    const deleteTodo = async (id) => {
        const res = await deleteDoc(doc(db, "todos", id));
    }
  // =========== 구현 4 시작 ===========
  // TODO: 특정 할 일의 완료 상태를 토글하는 함수를 Firestore를 이용해 구현하세요.
  // 함수 이름: toggleComplete 
  // 인풋 Parameter: id, currentStatus
  // Firebase Collection 이름: todos
  // 사용해야 하는 함수: updateDoc, doc
  // 전달받은 id와 currentStatus를 사용해 해당 문서를 참조하고, completed 필드를 현재 상태의 반대로 업데이트하세요.
  // Firestore의 업데이트가 성공하면 실시간 구독을 통해 UI에 반영됩니다.
  // =========== 구현 4 끝 ===========
    const toggleComplete = async (id, currentStatus) => {
        const res = await updateDoc(doc(db, "todos", id),{complete : !currentStatus});
    }

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // =========== 구현 5 시작 ===========
  // TODO: 할 일의 텍스트 내용을 수정한 후 Firestore에 저장하는 기능을 구현하세요.
  // 함수 이름: saveEdit  
  // 인풋 Parameter: id
  // Firebase Collection 이름: todos
  // 사용해야 하는 함수: updateDoc, doc, setEditingId, setEditingText
  // 전달받은 id는 Firestore 문서의 고유 식별자로 사용되며, doc(db, "todos", id)를 통해 해당 문서를 참조합니다.
  // updateDoc 함수에는 두 번째 인자로 업데이트할 필드를 객체 형태로 전달해야 하며, 이 경우 { text: editingText }를 사용합니다.
  // editingText가 공백이 아닌 경우에만 업데이트를 실행하고, 이후 편집 모드에서 벗어나기 위해 editingId와 editingText를 초기화하세요.
  // =========== 구현 5 끝 ===========
    const saveEdit = async (id) => {
        if(editingText.trim()){
        const res = await updateDoc(doc(db, "todos", id),{ text: editingText });
        }   
        setEditingText('');
        setEditingId(null);
    }

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const day = format(date, "yyyy-MM-dd");
    const count = allTodos.filter((todo) => todo.date === day).length;
    return count > 0 ? (
      <div
        style={{ fontSize: "0.7rem", color: "#7b61ff", textAlign: "center" }}
      >
        {count}개
      </div>
    ) : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendarPanel}>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={tileContent}
        />
      </div>

      <div className={styles.todoPanel}>
        <h2 className={styles.title}>
          {format(selectedDate, "yyyy년 MM월 dd일")} 할 일
        </h2>

        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="할 일 입력"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className={styles.button} onClick={addTodo}>
            추가
          </button>
        </div>

        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              {editingId === todo.id ? (
                <>
                  <input
                    className={styles.editInput}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    className={styles.button}
                    onClick={() => saveEdit(todo.id)}
                  >
                    저장
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => setEditingId(null)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`${styles.todoText} ${
                      todo.completed ? styles.completed : ""
                    }`}
                    onClick={() => toggleComplete(todo.id, todo.completed)}
                  >
                    {todo.text}
                  </span>
                  <button
                    className={styles.button}
                    onClick={() => startEdit(todo.id, todo.text)}
                  >
                    수정
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    삭제
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}