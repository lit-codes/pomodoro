class TypeSelector extends preact.Component {
    changeType(type) {
        return () => {
            this.props.onTypeChange(type);
        };
    }
    render() {
        return html`<div>
            <label for="pomodoro-type">
                <input type="radio" id="pomodoro-type" name="timer-type"
                    checked=${this.props.type === 'pomodoro-type' ? true : false}
                    onClick=${this.changeType('pomodoro-type')}
                />
                <span>Pomodoro</span>
            </label>
            <label for="short-break-type">
                <input type="radio" id="short-break-type" name="timer-type"
                    checked=${this.props.type === 'short-break-type' ? true : false}
                    onClick=${this.changeType('short-break-type')}
                />
                <span>Short</span>
            </label>
            <label for="long-break-type">
                <input type="radio" id="long-break-type" name="timer-type"
                    checked=${this.props.type === 'long-break-type' ? true : false}
                    onClick=${this.changeType('long-break-type')}
                />
                <span>Long</span>
            </label>
        </div>`;
    }
};
