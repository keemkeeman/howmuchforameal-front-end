import { useNavigate } from "react-router-dom";

const FooterButton = ({ icon, title, toggleAction, url }) => {
  const navigation = useNavigate();
  return (
    <div
      onClick={() => {
        toggleAction ? toggleAction(true) : navigation(url);
      }}
      className="flex flex-col items-center cursor-pointer hover:font-bold"
    >
      {icon}
      <p className="text-[14px]">{title}</p>
    </div>
  );
};

export default FooterButton;
