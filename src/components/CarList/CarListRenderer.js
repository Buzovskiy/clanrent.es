import {Col} from "react-bootstrap";
import {CategoryItem} from "./categoryItem";
import React from "react";
import {useTranslation} from "react-i18next";

const CarListRenderer = (props) => {
   const {t} = useTranslation();
   return props.carList.map((item, ind) => (
      <Col key={ind} md={4}>
         <CategoryItem item={item} t={t} clickProduct={props.clickProduct}/>
      </Col>
   ))
}

export default CarListRenderer;