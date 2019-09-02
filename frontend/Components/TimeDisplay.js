class TimeDisplay extends preact.Component {
    render() {
        return html`<div>
            <div>${this.props.time}</div>
        </div>`;
    }
};

window.TimeDisplay = TimeDisplay;
