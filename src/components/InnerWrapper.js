import React, { useEffect } from "react";

export default function InnerWrapper(props) {

    return (
        <div className={props.addClass ? "inner".concat(" ", props.addClass): "inner"}>
            <div className="upper left">⌈</div>
            <div className="upper right">⌉</div>

            {props.innerContent}


            <div className="bottom left">⌊</div>
            <div className="bottom right">⌋</div>
        </div>
    )
}