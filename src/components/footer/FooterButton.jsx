const FooterButton = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center hover:font-bold">
      {icon}
      <p className="text-[14px]">{title}</p>
    </div>
  );
};

export default FooterButton;
