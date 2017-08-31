import React from 'react';

function Square(props) {
    const divStyle = props.mark
        ? {
            backgroundColor: "green"
        }
        : null;
    return (
        <button className="square" onClick={props.onClick} style={divStyle}>
            {props.value}
        </button>
    );
}

export default Square;