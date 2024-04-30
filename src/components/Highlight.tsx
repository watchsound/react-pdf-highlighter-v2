import React, { Component } from "react";

import "../style/Highlight.css";

import type { LTWHP } from "../types.js";

interface Props {
  position: {
    boundingRect: LTWHP;
    rects: Array<LTWHP>;
    highlightType: string;
    color: string;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  comment: {
    emoji: string;
    text: string;
  };
  isScrolledTo: boolean;
}

export class Highlight extends Component<Props> {
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo,
    } = this.props;

    const { rects, boundingRect, highlightType, color } = position;

    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        {comment ? (
          <div
            className="Highlight__emoji"
            style={{
              left: 20,
              top: boundingRect.top,
            }}
          >
            {comment.emoji}
          </div>
        ) : null}
        <div className="Highlight__parts">
          {rects.map((rect, index) => { 
            let { left, top,width, height } = rect;  
            if (highlightType == 'underline') { top = top +height-1; height = 2; }
            if (highlightType == 'dashline') { top = top +height-1; height = 0; }
            if (highlightType == 'strikeline') { top = top +height/2; height = 2; }
            return (
              <div
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                key={index}
                style={{ left, top, width, height }}
                className={`Highlight__part Highlight__${highlightType} Highlight__color_${color}`}
              />
            )}
          )}
        </div>
      </div>
    );
  }
}

export default Highlight;
