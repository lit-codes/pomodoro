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
            <${Type}
                isEditing=${this.state.nowEditing === 'pomodoro'} 
                checked=${this.props.type === 'pomodoro'} 
                time=${this.props.typeToSeconds['pomodoro']}
                onTimeChange=${this.onTimeChange('pomodoro')} 
                selectType=${this.selectType('pomodoro')} 
            />
            <${Type}
                isEditing=${this.state.nowEditing === 'short-break'} 
                checked=${this.props.type === 'short-break'} 
                time=${this.props.typeToSeconds['short-break']}
                onTimeChange=${this.onTimeChange('short-break')} 
                selectType=${this.selectType('short-break')} 
            />
            <${Type}
                isEditing=${this.state.nowEditing === 'long-break'} 
                checked=${this.props.type === 'long-break'} 
                time=${this.props.typeToSeconds['long-break']}
                onTimeChange=${this.onTimeChange('long-break')} 
                selectType=${this.selectType('long-break')} 
            />
            <button class="waves-effect waves-teal btn-flat" onClick=${this.reset()}>
                <i class="material-icons">autorenew</i>
            </button>
        </div>`;
    }
};
