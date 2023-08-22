import { useNavigate } from "react-router-dom";

const FooterButton = ({ icon, title, toggleAction, url }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        toggleAction ? toggleAction(true) : navigate(url);
      }}
      className="flex gap-1 items-center cursor-pointer hover:font-bold"
    >
      {icon}
      <p className="text-[14px]">{title}</p>
    </div>
  );
};

export default FooterButton;
