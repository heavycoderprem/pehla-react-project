import {auth, provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const navigate = useNavigate();
    const signInwithgoogle = async () => {
       const result = await signInWithPopup(auth,provider);
       navigate("/");
    }
    return <div>
        <p>sign in with google to continue</p>
        <button onClick={signInwithgoogle}>sign in with google</button>
    </div>
}