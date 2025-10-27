import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
  const [userType, setUserType] = useState(null);

  const clearSession = () => setUserType(null);

  return (
    <SessionContext.Provider value={{ userType, setUserType, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
