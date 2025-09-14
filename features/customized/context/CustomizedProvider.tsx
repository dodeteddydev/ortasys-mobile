import { createContext, ReactNode, useContext, useState } from "react";
import { Customized } from "../types/customized";

type CustomizedContextType = {
  customized: Customized;
  setCustomized: (customized: Customized) => void;
};

const CustomizedContext = createContext<CustomizedContextType | undefined>(
  undefined
);

export const useCustomizedContext = () => {
  const context = useContext(CustomizedContext);

  if (!context) {
    throw new Error(
      "useCustomizedContext must be used within a CustomizedProvider"
    );
  }

  return context;
};

export const CustomizedProvider = ({ children }: { children: ReactNode }) => {
  const [customized, setCustomized] = useState<Customized>({});

  return (
    <CustomizedContext.Provider value={{ customized, setCustomized }}>
      {children}
    </CustomizedContext.Provider>
  );
};
