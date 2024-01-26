import { getDocs,collection, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import {Post as IPost} from "../main/main";
import { db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../../config/firebase";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
interface Props {
    post: IPost;
}
interface Like {
    userId: string;
    likeId: string;
}
export const Post = (props:Props) => {
       const [user] = useAuthState(auth);
       const { post } = props;
       
       const[Likes, setlikes] = useState<Like[] | null>(null);
       
       const likeRef = collection(db,"likes");
       
       const likeDoc = query(likeRef, where("postId", "==", post.id));
       
       const getLikes = async () => {
        const data = await getDocs(likeDoc);
        setlikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));

       }
       
       const addLike = async () => {
        try {
       const newDoc = await addDoc(likeRef, {userId: user?.uid, postId: post.id});
        if(user) {
        setlikes((prev)=> 
        prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] :  [{userId: user.uid, likeId: newDoc.id}]
        );
        }

       }
       catch(err) {
        console.log(err);
       }
    }
    
      
        useEffect (()=> {
        getLikes();
       }, []);

       const hasUserliked = Likes?.find((like) => like.userId === user?.uid );

        const removeLike = async () => {
        try {
        const likeTodeleteQuery = query(
            likeRef,
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
        );
        
        const likeTodeleteData = await getDocs(likeTodeleteQuery);
        const likeId = likeTodeleteData.docs[0].id;
        const likeTodelete = doc(db,"likes", likeId);
        await deleteDoc(likeTodelete);
        if(user) {
        setlikes((prev)=> prev &&  prev.filter((like) => like.likeId !== likeId)
        );
        }

       }
       catch(err) {
        console.log(err);
       }
    }

    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserliked ? removeLike : addLike}>{hasUserliked ? <>&#128078;</> : <>&#128077;</>}</button>
              { Likes && <p>
                    Likes: {Likes?.length}
                </p>
              }         
            </div>
        </div>
    )
}