import  { Dispatch, SetStateAction } from 'react';
import { GoChevronDown } from 'react-icons/go';

export const ShowMore = ({ setPage }: { setPage: Dispatch<SetStateAction<number>> }) => {
  return (
    <button
      onClick={() => {setPage(12)}}
      className=" rounded-lg py-2 flex items-center gap-2 px-4 border border-solid border-[#151317]">
      Показать еще <GoChevronDown className="!text-xl" />
    </button>
  );
};
