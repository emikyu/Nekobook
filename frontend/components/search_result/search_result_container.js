import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchResult from './search_result';
import { searchNekos } from '../../actions/neko_actions';
import queryString from 'query-string';


const msp = (state, ownProps) => ({
    currentUser: state.entities.nekos[state.session.currentUserId],
    searchResults: state.ui.searchResults ? Object.values(state.ui.searchResults) : null,
    query: queryString.parse(ownProps.location.search).name
});

const mdp = dispatch => ({
    searchNekos: (query) => dispatch(searchNekos(query))
});

export default withRouter(connect(msp, mdp)(SearchResult));