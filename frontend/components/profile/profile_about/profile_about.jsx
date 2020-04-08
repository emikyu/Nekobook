import React from 'react';

class ProfileAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.neko);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(form) {
        return e => {
            e.preventDefault();
            this.props.updateNeko(this.state);
        }
    }

    handleChange(field) {
        return e => {
            this.setState({[field]: e.target.value});
        }
    }

    render() {
        const { neko } = this.props;
        return (
            <section className="profile-content">
                <section className="about-content">
                    <header className="about-header">
                        About {neko.fname} !!
                    </header>
                    Hi check out below the body for the stuff about {neko.fname} yay~
                    <section className="about-body">
                        <nav className="about-menu">
                            <ul>
                                <li>Overview</li>
                                <li>Work and Education</li>
                                <li>Places You've Lived</li>
                                <li>Contact and Basic Info</li>
                                <li>Family and Relationships</li>
                                <li>Details About You</li>
                                <li>Life Events</li>
                            </ul>
                        </nav>
                        <section className="about-body-content">
                            Hi I'm the content you're meant to show ^^
                            Testing out an update form:
                            <br/><br/>
                            <form action="" onSubmit={this.handleSubmit("name")}>
                                <div className="fname-form-container">
                                    Name - Currently @{`${neko.fname} ${neko.lname}`}<br />
                                    <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange("fname")} />
                                    <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange("lname")} />
                                    <input type="submit" value="Save Changes" />
                                    <button>Cancel</button>
                                </div>
                            </form>
                            <br/><br/>
                            <form action="" onSubmit={this.handleSubmit("birthday")}>
                                <div className="birthday-form-container">
                                    Birthday - Currently @{neko.birthday}<br/>
                                    <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleChange("birthday")}/>
                                    <input type="submit" value="Save Changes"/>
                                    <button>Cancel</button>
                                </div>
                            </form>
                            <br/><br/>
                            <form action="" onSubmit={this.handleSubmit("gender")}>
                                <div className="birthday-form-container">
                                    Gender - Currently @{neko.gender}<br />
                                    <select name="gender" value={this.state.gender} onChange={this.handleChange("gender")}>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                    <input type="submit" value="Save Changes" />
                                    <button>Cancel</button>
                                </div>
                            </form>
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}

export default ProfileAbout;