import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font hidden md:block">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-lg">한끼얼마</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 howmuchforameal — @keemkeeman
        </p>
        <span className="inline-flex text-lg sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          🧐
        </span>
      </div>
    </footer>
  );
};

export default Footer;
