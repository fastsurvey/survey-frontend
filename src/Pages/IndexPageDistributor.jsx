import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import IndexPage20200504 from "../Components/survey20200504/IndexPage20200504";


function IndexPageDistributor(props) {
	switch (props.match.params.surveyId) {
		case "20200504":
			return <IndexPage20200504/>;
		default:
			return <Redirect to="/"/>;
	}
}


export default withRouter(IndexPageDistributor);
