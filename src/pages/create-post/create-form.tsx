import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
interface createFormData {
    title: string,
    description: string,
}
export const CreateForm = () => {
   const schema = yup.object().shape({
    title: yup.string().required("you must add a title"),
    description: yup.string().required("you must add a description"),
   });

   const {register,handleSubmit, formState: {errors}} = useForm <createFormData>({
    resolver: yupResolver(schema) ,
   })
   const postsRef = collection(db,"posts");
   const [user] = useAuthState(auth);
   const navigate = useNavigate();
  
   const onCreatePost = async (data: createFormData) => {
       await addDoc(postsRef, {
        title: data.title,
        description: data.description,
        username: user?.displayName,
        userId: user?.uid,
        })

        navigate("/");
  }

  
    return (
        <>
        <div className="create-post">
        <form onSubmit={handleSubmit(onCreatePost)} className="form"> 
        <div>
            <input placeholder="Title..." {...register("title")} />
            </div>
            <p style= {{color: "red"}}>{errors.title?.message}</p>
            <div>
            <textarea placeholder="description..." {...register("description")}></textarea>
            </div>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <div>
            <input type="submit" className="form-button"/>
            </div>
        </form>
        </div>
        </>
    )

}