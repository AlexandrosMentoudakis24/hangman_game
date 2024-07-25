import { useState, useEffect, useRef } from "react";

import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const SinglePlayer = ({
  playerId,
  selectedTeamId,
  initialValue,
  onPlayerDelete,
  onPlayerNameEdit,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const divRef = useRef(null);
  const inputRef = useRef();

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsReadOnly(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={"flex flex-row w-full"}>
      <div
        ref={divRef}
        className={`flex flex-row justify-start items-center border-[5px] ${
          !isReadOnly ? "border-white" : "border-black"
        } text-[25px] bg-transparent w-full px-[10px] py-[5px]`}
      >
        <input
          className={"outline-none bg-transparent w-full"}
          ref={inputRef}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            onPlayerNameEdit(selectedTeamId, playerId, event.target.value);
          }}
          readOnly={isReadOnly}
          maxLength={40}
          type="text"
        />
        {isReadOnly && (
          <button
            onClick={() => {
              setIsReadOnly(false);
              inputRef.current.focus();
            }}
          >
            <MdEdit className={"ml-[10px]"} />
          </button>
        )}
        {!isReadOnly && inputValue.length > 0 && (
          <button
            onClick={() => {
              setInputValue("");
            }}
            className={"hover:text-slate-400 active:text-slate-500"}
          >
            <IoClose className={"ml-[10px]"} size={30} />
          </button>
        )}
      </div>
      <button
        onClick={() => onPlayerDelete(selectedTeamId, playerId)}
        className={"ml-[5px]"}
      >
        <MdDelete color="red" size={30} />
      </button>
    </div>
  );
};

export default SinglePlayer;
