import { createContext, ReactNode, useContext, useState } from "react";
import { CustomizedType } from "../types/customizedType";

type CustomizedContextType = {
  customized: CustomizedType;
  setCustomized: (customized: CustomizedType) => void;
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
  const [customized, setCustomized] = useState<CustomizedType>({});

  return (
    <CustomizedContext.Provider value={{ customized, setCustomized }}>
      {children}
    </CustomizedContext.Provider>
  );
};
