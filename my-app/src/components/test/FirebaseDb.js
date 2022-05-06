import {getDatabase, set, ref, get, child, onValue, DataSnapshot } from "firebase/database";

export const writeUserData = (userId, name, email) => {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
  });
};

export const readUserData = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef,`users` )).then((snapshot) => {
        if(snapshot.exists()){
        const data = snapshot.val();
        console.table(data);
        }else {
            console.log("No data Available");
        }
    }).catch((error) => {
        console.error(error);
    });

    return 
};
