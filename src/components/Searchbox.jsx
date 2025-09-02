import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";

const Searchbox = ({ onOpen, filterContacts }) => {
  return (
    <div className="mx-4 flex gap-2">
      <div className="flex flex-grow items-center">
        <IoSearch className="absolute ml-2 text-3xl text-white" />
        <input
          onChange={filterContacts}
          type="text"
          placeholder="Search Contact"
          className="relative h-10 flex-grow rounded-md border border-white bg-transparent pl-11 text-white"
        />
      </div>
      <IoIosAddCircle
        className="cursor-pointer text-5xl text-white"
        onClick={onOpen}
      />
    </div>
  );
};

export default Searchbox;
