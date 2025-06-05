import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import {db} from "../../firebase/firebaseConfig";
// addDoc
// setDoc  create

// getDoc 
// getDocs read

// updateDoc update

// deleteDoc delete

// doc 한 단위
// collection 테이블 단위위

const DB_TABLE_NAME = "todo";

export default function Page(){
    const [toDo, setToDos] = useState([]);
    const [input, setInput] = useState();

    const handleSetData = async () => {
        const res1 = await addDoc(
            collection(db, DB_TABLE_NAME),
            {title : 'test', description : 'test1234'});
            
            console.log(res1);
        const res2 = await setDoc(doc(db, DB_TABLE_NAME, "1"),{title : 'test', description : 'test1234'});
        console.log(res2);
    }

    const handleGetData = async () => {
        const res = await getDoc(doc(db, DB_TABLE_NAME, "1"));
        const data = res.data()
        data.id = res.id;
        console.log(data);

        const res2 = await getDocs(collection(db, DB_TABLE_NAME));
        
        const datas = res2.docs.map((el) => {
            return {
                id : el.id, 
                ...el.data()
            }
        });
        console.log(datas)
    }

    const handleUpdateData = async () => {
        const res = await updateDoc(doc(db, DB_TABLE_NAME, "1"),{name : 'hi'}); //db, table, 원본 키값 & 수정 키값값
        console.log(res);

    }

    const handleDeleteData = async () => {
        const res = await deleteDoc(doc(db, DB_TABLE_NAME, "1")); //db, table, 삭제하고자 하는 키값
        console.log(res);

    }

    const setTodo = () => {
        addDoc(collection(db, DB_TABLE_NAME), {list : input, complete : false})
    }
    const getTodo = async () => {
        const res = await getDocs(collection(db, DB_TABLE_NAME))
        setToDos(res.docs.map((el) => {
            return {
                id : el.id,
                ...el.data()
            }
        }))
    }    
    const updateTodo = async (id) => {
        const res = await updateDoc(doc(db, DB_TABLE_NAME, id),{complete : true});
        console.log(res);

    }

    const deleteTodo = async (id) => {
        const res = await deleteDoc(doc(db, DB_TABLE_NAME, id));
        console.log(res);

    }
    return (<div>
        <p>
            <input placeholder = "task" onChange = {(e) => setInput(e.target.value)} />
            <button onClick = {setTodo}>add task</button>
        </p>
        <button onClick = {getTodo}>call task</button>
        {toDo.map(el => <div>{el.list}<p>
                <button onClick = {() => {updateTodo(el.id)}}>완료</button>
                <button onClick = {() => {deleteTodo(el.id)}}>삭제</button>
            </p>
        </div>)}
    </div>)
}