import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  collectionGroup,
} from "firebase/firestore";

const getDateString = (date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
const onchangeDate = async (date) => {
  setDate(date, console.log(date));
  const colRef = collection(db, "data"); //28-11-2021 27-11-2021

  const prom = await getDocs(collection(colRef, getDateString(date), "TODO3"));
  console.log(prom.empty);
  //   .then(
  //   (snapshot) => {
  //     snapshot.forEach((document) => {
  //       console.log(document.data());
  //     });
  //   }
  // );
  // if (
  //   currDate.getFullYear() >= date.getFullYear() &&
  //   currDate.getMonth() + 1 >= date.getMonth() + 1 &&
  //   currDate.getDate() > date.getDate()
  // ) {
  //   addDoc(collection(colRef, getDateString(date), "TODO"), { flag: false });
  // } else {
  // }
};
export { getDateString, onchangeDate };
