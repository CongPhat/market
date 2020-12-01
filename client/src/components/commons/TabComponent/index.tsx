import React, { Suspense, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router";
import Loading from "./Loading";
const queryString = require("query-string");
import "./style.scss";
interface Iprops {
  children: any;
  defaultActive?: number;
  saveHistory?: boolean;
  register?: any;
  onChange?: (id: number) => void;
  column?: boolean;
}
interface IActive {
  memoIdActive: Array<number>;
  idActive: number;
  indexIdActive: number;
}

const TabComponent = ({
  children,
  defaultActive,
  saveHistory,
  register,
  onChange,
  column,
}: Iprops) => {
  let registerCurrent = null;
  if (register) registerCurrent = register.refTab.current;
  const history = useHistory();
  const childrenNew = children.length > 0 ? children : [children];

  const convertValuesReceive = useCallback(
    (index: number, id: number, arr?: Array<number>) => {
      const valuesReceive: IActive = {
        indexIdActive: index,
        idActive: id,
        memoIdActive: arr || [id],
      };
      return valuesReceive;
    },
    []
  );

  const elementReceived = useCallback((id: number) => {
    const indexElementFind = childrenNew.findIndex(
      (item) => item.props.keyTab == id
    );
    if (indexElementFind == -1) {
      throw new Error("Key tab not found");
    }
    const idActive = childrenNew[indexElementFind].props.keyTab;
    interface IElementReceived {
      idActive: number;
      indexElementFind: number;
    }
    const data: IElementReceived = {
      idActive,
      indexElementFind,
    };
    return data;
  }, []);

  const getElementByDefault = useCallback(() => {
    const { indexElementFind, idActive } = elementReceived(defaultActive);
    return convertValuesReceive(indexElementFind, idActive);
  }, []);

  const getElement = useCallback(() => {
    const { tab } = queryString.parse(history.location.search);
    if (saveHistory && tab) {
      const { indexElementFind, idActive } = elementReceived(parseInt(tab));
      return convertValuesReceive(indexElementFind, idActive);
    }
    return convertValuesReceive(0, childrenNew[0].props.keyTab);
  }, []);

  const sizeTabLine = useMemo(() => 100 / childrenNew.length, []);
  const initialActive = useMemo(() => {
    return defaultActive ? getElementByDefault() : getElement();
  }, []);

  const [active, setActive] = useState<IActive>(initialActive);

  const handleChangeTab = (itemId: any, index: number) => {
    if (active.idActive == itemId) return;
    onChange && onChange(itemId);
    setActive((pre) => {
      const arrayNew = [...pre.memoIdActive.filter((x) => x != itemId), itemId];
      return convertValuesReceive(index, itemId, arrayNew);
    });
    saveHistory && history.push(history.location.pathname + `?tab=${itemId}`);
  };

  //register
  if (registerCurrent) {
    registerCurrent.triggerSetTabActive = (id) => {
      const getIndexTabById = childrenNew.findIndex(
        (x) => x.props.keyTab == id
      );
      if (getIndexTabById == -1) throw new Error("Key tab not found");
      handleChangeTab(id, getIndexTabById);
    };

    registerCurrent.triggerGetTabActive = () => {
      return {
        keyTab: active.idActive,
      };
    };
  }

  return (
    <div className={`tab ${column && "tab-column w-1/2"}`}>
      <div className="tab-header">
        <ul>
          {childrenNew.map((item, index) => (
            <li
              key={index}
              onClick={() => handleChangeTab(item.props.keyTab, index)}
              className={`${
                index == active.indexIdActive && "tab-header-active"
              }`}
            >
              {item.props.title}
            </li>
          ))}
        </ul>
        <div
          className="tab-line"
          style={
            column
              ? {
                  height: `${sizeTabLine}%`,
                  top: `${active.indexIdActive * sizeTabLine}%`,
                }
              : {
                  width: `${sizeTabLine}%`,
                  left: `${active.indexIdActive * sizeTabLine}%`,
                }
          }
        ></div>
      </div>
      <div className="tab-content">
        {childrenNew.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item.props.keyTab == active.idActive ? "active" : "unactive"
              }
            >
              {item.props.reload &&
              item.props.keyTab !=
                active.idActive ? null : active.memoIdActive.find(
                  (x) => item.props.keyTab == x
                ) ? (
                <Suspense fallback={<Loading />}>{item}</Suspense>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(TabComponent);
