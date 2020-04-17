import React from 'react';

class TimelineIntro extends React.Component {
    constructor(props) {
        super(props);
        this.oldBio = this.props.showNeko.bio;
        this.state = {
            id: this.props.showNeko.id,
            bio: this.props.showNeko.bio,
            showForm: false
        }
    }

    componentDidMount() {
        this.props.requestNeko(this.props.showNeko.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.showNeko.bio !== prevProps.showNeko.bio) {
                this.setState({bio: this.props.showNeko.bio, showForm: false});
                this.oldBio = this.props.showNeko.bio;
        }
        if (this.props.showNeko.id !== prevProps.showNeko.id) {
                this.setState({id: this.props.showNeko.id, bio: this.props.showNeko.bio, showForm: false});
                this.oldBio = this.props.showNeko.bio;
        }
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateNeko(this.state);
        this.toggleForm();
    }

    toggleForm() {
        this.setState({showForm: !this.state.showForm});
    }

    resetForm() {
        this.setState({bio: this.oldBio});
        this.toggleForm();
    }

    render() {        
        return (
            <div className="timeline-intro-content">
                <div className="timeline-header">
                    <div className="timeline-intro-header-left">
                        <div className="timeline-header-icon">
                            <i className="fas fa-globe"></i>                        
                        </div>
                        <span className="timeline-header-text">
                            Intro
                        </span>
                    </div>
                </div>
                <div className="bio-container">
                    {
                        this.state.bio && !this.state.showForm ? (
                            <div className="bio-body">
                                {this.state.bio}
                            </div>
                        ) : (this.props.canEdit && !this.state.showForm ? (
                            <div className="no-bio-body">
                                Add a short bio to tell other nekos more about yourself. =^.^=
                            </div>
                        ) : (""))
                    }
                    {
                        this.props.canEdit & !this.state.showForm ? (
                            <button onClick={this.toggleForm.bind(this)}>
                                {this.props.showNeko.bio ? "Edit Bio" : "Add Bio"}
                            </button>
                        ) : (
                        this.props.canEdit & this.state.showForm ? (
                            <form className="bio-form" onSubmit={this.handleSubmit.bind(this)}>
                                <div>
                                    <textarea value={this.state.bio} placeholder="Describe who you are" onChange={this.handleChange("bio")}></textarea>
                                </div>
                                <div className="bio-buttons">
                                    <button className="cancelled" onClick={this.resetForm.bind(this)}>Cancel</button>
                                    <input className="save-changes" type="submit" value="Save" />
                                </div>
                            </form>   
                        ) : (""))
                    }
                </div>
            </div>
        )
    }
}

export default TimelineIntro;