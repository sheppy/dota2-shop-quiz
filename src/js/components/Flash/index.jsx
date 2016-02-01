import React from "react";


class Flash extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this._timer = null;
    }

    componentWillReceiveProps(nextProps) {
        // Reset the timer if children are changed
        if (nextProps.message && nextProps.message !== this.props.message) {
            this.setTimer();
            this.setState({ visible: true });
        }
    }

    componentDidMount() {
        this.setTimer();
    }

    setTimer() {
        // Clear existing timer
        this._timer !== null ? clearTimeout(this._timer) : null;

        // Hide after delay
        this._timer = setTimeout(() => {
            this.setState({ visible: false });
            this._timer = null;
        }, this.props.delay);
    }

    render() {
        if (this.state.visible) {
            return (<div className="FlashMessage"><div><span>{this.props.message}</span></div></div>);
        }

        // Nothing to display
        return (<span />);
    }
}

Flash.defaultProps = { delay: 2000 };

export default Flash;
