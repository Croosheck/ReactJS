import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useParams, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

function QuoteDetail() {
	const params = useParams();
	const match = useRouteMatch();

	const { quoteId } = params;

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered">{error}</p>;
	}

	if (!loadedQuote.text) {
		return (
			<p
				style={{
					fontSize: "25px",
				}}
			>
				No quote found!
			</p>
		);
	}

	return (
		<div>
			<HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
			<Route path={match.path} exact>
				<div className="centered">
					<Link className="btn--flat" to={`${match.url}/comments`}>
						Show Comments
					</Link>
				</div>
			</Route>
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
		</div>
	);
}

export default QuoteDetail;
