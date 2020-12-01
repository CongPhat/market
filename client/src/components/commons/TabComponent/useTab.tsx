import React, { useMemo, useRef } from "react";
interface IUseTab {
  setTabActive: (id: number) => void;
  getTabActive: () => void;
  refTab: any;
}
interface IGetTabActive {
  keyTab: number;
}
const useTab: () => IUseTab = () => {
  const refTab = useRef({
    triggerSetTabActive: null,
    triggerGetTabActive: null,
  });

  return useMemo(() => {
    return {
      refTab,
      setTabActive: (idActive: number) =>
        refTab.current.triggerSetTabActive(idActive),
      getTabActive: (): (() => IGetTabActive) =>
        refTab.current.triggerGetTabActive(),
    };
  }, []);
};
export default useTab;
