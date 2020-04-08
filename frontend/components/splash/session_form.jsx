import React from 'react';
import * as validateFormUtils from '../../util/validate_form_util';
import SessionFormInput from './session_form_input';

const _demoNeko = {
    email: "socks@greytabby.com",
    password: "password"
};

const todayDate = new Date();

const _startState = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    birthday: `${todayDate.getFullYear()-25}-${todayDate.getMonth()+1}-${todayDate.getDate()}`,
    gender: ""
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.birthday = {
            month: todayDate.getMonth() + 1,
            day: todayDate.getDate(),
            year: todayDate.getFullYear() - 25
        };
        this.errors = {};
        this.state = Object.assign({}, _startState);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearGenderError = this.clearGenderError.bind(this);
        this.clearBirthdayError = this.clearBirthdayError.bind(this);
    }

    // handle form submission
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.formType === 'Sign Up') {
            if (this.validateSignupForm(e.currentTarget)){
                console.log(this.state);
                this.props.action(this.state);
            }
            else {
                // console.log(this.errors);
                return;
            }
        } else {
            this.props.action(this.state);
        }
    }

    validateSignupForm(form) {
        this.errors = {};
        for (let field in _startState) {
            if (field === "reTypeEmail") this.errors[field] = validateFormUtils[field](form[field], this.state.email);
            else if (field !== "birthday") this.errors[field] = validateFormUtils[field](form[field]);
            else {
                this.errors[field] = validateFormUtils[field](form.month.value, form.day.value, form.year.value);
            }
        }
        for (let field in this.errors) {
            if (this.errors[field]) return false;
        }
        return true;
    }

    handleChange(field) {
        return e => {
            validateFormUtils.clearErrors(e.target);
            this.setState({[field]: e.target.value});
            if (field === "gender") this.errors.gender = null;
        };
    }

    handleFocus(e) {
        validateFormUtils.clearErrors(e.target);
    }

    handleBlur(field) {
        return e => {
            if (field === "reTypeEmail") this.errors[field] = validateFormUtils[field](e.target, this.state.email);
            else if (field !== "birthday") this.errors[field] = validateFormUtils[field](e.target);
            else {
                console.log("testing...")
                this.errors.birthday = validateFormUtils.birthday(this.birthday.month, this.birthday.day, this.birthday.year);
            }
            if (field !== "birthday") this.setState({ [field]: e.target.value });
            else this.setState({ birthday: `${this.birthday.year}-${this.birthday.month}-${this.birthday.day}` });
        }
    }

    clearGenderError() {
        validateFormUtils.clearGender();
        this.setState({ gender: ""});
    }

    clearBirthdayError() {
        validateFormUtils.clearBirthday();
        this.setState({ birthday: `${this.birthday.year}-${this.birthday.month}-${this.birthday.day}` });
    }

    changeBirthday(field) {
        return e => {
            if (field) Object.assign(this.birthday, {[field]: e.target.value});
            this.clearBirthdayError();
            this.errors.birthday = validateFormUtils.birthday(this.birthday.month, this.birthday.day, this.birthday.year);
        };
    }

    render() {

        const formType = this.props.formType.split(" ").join("").toLowerCase();
        const months = ["Month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = (["Day"]).concat([...Array(31).keys()].map((ele, idx) => idx + 1));
        const years = (["Year"]).concat([...Array(105).keys()].map((ele, idx) => 2020 - 104 + idx));
        
        const reTypeEmail = (this.state.email.length > 0 && !this.errors.email) ? (
            <SessionFormInput type="email" field="reTypeEmail" placeholder="Re-enter email" errors={this.errors} handleBlur={this.handleBlur} handleFocus={this.handleFocus} handleChange={this.handleChange} />
        ) : (<> </>);


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
                    <SessionFormInput type="text" field="fname" placeholder="First name" errors={this.errors} handleBlur={this.handleBlur} handleFocus={this.handleFocus} handleChange={this.handleChange}/>
                    <SessionFormInput type="text" field="lname" placeholder="Last name" errors={this.errors} handleBlur={this.handleBlur} handleFocus={this.handleFocus} handleChange={this.handleChange} />
                </div>
                <SessionFormInput type="email" field="email" placeholder="Email address" errors={this.errors} handleBlur={this.handleBlur} handleFocus={this.handleFocus} handleChange={this.handleChange} />
                {reTypeEmail}
                <SessionFormInput type="password" field="password" placeholder="New password" errors={this.errors} handleBlur={this.handleBlur} handleFocus={this.handleFocus} handleChange={this.handleChange} />
                <span className="signup-label">Birthday</span>
                <div className="birthday-form-container">
                    {
                        this.errors.birthday ? (
                            <span className="tooltip-container">
                                <span className="tooltip"></span>
                                <span className="tooltip-message">
                                    {this.errors.birthday}
                                </span>
                            </span>
                        ) : (<></>)
                    }
                    <select className="signup-month" value={this.birthday.month} onChange={this.changeBirthday("month")} onBlur={this.handleBlur("birthday")} name="month">
                        {
                            months.map((month, idx) => <option key={month} value={idx ? idx : "Month"}>{month}</option>)
                        }
                    </select>
                    <select className="signup-day" value={this.birthday.day} onChange={this.changeBirthday("day")} onBlur={this.handleBlur("birthday")} name="day">
                        {
                            days.map((day, idx) => <option key={day} value={day}>{day}</option>)
                        }
                    </select>
                    <select className="signup-year" value={this.birthday.year} onChange={this.changeBirthday("year")} onBlur={this.handleBlur("birthday")} name="year">
                        {
                            years.map((year, idx) => <option key={year} value={year}>{year}</option>)
                        }
                    </select>
                    <i className="fa fa-exclamation-circle" aria-hidden="true" onClick={this.clearBirthdayError}></i>
                </div>
                <span className="gender-form-container">
                    {
                        this.errors.gender ? (
                            <span className="tooltip-container">
                                <span className="tooltip"></span>
                                <span className="tooltip-message">
                                    {this.errors.gender}
                                </span>
                            </span>
                        ) : (<></>)
                    }
                    <span className="signup-label">Gender</span>
                    <label className="signup-radio"><input type="radio" name="gender" value="Female" onClick={this.handleChange("gender")} />Female</label>
                    <label className="signup-radio"><input type="radio" name="gender" value="Male" onClick={this.handleChange("gender")} />Male</label>
                    <label className="signup-radio"><input type="radio" name="gender" value="Custom" onClick={this.handleChange("gender")} />Custom</label><br/>
                    <i className="fa fa-exclamation-circle" aria-hidden="true" onClick={this.clearGenderError}></i>
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
                    {formInputs}
                    <span className="submit-form-container">
                        <input type="submit" value={this.props.formType} name="submit"/>
                        {
                            this.props.errors.length === 0 ? (<></>) : (
                                <span className="tooltip-container">
                                    <span className="tooltip"></span>
                                    <span className="tooltip-message">
                                        <ul>
                                            {this.props.errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                        </ul>
                                    </span>
                                </span>
                            )
                        }
                    </span>
                </form>
                {demo}
            </>
        )
    }
}

export default LoginForm;