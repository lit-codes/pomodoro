class TypeSelector extends preact.Component {
    state = {
        currentlyEditing: undefined,
        pomodoro  : '25:00',
        shortBreak: '05:00',
        longBreak : '10:00',
    };

    changeType(type) {
        return () => {
            this.props.onTypeChange(type);
        };
    }

    setType(type) {
        this.setState({ currentlyEditing: undefined });
    }

    editType(type) {
        if (this.props.type === type) return false;

        this.setState({ isEditing: type });
    }

    onInput(type) {
        return e => {
            this.setState({[type]: toTime(e.target.value)});
        };
    }

    render() {
        return html`<div>
            ${
                this.state.isEditing === 'pomodoro'
                ? html`<input
                    value="25"
                    type="text"
                    onChange=${this.onInput('pomodoro')}>
                </input>:<input
                    value="00"
                    type="text"
                    onChange=${this.onInput('pomodoro')}>
                </input>`
                : html`<label for="pomodoro" onClick=${this.editType('pomodoro')}>
                    <input type="radio" id="pomodoro" name="timer"
                        checked=${this.props.type === 'pomodoro' ? true : false}
                        onClick=${this.changeType('pomodoro')}
                    />
                    <span>Pomodoro</span>
                </label>`
            }
        </div>`;
    }
};
