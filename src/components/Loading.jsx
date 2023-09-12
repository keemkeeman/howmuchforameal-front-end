import ReactDom from "react-dom";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  const portalElement = document.getElementById("overlays");

  return (
    <>
      {ReactDom.createPortal(
        <div className="h-[100vh] flex justify-center items-center">
          <PuffLoader size={100} color="red" />
        </div>,
        portalElement
      )}
    </>
  );
};

export default Loading;
