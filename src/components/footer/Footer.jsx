import FooterButton from "./FooterButton";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { RiNumbersLine } from "react-icons/ri";
import { BsClipboardCheck } from "react-icons/bs";
import { GoPerson } from "react-icons/go";

const Footer = ({ setOpenAddSpend }) => {
  return (
    <div className="fixed flex px-4 bottom-0 lg:right-1 border-t h-16 w-full bg-white z-10 shadow-md">
      <div
        className="
          flex 
          w-full
          justify-between
          items-center
          px-4
        "
      >
        <FooterButton icon={<AiOutlineHome size={24} />} title="홈" />
        <FooterButton icon={<RiNumbersLine size={24} />} title="랭킹" />
        <div
          onClick={() => {
            setOpenAddSpend(true);
          }}
        >
          <FooterButton icon={<AiOutlinePlusCircle size={24} />} title="추가" />
        </div>
        <FooterButton icon={<BsClipboardCheck size={24} />} title="커뮤니티" />
        <FooterButton icon={<GoPerson size={24} />} title="프로필" />
      </div>
    </div>
  );
};

export default Footer;
