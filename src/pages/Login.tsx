import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { register, handleSubmit}= useForm({
    //     defaultValues:{
    //         userId:'A-002',
    //         password:'admin123'
    //     }
    // });

    const [ login ] = useLoginMutation();

    const onSubmit = async(data: FieldValues) =>{
        const toastId= toast.loading('Logging in');

       try {
        const userInfo ={
            id:data.userId,
            password: data.password
        };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({user:user, token:res.data.accessToken}));
        toast.success('Logged in',{id:toastId, duration:2000});

      navigate(`/${user.role}/dashboard`);
       } catch (err) {
        toast.error('Something went wrong',{id:toastId, duration:2000});
       }
    };

    return (
        <PHForm onSubmit={onSubmit}>
            <div>
                <PHInput type="text" name="userId" label="ID:"/>
            </div>
            <div>
                <PHInput type="password" name="password" label="Password"/>
            </div>
            <Button htmlType="submit">Login</Button>
        </PHForm>
    );
};

export default Login;