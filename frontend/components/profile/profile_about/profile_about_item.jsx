import React from 'react';


const ProfileAboutItem = ({field, fieldVal, canEdit, showIcon, showReadOnlyInfo, 
                        showEditableInfo, updateNeko, neko, needInfoText, inputLabel}) => {

    const toggleForm = React.createRef();
    const toggleView = React.createRef();
    const submitNeko = {id: neko.id, [field]: fieldVal};

    return (
        <>{
            !canEdit ? (
                <li>
                    <div className="show-icon">
                        {/* <i className="fas fa-home"></i>  */}
                        {showIcon}
                    </div>
                    <div className="has-information">
                        {/* { this.props.location ? `Lives in ${this.props.location.name}` : "No current city to show" } */}
                        {showReadOnlyInfo}
                    </div>
                </li>
                ) : (
                    // this.props.location ? (
                    field ? (
                        <li ref={this.toggleView}>
                            <div className="show-icon">
                                {/* <i className="fas fa-home"></i> */}
                                {showIcon}
                            </div>
                            <div className="has-information">
                                {/* Lives in {this.props.location.name} */}
                                {showEditableInfo}
                            </div>
                            <button onClick={() => { toggleForm.current.classList.add("show"); toggleView.current.classList.add("hide") }}>Show Form</button>
                            <button onClick={() => { updateNeko({ id: neko.id, [field]: "" }); Object.assign(submitNeko, { location: "" })}}>Delete</button> 
                        </li>
                    ) : (
                        <li ref={this.toggleView}>
                            <div className="hide-icon">
                                <i className="fas fa-plus"></i>
                            </div>
                            <div className="need-information">
                                {/* Add your current city */}
                                {needInfoText}
                            </div>
                            <button onClick={() => { toggleForm.current.classList.add("show"); toggleView.current.classList.add("hide") }}>Show Form</button>
                        </li>
                    )
                )
        }
        {canEdit ? (<>
        <li className="hidden-about-form" ref={toggleForm}>
            <form action="" onSubmit={e => {
                e.preventDefault();
                updateNeko(submitNeko);
                if (toggleForm.classList) toggleForm.classList.remove("show");
            }}>
                <div>{inputLabel}<input type="text" name={field} value={submitNeko[field]} onChange={e => submitNeko[field] = e.target.value}/></div>
                <input type="submit" value="Save Changes" />
                <button onClick={e => { 
                    e.preventDefault();
                    toggleForm.current.classList.remove("show");
                    submitNeko = {id: neko.id, [field]: fieldVar};
                    toggleView.current.classList.remove("hide"); }}>Cancel</button>
            </form>
        </li></>
        ) : ("")
    }</>);
}


export default ProfileAboutItem;