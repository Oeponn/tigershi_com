import React, { useEffect } from "react";

export default function CurationWrapper(props) {

    return (
        <div className={props.addClass ? "product-box".concat(" ", props.addClass): "product-box"}>
            {/* <div className="corner left">⌈</div>
            <div className="corner right">⌉</div> */}
            <p>PRODUCT</p>
            {props.innerContent}


            {/* <div className="corner left">⌊</div>
            <div className="corner right">⌋</div> */}
        </div>
    )
}