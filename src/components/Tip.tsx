import React, { Component } from "react";

import "../style/Tip.css";

interface State {
  compact: boolean;
  title: string;
  summary: string; // summary from openai if not set
  mindmap: string;
  emoji: string;
  hasQuiz: boolean;
  tags: string[];
  rate: number;
  highlightOnly: boolean;
  color: string;
  highlightType: string;
}

interface Props {
  onConfirm: (comment: {   
    title: string;
    summary: string; // summary from openai if not set
    mindmap: string;
    emoji: string;
    hasQuiz: boolean;
    tags: string[];
    rate: number;
    color: string;
    highlightType: string;
    highlightOnly: boolean; 
  }) => void;
  onOpen: () => void;
  onUpdate?: () => void;
}

export class Tip extends Component<Props, State> {
  state: State = {
    compact: true,
    title: '',
    summary: '',// summary from openai if not set
    mindmap: '',
    emoji: '',
    hasQuiz: false,
    tags:  [],
    rate: 0,
    highlightOnly: false,
    color: 'info',
    highlightType: 'highlight',
  };

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, title, summary, mindmap, emoji, hasQuiz, tags, rate, highlightOnly, color, highlightType } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div
            className="Tip__compact"
            onClick={() => {
              onOpen();
              this.setState({ compact: false });
            }}
          >
            Add highlight
          </div>
        ) : (
          <form
            className="Tip__card"
            onSubmit={(event) => {
              event.preventDefault();
              onConfirm({ title, summary, mindmap, emoji, hasQuiz, tags, rate, highlightOnly, color, highlightType });
            }}
          >
            <div>
              <textarea
                placeholder="Note title"
                autoFocus
                rows={1}
                value={title}
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                } 
              />
            </div>
             <div>
               <textarea
                placeholder="Your comment"
                autoFocus
                value={summary}
                onChange={(event) =>
                  this.setState({ summary: event.target.value })
                }
               
              />

              <div>
                {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map((_emoji) => (
                  <label key={_emoji}>
                    <input
                      checked={emoji === _emoji}
                      type="radio"
                      name="emoji"
                      value={_emoji}
                      onChange={(event) =>
                        this.setState({ emoji: event.target.value })
                      }
                    />
                    {_emoji}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
