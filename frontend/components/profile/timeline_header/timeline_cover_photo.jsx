import React from 'react';

class TimelineCoverPhoto extends React.Component {
    constructor(props) {
        super(props);
        // debugger
        this.state = Object.assign({}, this.props.neko);
        this.selectedCoverPhoto = null;

        this.photoUpload = React.createRef();
        this.handleCPChange = this.handleCPChange.bind(this);
        this.showPhotoUpload = this.showPhotoUpload.bind(this);
    }

    handleCPSubmit(e) {
        // e.preventDefault();
        const cpData = new FormData();
        if (this.selectedCoverPhoto) {
            // debugger
            cpData.append('neko[cover_photo]', this.selectedCoverPhoto, this.selectedCoverPhoto.name);
            this.props.updateNekoPhoto(this.props.neko.id, cpData);
        }

        // this.props.updateNekoPhoto(this.props.neko.id, Object.assign(cpData, { fname: this.props.neko.fname }));
    }

    handleCPChange(e) {
        // console.log(e.target.files);
        // this.setState({ selectedCoverPhoto: e.target.files[0] });
        this.selectedCoverPhoto = e.target.files[0];
        this.handleCPSubmit();
    }

    showPhotoUpload() {
        this.photoUpload.current.click();
    }

    render() {
        const { neko } = this.props;
        return (
            <section className="timeline-photos-container">
                {/* Hello from Timeline Cover Photo ^^ for {neko.fname} */}
                <div className={`cover-image ${neko.cover_photo ? "has-cover-image" : "no-cover-image"} ${this.props.canEdit? "has-pointer" : "no-pointer"}`}>
                    {this.props.canEdit ? <i className="fas fa-camera"></i> : ""}
                    {
                        this.props.canEdit ? (
                            <div className="cover-photo-form-container">
                                    <input type="file" onChange={this.handleCPChange} ref={this.photoUpload}/>
                                    <button onClick={this.showPhotoUpload}> {neko.cover_photo ? "Update " : "Add "}Cover Photo </button>
                            </div>
                         ) : (<></>)
                    }
                    {<img src={neko.cover_photo} alt="Cover photo" />}
                </div>
            </section>
        )
    }
};

export default TimelineCoverPhoto;