class TypeSelector extends preact.Component {
    selectType(type) {
        return () => {
            if (this.props.type !== type) {
                this.props.onTypeChange(type);
            }
        };
    }

    onTimeChange(type) {
        return time => {
            this.props.onTimeChange(type, time);
        }
    }

    reset() {
        return () => {
            this.props.onResetTypes();
        };
    }

    render() {
        return html`<div class="center-align">
            <label for="pomodoro" onClick=${this.selectType('pomodoro')}>
                <input type="radio" id="pomodoro" name="timer"
                    checked=${this.props.type === 'pomodoro'}
                />
                <span><${MinuteSecond}
                    time=${this.props.typeToSeconds['pomodoro']}
                    onChange=${this.onTimeChange('pomodoro')}
                /></span>
            </label>

            <label for="short-break" onClick=${this.selectType('short-break')}>
                <input type="radio" id="short-break" name="timer"
                    checked=${this.props.type === 'short-break'}
                />
                <span><${MinuteSecond}
                    time=${this.props.typeToSeconds['short-break']}
                    onChange=${this.onTimeChange('short-break')}
                /></span>
            </label>

            <label for="long-break" onClick=${this.selectType('long-break')}>
                <input type="radio" id="long-break" name="timer"
                    checked=${this.props.type === 'long-break'}
                />
                <span><${MinuteSecond}
                    time=${this.props.typeToSeconds['long-break']}
                    onChange=${this.onTimeChange('long-break')}
                /></span>
            </label>
            <button class="waves-effect waves-teal btn-flat" onClick=${this.reset()}>
                <i class="material-icons">autorenew</i>
            </button>
        </div>`;
    }
};
