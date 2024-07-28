import { createContext, PropsWithChildren, useState } from "react";

type RegistrationContextType = {
  name: string;
};

interface RegistrationContextInterface {}

export const RegistrationContext =
  createContext<RegistrationContextType | null>(null);

const RegistrationContextProvider = ({ children }: PropsWithChildren) => {
  const [name, setName] = useState<string>("");

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  const contextValue = {
    name,
    onNameChange,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContextProvider;
