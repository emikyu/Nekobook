import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state);
    }

    handleChange(field) {
        return e => this.setState({[field]: e.target.value})
    }

    render() {
        const formInputs = this.props.formType === 'Log In' ? (
            <>
                <label htmlFor="">Email<br /><input type="email" onChange={this.handleChange("email")} /></label><br />
                <label htmlFor="">Password<br /><input type="password" onChange={this.handleChange("password")} /></label>
            </>
        ) : (
            <>
            </>
        );

        return (
            <form action="" onSubmit={this.handleSubmit}>
                Nekobook Session Form =^-^=<br/>
                {formInputs}
                <input type="submit" value={this.props.formType}/>
            </form>
        )
    }
}

export default LoginForm;