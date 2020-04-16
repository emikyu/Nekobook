import React from 'react';

class SearchBar extends React.Component {

    render() {
        return (
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button className="button"><i className="fa fa-search search-bar" aria-hidden="true"></i></button>
            </div>
        );
    }
}

export default SearchBar;