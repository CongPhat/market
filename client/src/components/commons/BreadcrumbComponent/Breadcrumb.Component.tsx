import React, {useContext, useState} from "react";
import "./styles.scss";
import {Link} from "react-router-dom";

interface Ibreadcrumb {
    name: any;
    link: string;
    active: boolean;
}

interface IProps {
    breadCrumbs: Array<Ibreadcrumb>;
}

const BreadCrumbComponent = (props: IProps) => {
    return (
        <React.Fragment>
            <div className="breadcrumbs-area">
                <ul className="breadcrumb bg-transparent my-breadCrumb-component">
                    {props.breadCrumbs.map((item: Ibreadcrumb) => {
                        if (item.active) {
                            return (
                                <li
                                    // className="breadcrumb-item active text-capitalize"
                                    aria-current="page"
                                >
                                    {/*<h3> */}
                                    {item.name}
                                    {/*</h3>*/}
                                </li>
                            );
                        } else {
                            return (
                                <li>
                                    <Link to={item.link}>{item.name}</Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </React.Fragment>
    );
};

function areEqual(prevProps, nextProps) {
    /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
    if (prevProps.breadCrumbs != nextProps.breadCrumbs) {
        return false;
    }
    return true;
}

export default React.memo(BreadCrumbComponent, areEqual);
