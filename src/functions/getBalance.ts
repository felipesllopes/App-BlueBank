import firestore from "@react-native-firebase/firestore";

export const getBalance = async (
    userUid: string,
    setBalance: (value: React.SetStateAction<number>) => void,
) => {
    firestore()
        .collection("users")
        .doc(userUid)
        .onSnapshot(async val => {
            setBalance((await val.data().balance) || 0);
        });
};
