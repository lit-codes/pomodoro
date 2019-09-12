class MinuteSecond extends preact.Component {
    get minutes() {
        return padWithZero(parseInt(this.props.time / 60, 10));
    }

    get seconds() {
        return padWithZero(this.props.time % 60);
    }

    onInput(type) {
        return e => {
            const value = +e.target.value;
            const seconds = +this.seconds;
            const minutes = +this.minutes;

            if (type === 'minutes') {
                this.props.onChange(setTimeBoundary(value * 60 + seconds));
            } else {
                this.props.onChange(setTimeBoundary(minutes * 60 + value));
            }
        };
    }

    render() {
        return html`<span>
            <input
                class="minute-second"
                value=${this.minutes}
                min="00"
                max="59"
                step="01"
                type="number"
                onInput=${this.onInput('minutes')}
            />
            <span style="font-size:1.2em">:</span>
            <input
                class="minute-second"
                value=${this.seconds}
                min="00"
                max="59"
                step="01"
                type="number"
                onInput=${this.onInput('seconds')}
            />
        </span>`;
    }
}

function padWithZero(value) {
    const strVal = value.toString();

    if (strVal.length===1) {
        return `0${strVal}`
    }
    return strVal;
}

function setTimeBoundary(value) {
    const max = 59 * 60 + 59;
    if (value > max ) return max;
    if (value < 0 ) return 0;
    return value;
}