import React from 'react';
import { Link } from 'react-router-dom';

class ProfileAboutLiving extends React.Component {
    constructor(props) {
        super(props);
        this.startingState = {
            id: this.props.neko.id,
            location: (this.props.location ? this.props.location.name : "")
        };
        this.state = {
            id: this.props.neko.id,
            location: (this.props.location ? this.props.location.name : "")
        };
        this.toggleForm = React.createRef();
        this.toggleView = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault();
        const tempState = { id: this.props.neko.id };
        Object.assign(tempState, { location: this.state.location });
        this.props.updateNeko(tempState);
        this.toggleForm.current.classList.remove("show");
        this.toggleView.current.classList.remove("hide");
    }

    handleChange(field) {
        return e => {
            this.setState({[field]: e.target.value });
        }
    }

    // IMPLEMENT FOR TMR: USE REACT REF TO HIDE/UNHIDE FORMS (SEE PHOTO UPLOAD EXAMPLE)
    render() {
        return (
            <section className="about-profile-section">
                <section className="about-profile-content about-living">
                    <div className="about-profile-left">
                        <div className="about-profile-label">CURRENT CITY</div>
                        <ul className="about-profile-list with-label">
                            {
                                !this.props.canEdit ? (
                                    <li>

                                        <div className="show-icon">
                                            <i className="fas fa-home"></i> 
                                        </div>
                                        <div className="has-information">
                                            { this.props.location ? `Lives in ${this.props.location.name}` : "No current city to show" }
                                        </div>
                                    </li>
                                    ) : (
                                        this.props.location ? (
                                            <li ref={this.toggleView} className="about-list-view last-visible">
                                                <div className="show-icon">
                                                    <i className="fas fa-home"></i>
                                                </div>
                                                <div className="has-information">
                                                    <div>{this.props.location.name}</div>
                                                    <div>Current City</div>
                                                </div>
                                                <button onClick={() => { this.toggleForm.current.classList.add("show"); this.toggleView.current.classList.add("hide") }}>
                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                    <span>Edit</span>
                                                </button>
                                                <div className="button-divider"></div>
                                                <button className="delete-information" onClick={() => { this.props.updateNeko({ id: this.props.neko.id, location: "" }); this.setState({ location: "" }) }}>
                                                    <i className="fa fa-times" aria-hidden="true"></i>                                                    
                                                </button> 
                                            </li>
                                        ) : (
                                                
                                            <li className="missing-information about-list-view last-visible" onClick={() => { this.toggleForm.current.classList.add("show"); this.toggleView.current.classList.add("hide") }} ref={this.toggleView}>
                                                <div className="hide-icon">
                                                    <i className="fas fa-plus"></i>
                                                </div>
                                                <div className="need-information">
                                                    Add your current city
                                                </div>
                                            </li>
                                        )
                                    )
                            }
                            {this.props.canEdit ? (<>
                            <li className="hidden-about-form" ref={this.toggleForm}>
                                <form action="" onSubmit={this.handleSubmit.bind(this)}>
                                    <ul className="hidden-form-list">
                                        <li>
                                            <div className="living-form-left">
                                                Current City
                                            </div>
                                            <div className="living-form-right">
                                                <input type="text" name="location" value={this.state.location} onChange={this.handleChange("location").bind(this)}/>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="living-form-left">
                                            </div>
                                            <div className="living-form-right">                                        
                                                <input className="save-changes" type="submit" value="Save Changes" />
                                                <button className="cancelled" onClick={e => { e.preventDefault(); this.toggleForm.current.classList.remove("show"); this.setState({id: this.props.neko.id, location: (this.props.location ? this.props.location.name : "")}); this.toggleView.current.classList.remove("hide"); }}>Cancel</button>
                                            </div>    
                                        </li>
                                    </ul>
                                </form>
                            </li></>
                            ) : ("")
                            }
                        </ul>
                    </div>
                </section>
            </section>
        );
    }
}

export default ProfileAboutLiving;