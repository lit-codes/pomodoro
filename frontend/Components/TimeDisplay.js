class TimeDisplay extends preact.Component {
    render() {
        return html`<div style="text-align: center;">
            ${this.props.time}
        </div>`;
    }
};
