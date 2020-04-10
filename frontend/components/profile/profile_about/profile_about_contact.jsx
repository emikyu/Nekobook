import React from 'react';
import { Link } from 'react-router-dom';
import ProfileAboutItem from './profile_about_item';

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const fields = ["fname", "lname", "birthday", "gender"];
const forms = ["fullName", "birthday", "gender"];

class ProfileAboutContact extends React.Component {
    constructor(props) {
        super(props);
        this.startingState = Object.assign({}, this.props.neko);
        this.state = Object.assign({}, this.props.neko);

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
                if (this.toggleView[field].current) this.toggleView[field].current.classList.remove("hide");
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
                            <li ref={this.toggleView.fname}>
                                <div className="contact-left">
                                    First Name
                                </div>
                                <div className="contact-right">
                                    {neko.fname}
                                </div>
                                <button className="" onClick={this.showForm(["fname", "lname"], "fullName")}>Edit</button>                                
                            </li>
                            <li ref={this.toggleView.lname}>
                                <div className="contact-left">
                                    Last Name
                                </div>
                                <div className="contact-right">
                                    {neko.lname}
                                </div>
                                <button onClick={this.showForm(["fname", "lname"], "fullName")}>Edit</button>                                
                            </li>
                            {
                                canEdit ? (
                                    <li className="hidden-about-form" ref={this.toggleForm.fullName}>
                                        <form action="" onSubmit={this.handleSubmit(["fname", "lname"], "fullName")}>
                                            <div>First Name<input type="text" name="fname" value={this.state.fname} onChange={this.handleChange("fname")} /></div>
                                            <div>Last Name<input type="text" name="lname" value={this.state.lname} onChange={this.handleChange("lname")} /></div>
                                            <input type="submit" value="Save Changes" />
                                            <button onClick={this.hideForm(["fname", "lname"], "fullName")}>Cancel</button>
                                        </form>
                                    </li>
                                ) : ("")
                            }
                            <li ref={this.toggleView.birthday}>
                                <div className="contact-left">
                                    Birth Date
                                </div>
                                <div className="contact-right">
                                    {`${months[parseInt(birthday[1]) - 1]} ${parseInt(birthday[2])}`}
                                </div>
                            </li>
                            <li ref={this.toggleView.birthday}>
                                <div className="contact-left">
                                    Birth Year
                                </div>
                                <div className="contact-right">
                                    {birthday[0]}
                                </div>
                            </li>
                            <li ref={this.toggleView.gender}>
                                <div className="contact-left">
                                    Gender
                                </div>
                                <div className="contact-right">
                                    {neko.gender}
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
        );
    }
}

export default ProfileAboutContact;