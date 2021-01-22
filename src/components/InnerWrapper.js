import React from "react";

export default function InnerWrapper(props) {

    return (
        <div className={props.addClass ? "inner".concat(" ", props.addClass): "inner"}>
            <div className="corner left">⌈</div>
            <div className="corner right">⌉</div>

            {props.innerContent}


            <div className="corner left">⌊</div>
            <div className="corner right">⌋</div>
        </div>
    )
}