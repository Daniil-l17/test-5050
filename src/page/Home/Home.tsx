import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../redux/api/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logout, useAuth } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/liked/liked";
import { Loader } from "../../components/Loader/Loader";
import { ShowMore } from "../../components/showMore/ShowMore";
import { MdExitToApp } from "react-icons/md";

export const Home = () => {
  const [page, setPage] = useState(8);
  const { data, isLoading } = useGetUserQuery(page);
  const navigate = useNavigate();
  const user = useAppSelector(useAuth);
  const db = useDispatch();
  const { liked } = useAppSelector((state) => state.liked);
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  if(!user) return null

  return (
    <div>
      <div className=" relative flex justify-center items-center flex-col bg-[#512689] w-full min-h-[265px]">
        <button
          onClick={() => db(logout())}
          className=" max-[620px]:hidden border absolute top-8 right-14 border-solid border-[#F8F8F8] rounded-lg px-4 py-2 text-white"
        >
          Выход
        </button>
        <MdExitToApp
          onClick={() => db(logout())}
          className={
            " text-[#F8F8F8] hidden max-[620px]:flex absolute top-8 right-8 text-2xl"
          }
        />
        <h2 className=" mb-4 text-6xl max-[620px]:text-4xl text-[#F8F8F8]">
          Наша команда
        </h2>
        <p className=" leading-6 w-full max-[620px]:text-base max-w-[840px] text-center text-[#F8F8F8] text-xl">
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных
          ситуаций.{" "}
        </p>
      </div>
      <div className="m-auto min-h-[555px] justify-center flex-wrap flex gap-5 w-full max-w-[1280px] mt-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader />
          </div>
        ) : (
          data?.data.map((item) => (
            <div
              key={item.id}
              className="flex  pb-5 shadow-xl flex-col w-[300px] rounded-xl"
            >
              <Link to={`/user/${item.id}`}>
                <div className="pt-9 flex-col pb-3 flex items-center">
                  <img
                    src={item.avatar}
                    className=" w-[124px] h-[124px] rounded-[50%]"
                    alt=""
                  />
                  <h2 className=" text-[#151317] mt-4 text-xl">
                    {item.first_name} {item.last_name}
                  </h2>
                </div>
              </Link>
              <div className=" mt-1 flex justify-end px-5">
                <div
                  onClick={() => {
                    db(actions.addLiked({ id: item.id }));
                  }}
                  className="flex z-10 cursor-pointer justify-center items-center rounded w-[30px] h-[28px] bg-[#F8F8F8]"
                >
                  {liked.some((el) => el.id === item.id) ? (
                    <FaHeart className=" text-[#512689]" />
                  ) : (
                    <FaRegHeart className=" text-[#151317]" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full pb-6 mt-8 flex justify-center">
        <ShowMore setPage={setPage} />
      </div>
    </div>
  );
};
