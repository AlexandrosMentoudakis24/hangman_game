import { Link } from "react-router-dom";

const MenuOption = ({ title, href }) => {
  return (
    <Link
      to={href}
      className={
        "text-[30px] tracking-[1px] text-black hover:text-white hover:scale-x-110 hover:scale-y-110 hover:bg-black rounded-[10px] px-[30px] py-[10px]"
      }
    >
      {title}
    </Link>
  );
};

export default MenuOption;
