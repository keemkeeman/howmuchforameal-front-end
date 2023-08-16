import React, { useState, useEffect } from "react";
import Loader from "./Loading";

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return <>{hasMounted ? children : <Loader />}</>;
};

export default ClientOnly;
