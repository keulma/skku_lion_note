import Note1 from "./list/Note1";
import Note2 from "./list/Note2";
import Note3 from "./list/Note3";
import Note4 from "./list/Firebase_note";
import Note5 from "./list/Firebase_chating"

export const notelists = {
  1: {
    title: "Lecture Note 1",
    description: "리액트의 useState 훅을 사용한 카운터 예제입니다.",
    page: <Note1 />,
    date: "2017-08-31",
  },
  2: {
    title: "Lecture Note 2",
    description: "API와 useState를 이용한 예제",
    page: <Note2 />,
    date: "2025-04-10",
  },
  3: {
    title: "Lecture Note 3",
    description: "종합 예제",
    page: <Note3 />,
    date: "2025-05-08",
  },
  4: {
    title: "Firebase test",
    description: "Firebase todo list",
    page: <Note4/>,
    date: "2025-05-15",
  },
  5: {
    title: "Firebase Chating",
    description: "Firebase onSnapshot",
    page: <Note5/>,
    date: "2025-05-22",
  },
};