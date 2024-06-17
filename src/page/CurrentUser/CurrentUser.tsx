import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../redux/api/api";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logout, useAuth } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";

export const CurrentUser = () => {
  const { id } = useParams();
  const { data, error } = useGetCurrentUserQuery(+id!);
  const navigate = useNavigate();
  const user = useAppSelector(useAuth);
  const db = useDispatch();

  useEffect(() => {
    if (error) {
      navigate("/");
    } else if (!user) {
      navigate("/auth");
    }
  }, [error, user]);

  if(!user) return null

  return (
    <div>
      <div className=" bg-[#512689] max-[1220px]:py-16 max-[1220px]:flex-col-reverse max-[1220px]:pl-0 items-center w-full pl-[180px] flex gap-8 max-[1220px]:gap-4 min-h-[265px]">
        <div className="fixed left-14 flex justify-between right-14 top-7">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-[#F8F8F8] rounded-lg border border-solid border-[#F8F8F8]"
          >
            Назад
          </button>
          <button
            onClick={() => db(logout())}
            className="px-4 text-[#F8F8F8] py-2 rounded-lg border border-solid border-[#F8F8F8]"
          >
            Выход
          </button>
        </div>
        <img
          className="w-[187px] rounded-[50%] h-[187px]"
          src={data?.avatar}
          alt={data?.first_name}
        />
        <div className="flex flex-col max-[1220px]:mt-6 gap-4">
          <h2 className="text-[64px] max-[1220px]:text-[32px] text-white ">
            {data?.first_name} {data?.last_name}
          </h2>
          <p className="max-[1220px]:text-center max-[1220px]:text-[20px] text-white text-[32px]">
            Партнер
          </p>
        </div>
      </div>

      <div className="flex max-[1220px]:flex-col-reverse max-[1220px]:gap-4 max-[1220px]:px-4 justify-between py-12 px-44">
        <div className="flex pr-3 w-full max-w-[630px] flex-col gap-5 ">
          <p>
            Клиенты видят в нем эксперта по вопросам разработки комплексных решений
            финансовых продуктов, включая такие аспекты, как организационная
            структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам
            лучше понимать структуру рисков их бизнеса, улучшать процессы за счет
            применения новейших технологий и увеличивать продажи, используя самые
            современные аналитические инструменты.
          </p>
          <p>
            В работе с клиентами недостаточно просто решить конкретную проблему или
            помочь справиться с трудностями. Не менее важно уделять внимание обмену
            знаниями: "Один из самых позитивных моментов — это осознание того, что ты
            помог клиенту перейти на совершенно новый уровень компетентности,
            уверенность в том, что после окончания проекта у клиента есть все
            необходимое, чтобы дальше развиваться самостоятельно".
          </p>
          <p>
            Помимо разнообразных проектов для клиентов финансового сектора, Сорин
            ведет активную предпринимательскую деятельность. Он является совладельцем
            сети клиник эстетической медицины в Швейцарии, предлагающей инновационный
            подход к красоте, а также инвестором других бизнес-проектов
          </p>
        </div>
        <div className="flex gap-6 flex-col">
          <div className="flex items-center gap-2">
            <img src="/Vector (1).png" alt="" />
            <p>+7 (954) 333-44-55</p>
          </div>
          <div className="flex items-center gap-2">
            <img src="/Vector (2).png" alt="" />
            <p>{data?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
