import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthRegistrMutation } from "../../redux/api/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuth } from "../../redux/auth/auth";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";

interface IFormInput {
  email: string;
  password: number;
  leftPasswprd: number;
  name: string;
}

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();
  const [create, { isLoading }] = useAuthRegistrMutation();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.password === data.leftPasswprd) {
      create({ email: data.email, password: data.password });
    }
  };
  const navigate = useNavigate();
  const user = useAppSelector(useAuth);
  const [password, setPassword] = useState<{
    password: "text" | "password";
    checkPassword: "text" | "password";
  }>({
    password: "password",
    checkPassword: "password"
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className=" min-h-[100vh] flex justify-center items-center ">
      <div className=" rounded-2xl shadow-md p-4  w-full max-w-[500px]">
        <h2 className=" text-xl">Регестрация</h2>
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-4">
          <div>
            <h3 className=" text-base">Имя</h3>
            <input
              {...register("name", { required: true })}
              className=" mt-2 w-full bg-[#F8F8F8] rounded-lg px-3 py-2"
              type="text"
              placeholder="Введите имя"
            />
            {errors.name && <p className=" text-[#FF6161] text-sm mt-1">Ошибка</p>}
          </div>
          <div className=" mt-4">
            <h3 className=" text-base">Электроная почта</h3>
            <input
              {...register("email", { required: true })}
              className=" mt-2 w-full bg-[#F8F8F8] rounded-lg px-3 py-2"
              type="text"
              placeholder="Введите email"
            />
            {errors.email && <p className=" text-[#FF6161] text-sm mt-1">Ошибка</p>}
          </div>
          <div className=" mt-4">
            <h3 className=" text-base">Пароль</h3>
            <div className="flex  items-center mt-2 w-full bg-[#F8F8F8] rounded-lg px-3 py-2">
              <input
                {...register("password", { required: true })}
                className=" w-[85%]"
                type={password.password}
                placeholder="Введите пароль"
              />
              {password.password === "text" ? (
                <FaRegEye
                  onClick={() =>
                    setPassword((prev) => ({
                      ...prev,
                      password: "password"
                    }))
                  }
                  className=" ml-auto cursor-pointer text-[#808185] text-xl"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() =>
                    setPassword((prev) => ({ ...prev, password: "text" }))
                  }
                  className=" ml-auto cursor-pointer text-[#808185] text-xl"
                />
              )}
            </div>
            {errors.password && (
              <p className=" text-[#FF6161] text-sm mt-1">Ошибка</p>
            )}
          </div>
          <div className=" mt-4">
            <h3 className=" text-base">Подтвердите пароль</h3>
            <div className="flex items-center mt-2 w-full bg-[#F8F8F8] rounded-lg px-3 py-2">
              <input
                {...register("leftPasswprd", { required: true })}
                className=" w-[85%]"
                type={password.checkPassword}
                placeholder="Введите пароль"
              />
              {password.checkPassword === "text" ? (
                <FaRegEye
                  onClick={() =>
                    setPassword((prev) => ({
                      ...prev,
                      checkPassword: "password"
                    }))
                  }
                  className=" ml-auto cursor-pointer text-[#808185] text-xl"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() =>
                    setPassword((prev) => ({ ...prev, checkPassword: "text" }))
                  }
                  className=" ml-auto cursor-pointer text-[#808185] text-xl"
                />
              )}
            </div>
            {errors.leftPasswprd && (
              <p className=" text-[#FF6161] text-sm mt-1">Ошибка</p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className=" rounded-lg px-2 py-3 bg-[#512689] text-white w-full mt-6"
          >
            Зарегестрироваться
          </button>
        </form>
      </div>
    </div>
  );
};
