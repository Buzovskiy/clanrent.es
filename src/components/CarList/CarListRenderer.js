import {Col} from "react-bootstrap";
import {CategoryItem} from "./categoryItem";
import React from "react";
import {useTranslation} from "react-i18next";

const CarListRenderer = (props) => {
   const {t} = useTranslation();
   return props.carList.map((item, ind) => (
      <Col key={ind} md={4}>
         <CategoryItem
            item={item}
            t={t}
            button_title={props.button_title}
            clickProduct={props.clickProduct}
            module={props.module}
         />
      </Col>
   ))
}

export default CarListRenderer;