import React, { Suspense } from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal/Modal";
import Loading from "./Loading";
interface ILoading {}

const ModalLazyLoadComponent = (props: ModalProps & any) => {
  return (
    <Modal {...props}>
      <Suspense fallback={props.loading || <Loading />}>
        {props.children}
      </Suspense>
    </Modal>
  );
};
export default React.memo(ModalLazyLoadComponent);
