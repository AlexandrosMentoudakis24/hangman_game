const DifficultyCard = ({ title, isSelected, onCardTapHanlder }) => {
  const selectedCardStyle = isSelected
    ? "border-[5px] bg-slate-600 text-white border-white"
    : "bg-black text-white hover:bg-slate-600 hover:text-slate-300";

  return (
    <button
      onClick={() => {
        if (isSelected) return;

        onCardTapHanlder(title);
      }}
      className={`w-[30%] h-[50%] ${selectedCardStyle} tracking-[2px] rounded-[20px] text-[40px]`}
      disabled={isSelected}
    >
      {title}
    </button>
  );
};

export default DifficultyCard;
