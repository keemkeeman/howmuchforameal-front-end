import FooterButton from "./FooterButton";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { RiNumbersLine } from "react-icons/ri";
import { BsClipboardCheck } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { useSetRecoilState } from "recoil";
import { openAddSpendState } from "../../recoil/modalAtoms";

const Footer = () => {
  const setOpenAddSpend = useSetRecoilState(openAddSpendState);
  return (
    <div className="fixed flex px-10 right-0 h-16 w-full lg:w-[50%] z-10 mt-1">
      <div
        className="
          flex 
          w-full
          justify-between
          items-center
          bg-white
          px-5
          rounded-full
          shadow-md
          border
        "
      >
        <FooterButton icon={<AiOutlineHome size={24} />} title="홈" url="/" />
        <FooterButton
          icon={<RiNumbersLine size={24} />}
          title="랭킹"
          url="/ranking"
        />
        <FooterButton
          icon={<AiOutlinePlusCircle size={24} />}
          title="추가"
          toggleAction={setOpenAddSpend}
        />
        <FooterButton
          icon={<BsClipboardCheck size={24} />}
          title="커뮤니티"
          url="/community"
        />
        <FooterButton
          icon={<GoPerson size={24} />}
          title="내 정보"
          url="/login"
        />
      </div>
    </div>
  );
};

export default Footer;
