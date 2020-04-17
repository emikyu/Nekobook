import React from 'react';
import { Link } from 'react-router-dom';


class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputVal: "",
            dropdown: false
        };


        this.updateInput = this.updateInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.props.getNames(this.props.currentUserId);
        window.addEventListener('click', (e) => {
            if (!e.target.matches('.search-suggestions') && this.state.dropdown) {
                this.setState({dropdown: false});
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.path !== prevProps.path && !this.props.query) {
            this.setState({dropdown: false, inputVal: ""})
        }
    }

    updateInput(e) {
        const inputVal = e.currentTarget.value;
        this.setState({ inputVal });
        if (inputVal.trim()) {
            if (!this.state.dropdown) this.setState({dropdown: true});
        } else {
            if(this.state.dropdown) this.setState({dropdown: false});
        }
    }

    handleKeyDown(e) {
        if (this.state.inputVal.trim() && e.key === 'Enter') {
            e.preventDefault();

            this.props.history.push(`/search?name=${this.state.inputVal.trim()}`);
            this.setState({dropdown: false, inputVal: this.state.inputVal.trim()});
        }
    }

    hideDropdown(name) {
        return e => this.setState({dropdown: false, inputVal: name});
    }

    render() {
        if (this.props.nekoNames === null) return null;

        const foundNames = [];
        const that = this;
        const names = this.props.nekoNames;
        names.forEach((name) => {
            if (name === this.state.inputVal.trim()) return;
            if (name.slice(0, that.state.inputVal.trim().length).toLowerCase() === that.state.inputVal.trim().toLowerCase()) foundNames.push(
                <Link key={name} to={`/search?name=${name}`}>
                    <li key={name} onClick={this.hideDropdown(name)}>{name}</li>
                </Link>
            );
        });

        return (
            <div className="search-bar">
                <input type="text" placeholder="Search" value={this.state.inputVal} onChange={this.updateInput} onKeyDown={this.handleKeyDown}/>
                <button className="button"><i className="fa fa-search search-bar" aria-hidden="true"></i></button>
                {
                    this.state.dropdown ?
                    (<div className="search-suggestions">
                        <ul>
                            <Link to={`/search?name=${this.state.inputVal.trim()}`}>
                                <li key={this.state.inputVal.trim()} onClick={this.hideDropdown(this.state.inputVal.trim())}>
                                    {this.state.inputVal.trim()}
                                </li>
                            </Link>
                            {
                                foundNames
                            }
                            <Link to={`/search?name=${this.state.inputVal.trim()}`}>
                                <li key={"show-more"} onClick={this.hideDropdown(this.state.inputVal.trim())}>
                                    See all results for {this.state.inputVal.trim()}
                                </li>
                            </Link>
                        </ul>
                    </div>) : ("")
                }
            </div>
        );
    }
}

export default SearchBar;