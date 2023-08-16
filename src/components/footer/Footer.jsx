import Container from "../Container";
import FooterButton from "./FooterButton";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { RiNumbersLine } from "react-icons/ri";
import { BsClipboardCheck } from "react-icons/bs";
import { GoPerson } from "react-icons/go";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-red-500 z-10 shadow-md">
      <div
        className="
        py-4 
        border-t-[1px]
      "
      >
        <Container>
          <div
            className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
          >
            <FooterButton icon={<AiOutlineHome size={24} />} title="홈" />
            <FooterButton icon={<RiNumbersLine size={24} />} title="랭킹" />
            <FooterButton icon={<AiOutlinePlusCircle size={24} />} title="추가" />
            <FooterButton
              icon={<BsClipboardCheck size={24} />}
              title="커뮤니티"
            />
            <FooterButton icon={<GoPerson size={24} />} title="프로필" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
