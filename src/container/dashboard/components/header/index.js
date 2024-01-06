import React, {useMemo} from "react";
import {Link} from "react-router-dom";

import {Badge} from 'antd';
import {ShoppingCartOutlined} from "@ant-design/icons";

import {Logout} from "../../../auth";
import BackButton from "../../../../components/backButton";
import {BadgeStyle, CartStyle, HeaderStyle} from "./style";

const DashboardHeader = ({ itemCount, setCurrentUserState }) => {

    const totalItems = useMemo(() => Object.values(itemCount).reduce((acc, singleItemCount) => {
        acc += singleItemCount;
        return acc;
    }, 0), [itemCount]);

    return (
      <div {...HeaderStyle}>
          <BackButton />
          <div style={{ flex: 1 }} />
          {totalItems > 0 && (
              <div {...BadgeStyle}>
                  <Badge count={totalItems}>
                      <Link to="cart">
                          <ShoppingCartOutlined {...CartStyle}/>
                      </Link>
                  </Badge>
              </div>
          )}
          {!totalItems && (
              <div {...BadgeStyle}>
                  <Link to="cart">
                      <ShoppingCartOutlined {...CartStyle}/>
                  </Link>
              </div>
          )}
          <Logout setCurrentUserState={setCurrentUserState}/>
      </div>
    )
};

export  default DashboardHeader;