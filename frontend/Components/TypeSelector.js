class TypeSelector extends preact.Component {
    render() {
        return html`<div>
            <label>Pomodoro<input type="radio" name="type"/></label>
            <label>Short break<input type="radio" name="type"/></label>
            <label>Long break<input type="radio" name="type"/></label>
        </div>`;
    }
};

window.TypeSelector = TypeSelector;
