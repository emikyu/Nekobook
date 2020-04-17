import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { requestNekoNames } from '../../actions/neko_actions';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

const msp = (state, ownProps) => {
    let nekoNames = null;
    if (state.ui.allNames !== null) nekoNames = Array.from(state.ui.allNames);

    return {
        nekoNames,
        currentUserId: state.session.currentUserId,
        history: ownProps.history,
        path: ownProps.location.pathname,
        query: queryString.parse(ownProps.location.search).name
    }
};

const mdp = dispatch => ({
    getNames: (currentUserId) => dispatch(requestNekoNames(currentUserId))
});

export default withRouter(connect(msp, mdp)(SearchBar));