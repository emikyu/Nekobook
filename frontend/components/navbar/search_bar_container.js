import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { requestNekoNames } from '../../actions/neko_actions';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {
    let nekoNames = null;
    if (state.ui.allNames !== null) nekoNames = Array.from(state.ui.allNames);
    // const showNekoId = window.location.hash.split("/")[2];
    // const defaultVal = showNekoId && state.entities.nekos[showNekoId] ? `${state.entities.nekos[showNekoId].fname} ${state.entities.nekos[showNekoId].lname}` : "";
    return {
        nekoNames,
        currentUserId: state.session.currentUserId,
        history: ownProps.history
    }
};

const mdp = dispatch => ({
    getNames: (currentUserId) => dispatch(requestNekoNames(currentUserId))
});

export default withRouter(connect(msp, mdp)(SearchBar));