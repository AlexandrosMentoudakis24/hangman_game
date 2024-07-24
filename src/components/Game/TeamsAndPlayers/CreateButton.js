import { IoMdAddCircleOutline } from "react-icons/io";

const CreateButton = ({ title, size, onClickHandler, isDisabled }) => {
  const buttonStyle = isDisabled ? "cursor-not-allowed" : "hover:text-white";
  return (
    <button
      onClick={onClickHandler}
      className={`flex flex-col justify-center text-[${
        size * 0.5
      }px] ${buttonStyle} items-center text-black gap-y-[10px]`}
      disabled={isDisabled}
    >
      <IoMdAddCircleOutline size={size} />
      {title}
    </button>
  );
};

export default CreateButton;
