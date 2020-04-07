import React from 'react';
import * as validateFormUtils from '../../util/validate_form_util'

const _demoNeko = {
    email: "socks@greytabby.com",
    password: "password"
};

const _startState = {
    name: "",
    username: "",
    email: "",
    password: "",
    birthday: "1995-01-01",
    gender: ""
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.birthday = {
            month: "1",
            day: "1",
            year: "1995"
        };
        this.errors = {};
        this.state = Object.assign({}, _startState);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.formType === 'Sign Up') {
            if (this.validateSignupForm(e.currentTarget)){
                this.props.action(this.state);
            }
            else {
                console.log(this.errors);
                return;
            }
        } else {
            this.props.action(this.state);
        }
    }

    validateSignupForm(form) {
        this.errors = {};
        for (let field in _startState) {
            if (field !== "birthday") this.errors[field] = validateFormUtils[field](form[field]);
            else {
                console.log(form.month);
                console.log(form.day);
                console.log(form.year);
            }
        }
        for (let field in this.errors) {
            if (this.errors[field]) return false;
        }
        return true;
    }

    handleChange(field) {
        return e => {
            this.setState({[field]: e.target.value});
        };
    }

    handleFocus(e) {
        validateFormUtils.clearErrors(e.target);
    }

    handleBlur(field) {
        return e => {
            this.errors[field] = validateFormUtils[field](e.target);
            this.setState({ [field]: e.target.value });
        }
    }

    changeBirthday(field) {
        return e => {
            Object.assign(this.birthday, {[field]: e.target.value});
            this.setState({birthday: `${this.birthday.year}-${this.birthday.month}-${this.birthday.day}`});
        };
    }

    render() {
        const formType = this.props.formType.split(" ").join("").toLowerCase();
        const months = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = (["Day"]).concat([...Array(31).keys()].map((ele, idx) => idx + 1));
        const years = (["Year"]).concat([...Array(105).keys()].map((ele, idx) => 2020 - 104 + idx));
        const formInputs = this.props.formType === 'Log In' ? (
            <>
                <div><label>Email<br /><input type="email" onChange={this.handleChange("email")} /></label></div>
                <div><label>Password<br /><input type="password" onChange={this.handleChange("password")} /></label></div>
            </>
        ) : (
            <>  
                <h2>Sign Up</h2>
                <h4>It's quick and easy, nyaa~</h4>
                <div>
                    <span className="name-form-container">
                        <input type="text" onFocus={this.handleFocus} onBlur={this.handleBlur("name")} onChange={this.handleChange("name")} placeholder="Name" name="name"/>
                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                        <span class="tooltip-container">
                            {this.errors.name}
                        </span>
                    </span>
                    <span className="username-form-container">
                        <input type="text" onFocus={this.handleFocus} onBlur={this.handleBlur("username")} onChange={this.handleChange("username")} placeholder="Username" name="username"/>
                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                        <span class="tooltip-container">
                            {this.errors.username}
                        </span>
                    </span>
                </div>
                <span className="email-form-container">
                    <input type="email" onFocus={this.handleFocus} onBlur={this.handleBlur("email")} onChange={this.handleChange("email")} placeholder="Email address" name="email"/>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span class="tooltip-container">
                        {this.errors.email}
                    </span>
                </span>
                <span className="password-form-container">
                    <input type="password" onFocus={this.handleFocus} onBlur={this.handleBlur("password")} onChange={this.handleChange("password")} placeholder="New password" name="password"/>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span class="tooltip-container">
                        {this.errors.password}
                    </span>
                </span>
                <span className="signup-label">Birthday</span>
                <div className="birthday">
                    <select className="signup-month" value={this.birthday.month} onChange={this.changeBirthday("month")} name="month">
                        {
                            months.map((month, idx) => <option key={month} value={idx}>{month}</option>)
                        }
                    </select>
                    <select className="signup-day" value={this.birthday.day} onChange={this.changeBirthday("day")} name="day">
                        {
                            days.map((day, idx) => <option key={day} value={day}>{day}</option>)
                        }
                    </select>
                    <select className="signup-year" value={this.birthday.year} onChange={this.changeBirthday("year")} name="year">
                        {
                            years.map((year, idx) => <option key={year} value={year}>{year}</option>)
                        }
                    </select>
                </div>
                <span className="gender-form-container">
                    <span className="signup-label">Gender</span>
                    <label className="signup-radio"><input type="radio" name="gender" value="Female" onClick={this.handleChange("gender")} />Female</label>
                    <label className="signup-radio"><input type="radio" name="gender" value="Male" onClick={this.handleChange("gender")} />Male</label>
                    <label className="signup-radio"><input type="radio" name="gender" value="Custom" onClick={this.handleChange("gender")} />Custom</label><br/>
                </span>
                <p>By clicking Sign Up, you are signing up on the nekobook clone project. Please do not use sensitive information, and enjoy exploring this facebook clone. =^-^=</p>
            </>
        );
        const demo = this.props.formType === "Log In" ? ("") : (
            <button onClick={() => this.props.login(_demoNeko)}>Demo Neko</button>
        );

        return (
            <>
                <form action="" onSubmit={this.handleSubmit} className={`session-form ${formType}`}>
                    <ul>
                        {
                            this.props.errors.map((error, idx) => <li key={idx}>{error}</li>)
                        }
                    </ul>
                    {formInputs}
                    <input type="submit" value={this.props.formType}/>
                </form>
                {demo}
            </>
        )
    }
}

export default LoginForm;