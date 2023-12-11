import { useForm, FieldValues } from "react-hook-form";
import axios from "axios";
import { BaseUrl } from "..";

interface LoginData {
  username: string;
  password: string;
}

interface Props {
  setAuthorized(isAuthorized: boolean): void;
}

const Login = ({ setAuthorized }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${BaseUrl}/api/token/`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          username: data.username,
          accessToken: response.data?.access,
          refreshToken: response.data?.refresh,
        })
      );
      setAuthorized(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          {...register("username", { required: true })}
          type="text"
          id="username"
          className="form-control"
        />
        {errors.username?.type === "required" && (
          <p className="text-danger">The username field is required</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          className="form-control"
        />
        {errors.password?.type === "required" && (
          <p className="text-danger">The password field is required</p>
        )}
      </div>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default Login;
