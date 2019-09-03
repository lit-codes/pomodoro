class TypeSelector extends preact.Component {
    changeType(type) {
        return () => {
            this.props.onTypeChange(type);
        };
    }
    render() {
        return html`<div>
            <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="pomodoro-type">
                <input
                    type="radio"
                    id="pomodoro-type"
                    class="mdl-radio__button"
                    name="timer-type"
                    value="pomodoro-type"
                    checked=${this.props.type === 'pomodoro-type' ? 'checked' : ''}
                    onClick=${this.changeType('pomodoro-type')}
                />
                <span class="mdl-radio__label">Pomodoro</span>
            </label>
            <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="short-break-type">
                <input
                    type="radio"
                    id="short-break-type"
                    class="mdl-radio__button"
                    name="timer-type"
                    value="short-break-type"
                    checked=${this.props.type === 'short-break-type' ? 'checked' : ''}
                    onClick=${this.changeType('short-break-type')}
                />
                <span class="mdl-radio__label">Short break</span>
            </label>
            <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="long-break-type">
                <input
                    type="radio"
                    id="long-break-type"
                    class="mdl-radio__button"
                    name="timer-type"
                    value="long-break-type"
                    checked=${this.props.type === 'long-break-type' ? 'checked' : ''}
                    onClick=${this.changeType('long-break-type')}
                />
                <span class="mdl-radio__label">Long break</span>
            </label>
        </div>`;
    }
};
