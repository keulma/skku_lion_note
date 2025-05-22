//onSnapshot(collection, (snapshot)=>{}) collection data를 snapshot 함수로 전부 전달 collection 내 데이터 변화 감지 후 snapshot에 다시 전달
import {useState, useEffect} from "react";
import {db} from "../../firebase/firebase";
import { 
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot, 
    query,
    orderBy
} from "firebase/firestore";

const messagesRef = collection(db, 'messages'); //messages를 바꿀경우 해당 컬렉션과 동일한 사람과 채팅 가능
const currentUser = 'huh';

export default function ChatApp(){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessagesInput] = useState('');

    useEffect(()=>{
        //addDoc(messagesRef, {name : 'hi'});
        const q = query(messagesRef, orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, (snapshot)=>{
            setMessages(snapshot.docs.map((doc) => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            }))
        });

        return () => unsubscribe();
    },[]);

    const submitMessage = async(e) => {
        e.preventDefault();
        if(messageInput.trim()){
            await addDoc(messagesRef, {
                text : messageInput,
                username : currentUser,
                createdAt : serverTimestamp()
            })
            setMessagesInput('');

        }
    }


    return (<div
        style = {{
            // 화면 css
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            padding: "20px",
            boxSizing: "border-box",
        }}>
        <div
            style={{
                // 메시지 리스트 박스 css
            flexGrow: 1,
            overflowY: "auto",
            marginBottom: "10px",
            border: "1px solid #ccc",
            padding: "10px",
            }}
        >
            {
                messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style = {{
                             // 단일 메시지 css
                            marginBottom: "5px",
                            padding: "8px",
                            borderBottom: "1px solid #eee",
                            backgroundColor: msg.username == currentUser ? '#DCT8C6' : '#ffffff', //  유저 이름에 따른 메시지 배경색 변경
                            textAlign: msg.username == currentUser ? 'right' : 'left', // 내가 보낸 메시지면 메시지 오른쪽 정렬
                        }}
                    >
                        {msg.text}
                        <div
                            style = {{
                                // 사용자 이름 css
                                fontSize: "0.8em", color: "#777" 
                            }}    
                        >
                            {msg.username}
                        </div>
                    </div>
                ))
            }
        </div>
        <form
            onSubmit = {submitMessage}
            style = {{
                display : 'flex'
            }}
        >
            <input
                type = "text"
                value = {messageInput}
                onChange = {(e) => setMessagesInput(e.target.value)}
                placeholder = "input message"
                style = {{
                    // 입력창 css
                    flexGrow: 1, padding: "10px", marginRight: "10px"       
                }}
            />
            <button type = "submit" style = {{
                padding : '10px'
            }}>
                send
            </button>
        </form>
    </div>)
}