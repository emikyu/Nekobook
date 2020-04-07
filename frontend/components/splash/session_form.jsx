import React from 'react';

const _demoNeko = {
    email: "socks@greytabby.com",
    password: "password"
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.birthday = {
            month: "1",
            day: "1",
            year: "1995"
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
                <div><input type="text" onChange={this.handleChange("name")} placeholder="Name" />
                <input type="text" onChange={this.handleChange("username")} placeholder="Username" /></div>
                <input type="email" onChange={this.handleChange("email")} placeholder="Email address"/>
                <input type="password" onChange={this.handleChange("password")} placeholder="New password" />
                <span className="signup-label">Birthday</span>
                <div className="birthday">
                    <select className="signup-month" value={this.birthday.month} onChange={this.changeBirthday("month")}>
                        {
                            months.map((month, idx) => <option key={month} value={idx}>{month}</option>)
                        }
                    </select>
                    <select className="signup-day" value={this.birthday.day} onChange={this.changeBirthday("day")}>
                        {
                            days.map((day, idx) => <option key={day} value={day}>{day}</option>)
                        }
                    </select>
                    <select className="signup-year" value={this.birthday.year} onChange={this.changeBirthday("year")}>
                        {
                            years.map((year, idx) => <option key={year} value={year}>{year}</option>)
                        }
                    </select>
                </div>
                <span className="signup-label">Gender</span>
                <label><input type="radio" name="gender" value="Female" onClick={this.handleChange("gender")} />Female</label>
                <label><input type="radio" name="gender" value="Male" onClick={this.handleChange("gender")} />Male</label>
                <label><input type="radio" name="gender" value="Custom" onClick={this.handleChange("gender")} />Custom</label><br/>
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