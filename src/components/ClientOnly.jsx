import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return <>{hasMounted ? children : <Loading />}</>;
};

export default ClientOnly;
