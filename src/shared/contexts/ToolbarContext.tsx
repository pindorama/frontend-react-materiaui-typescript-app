import { createContext, useCallback, useContext, useState } from 'react';

interface IToolbarOption {
  icon: string;
  path: string;
}

interface IToolbarContextData {

  toolbarOptions: IToolbarOption[];
  setToolbarOptions: (newToolbarOptions: IToolbarOption[]) => void;
}

const ToolbarContext = createContext({} as IToolbarContextData);

export const useToolbarContext = () => {
  return useContext(ToolbarContext);
};


interface IToolbarProps {

  children:  React.ReactNode
}


export const ToolbarProvider: React.FC<IToolbarProps>= ({ children }) => {
  const [toolbarOptions, setToolbarOptions] = useState<IToolbarOption[]>([]);



  const handleSetToolbarOptions = useCallback((newToolbarOptions: IToolbarOption[]) => {
    setToolbarOptions(newToolbarOptions);
  }, []);

  return (
    <ToolbarContext.Provider value={{toolbarOptions,  setToolbarOptions: handleSetToolbarOptions }}>
      {children}
    </ToolbarContext.Provider>
  );
};