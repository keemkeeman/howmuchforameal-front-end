import { useSetRecoilState } from "recoil";
import { plusOpenState } from "../recoil/modalAtoms";

const BackDrop = ({ toggle }) => {
  const setPlusOpen = useSetRecoilState(plusOpenState);
  return (
    <div
      className="fixed top-0 left-0 w-[100%] h-[100vh] bg-black opacity-50 z-20"
      onClick={() => {
        toggle && toggle(false);
        setPlusOpen(false);
      }}
    ></div>
  );
};

export default BackDrop;
