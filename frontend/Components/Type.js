class Type extends preact.Component {
    disabledInputRef = preact.createRef();

    state = { clickCount: 0 } 

    get minutes() {
        return padWithZero(parseInt(this.props.time / 60, 10));
    }

    get seconds() {
        return padWithZero(this.props.time % 60);
    }

    startEditing() {
        return () => {
            this.setState({clickCount: this.state.clickCount + 1});
        };
    }

    stopEditing() {
        return e => {
            if (Array.from(e.target.classList).includes('minute-second')) {
                this.setState({clickCount: 0});
            } else if (this.disabledInputRef.current) {
                this.setState({clickCount: 0});
            }
        };
    }

    render() {
        return html`<label
                for=${this.props.type}
                onClick=${this.props.selectType}
                onFocusOut=${this.stopEditing()}
            >
            <input type="radio" id=${this.props.type} name="timer"
                checked=${this.props.checked}
            />
            <span>
                ${
                    this.state.clickCount > 1
                    ? html`<span onFocusOut=${this.stopEditing()}>
                            <${MinuteSecond}
                            time=${this.props.time}
                            onChange=${this.props.onTimeChange}
                        />
                    </span>`
                    : html`<button class="minute-second-disabled" onClick=${this.startEditing()} ref=${this.disabledInputRef} >
                            <input
                            value=${this.minutes}:${this.seconds}
                            type="text"
                            disabled
                        />
                    </button>`
                }
            </span>
        </label>`;
    }
}

function padWithZero(value) {
    const strVal = value.toString();

    if (strVal.length===1) {
        return `0${strVal}`
    }
    return strVal;
}

