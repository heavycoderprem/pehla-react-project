import { getDocs,collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Post } from "./post";

export interface Post {
description: string;
title: string;
userId: string;
username: string;
id: string;

}
export const Main = () => {
    const[postsList,setpostlist] = useState <Post[] | null>(null);
    const postsRef = collection(db,"posts");
    const getPosts =async () => {
        const data = await getDocs(postsRef);
        setpostlist(data.docs.map((doc)=> ({...doc.data(), id: doc.id})) as Post[]
        );
    };
    useEffect(() => {
       getPosts();
    },[]);
   
    return ( 
    <div>
        {postsList?.map((post) => (
        <Post post={post}/>
        ))}
    </div>
    )
}