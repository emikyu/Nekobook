import React from 'react';
import { Link } from 'react-router-dom';
import ProfileAboutItem from './profile_about_item';

const todayDate = new Date();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const days = [...Array(31).keys()].map((ele, idx) => idx + 1);
const years = [...Array(105).keys()].map((ele, idx) => todayDate.getFullYear() - 104 + idx);


const fields = ["fname", "lname", "birthDate", "birthYear", "birthday", "gender"];
const forms = ["fullName", "birthday", "gender"];

class ProfileAboutContact extends React.Component {
    constructor(props) {
        super(props);
        this.startingState = Object.assign({}, this.props.neko);
        this.state = Object.assign({}, this.props.neko);

        const birthday = this.props.neko.birthday.split("-");

        this.birthday = {
            month: parseInt(birthday[1]),
            day: parseInt(birthday[2]),
            year: parseInt(birthday[0])
        };

        this.toggleForm = {};
        this.toggleView = {};
        fields.forEach(field => this.toggleView[field] = React.createRef());
        forms.forEach(form => this.toggleForm[form] = React.createRef());

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleSubmit(fields, form) {
        return e => {
            // debugger
            e.preventDefault();
            const tempState = {id: this.props.neko.id};
            fields.forEach(field => {
                Object.assign(tempState, {[field]: this.state[field]});
                if (field !== "birthday" && this.toggleView[field].current) this.toggleView[field].current.classList.remove("hide");
            });
            if (this.toggleForm[form].current) this.toggleForm[form].current.classList.remove("show");
            this.props.updateNeko(tempState);

            this.startingState = Object.assign({}, this.state);
        }
    }

    handleChange(field) {
        return e => {
            this.setState({[field]: e.target.value});
        }
    }

    changeBirthday(field) {
        return e => {
            if (field) Object.assign(this.birthday, { [field]: e.target.value });
            this.setState({ birthday: `${this.birthday.year}-${this.birthday.month}-${this.birthday.day}` });
        };
    }

    showForm(fields, form) {
        // debugger
        return () => {
            console.log("inside showform!")
            fields.forEach(field => {
                if (this.toggleView[field].current) this.toggleView[field].current.classList.add("hide");
            });
            if (this.toggleForm[form].current) this.toggleForm[form].current.classList.add("show");
        };
    }

    hideForm(fields, form) {
        return (e) => {
            e.preventDefault();
            fields.forEach(field => {
                if (this.toggleView[field].current) this.toggleView[field].current.classList.remove("hide");
                this.setState({ id: this.props.neko.id, [field]: this.startingState[field]});
            });
            if (this.toggleForm[form].current) this.toggleForm[form].current.classList.remove("show");
        };
    }

    render() {
        const {neko, canEdit} = this.props;
        const birthday = neko.birthday.split("-");

        return (
            <section className="about-profile-section">
                <section className="about-profile-content about-contact">
                    <div className="about-profile-left">
                        <div className="about-profile-label">CONTACT INFORMATION</div>
                        <ul className="about-profile-list with-label">
                            <li>
                                <div className="contact-left">
                                    Email 
                                </div>
                                <div className="contact-right">
                                    {neko.email}
                                </div>
                            </li>
                        </ul>
                        <div className="about-profile-label">BASIC INFORMATION</div>
                        <ul className="about-profile-list with-label">
                            <li className="about-list-view" ref={this.toggleView.fname}>
                                <div className="contact-left">
                                    First Name
                                </div>
                                <div className="contact-right">
                                    {neko.fname}
                                </div>
                                {canEdit ? <button onClick={this.showForm(["fname", "lname"], "fullName")}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                        <span>Edit</span>                                        
                                    </button> : <></>}                                
                            </li>
                            <li className="about-list-view" ref={this.toggleView.lname}>
                                <div className="contact-left">
                                    Last Name
                                </div>
                                <div className="contact-right">
                                    {neko.lname}
                                </div>
                                {canEdit ? <button onClick={this.showForm(["fname", "lname"], "fullName")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                    <span>Edit</span>
                                    </button> : <></>}                                
                            </li>
                            {
                                canEdit ? (
                                    <li className="hidden-about-form" ref={this.toggleForm.fullName}>
                                        <form action="" onSubmit={this.handleSubmit(["fname", "lname"], "fullName")}>
                                            <ul className="hidden-form-list">
                                                <li>
                                                    <div className="contact-form-left">
                                                        First Name
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange("fname")} />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-form-left">
                                                        Last Name
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange("lname")} />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-form-left">
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <input className="save-changes" type="submit" value="Save Changes" />
                                                        <button className="cancelled" onClick={this.hideForm(["fname", "lname"], "fullName")}>Cancel</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </form>
                                    </li>
                                ) : ("")
                            }
                            <li className="about-list-view" ref={this.toggleView.birthDate}>
                                <div className="contact-left">
                                    Birth Date
                                </div>
                                <div className="contact-right">
                                    {`${months[parseInt(birthday[1]) - 1]} ${parseInt(birthday[2])}`}
                                </div>
                                {canEdit ? <button onClick={this.showForm(["birthDate", "birthYear"], "birthday")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                    <span>Edit</span>
                                </button> : <></>}    
                            </li>
                            <li className="about-list-view" ref={this.toggleView.birthYear}>
                                <div className="contact-left">
                                    Birth Year
                                </div>
                                <div className="contact-right">
                                    {birthday[0]}
                                </div>
                                {canEdit ? <button onClick={this.showForm(["birthDate", "birthYear"], "birthday")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                    <span>Edit</span>
                                </button> : <></>}   
                            </li>
                            {
                                canEdit ? (
                                    <li className="hidden-about-form" ref={this.toggleForm.birthday}>
                                        <form action="" onSubmit={this.handleSubmit(["birthDate", "birthYear", "birthday"], "birthday")}>
                                            <ul className="hidden-form-list">
                                                <li>
                                                    <div className="contact-form-left">
                                                        Birthday
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <select value={this.birthday.month} onChange={this.changeBirthday("month")} name="month">
                                                            {
                                                                months.map((month, idx) => <option key={month} value={idx + 1}>{month}</option>)
                                                            }
                                                        </select>
                                                        <select value={this.birthday.day} onChange={this.changeBirthday("day")} name="day">
                                                            {
                                                                days.map((day, idx) => <option key={day} value={idx + 1}>{day}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-form-left">
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <select value={this.birthday.year} onChange={this.changeBirthday("year")} name="year">
                                                            {
                                                                years.map((year, idx) => <option key={year} value={year}>{year}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-form-left">
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <input className="save-changes" type="submit" value="Save Changes" />
                                                        <button className="cancelled" onClick={this.hideForm(["birthDate", "birthYear"], "birthday")}>Cancel</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </form>
                                    </li>
                                ) : ("")
                            }
                            <li className="about-list-view last-visible" ref={this.toggleView.gender}>
                                <div className="contact-left">
                                    Gender
                                </div>
                                <div className="contact-right">
                                    {neko.gender}
                                </div>
                                {canEdit ? <button onClick={this.showForm(["gender"], "gender")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                    <span>Edit</span>
                                </button> : <></>}  
                            </li>
                            {
                                canEdit ? (
                                    <li className="hidden-about-form" ref={this.toggleForm.gender}>
                                        <form action="" onSubmit={this.handleSubmit(["gender"], "gender")}>
                                            <ul className="hidden-form-list">
                                                <li>
                                                    <div className="contact-form-left">
                                                        Last Name
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <select name="gender" value={this.state.gender} onChange={this.handleChange("gender")}>
                                                            <option value="Female">Female</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Custom">Custom</option>
                                                        </select>                                                    
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-form-left">
                                                    </div>
                                                    <div className="contact-form-right">
                                                        <input className="save-changes" type="submit" value="Save Changes" />
                                                        <button className="cancelled" onClick={this.hideForm(["gender"], "gender")}>Cancel</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </form>
                                    </li>
                                ) : ("")
                            }
                        </ul>
                    </div>
                </section>
            </section>
        );
    }
}

export default ProfileAboutContact;