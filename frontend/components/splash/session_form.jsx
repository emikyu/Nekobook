import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.birthday = {
            month: "",
            day: "",
            year: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state);
    }

    handleChange(field) {
        return e => this.setState({[field]: e.target.value});
    }

    render() {
        const formType = this.props.formType.split(" ").join("").toLowerCase();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = (new Array(31)).map((ele, idx) => idx);
        const years = (new Array(105)).map((ele, idx) => 2020 - 104 + idx);
        const formInputs = this.props.formType === 'Log In' ? (
            <>
                <div><label>Email<br /><input type="email" onChange={this.handleChange("email")} /></label></div>
                <div><label>Password<br /><input type="password" onChange={this.handleChange("password")} /></label></div>
            </>
        ) : (
            <>  
                <h2>Sign Up</h2>
                <h4>It's quick and easy, nyaa~</h4>
                <div><input type="text" onChange={this.handleChange("name")} placeholder="Name" />
                <input type="text" onChange={this.handleChange("username")} placeholder="Username" /></div>
                <input type="email" onChange={this.handleChange("email")} placeholder="Email address"/>
                <input type="password" onChange={this.handleChange("password")} placeholder="New password" />
                <span className="signup-label">Birthday</span>
                    <input type="date" onChange={this.handleChange("birthday")} />
                <span className="signup-label">Gender</span>
                <label><input type="radio" name="gender" value="Female" onClick={this.handleChange("gender")} />Female</label>
                <label><input type="radio" name="gender" value="Male" onClick={this.handleChange("gender")} />Male</label>
                <label><input type="radio" name="gender" value="Custom" onClick={this.handleChange("gender")} />Custom</label><br/>
                <p>By clicking Sign Up, you are signing up on the nekobook clone project. Please do not use sensitive information, and enjoy exploring this facebook clone. =^-^=</p>
            </>
        );

        return (
            <form action="" onSubmit={this.handleSubmit} className={`session-form ${formType}`}>
                <ul>
                    {
                        this.props.errors.session.map((error, idx) => <li key={idx}>{error}</li>)
                    }
                </ul>
                {formInputs}
                <input type="submit" value={this.props.formType}/>
            </form>
        )
    }
}

export default LoginForm;