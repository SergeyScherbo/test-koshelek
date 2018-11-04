import React, { Component } from 'react';
import { formatNumber } from '../utils/formatNumber';

class TableRow extends Component {
	state = {
		updated: false
	};

	componentDidUpdate(prevProps) {
		if (prevProps.priceUsd !== this.props.priceUsd) {
			this.setState({ updated: true });

			setTimeout(() => {
				this.setState({ updated: false });
			}, 300)
		}
	}

	render() {
		const { id, name, priceUsd, marketCapUsd, volumeUsd24Hr } = this.props;
		const rowClass = !this.state.updated ? "table__row" : "table__row table__row--updated";

		return (
			<div key={id} className={rowClass}>
				<div className="table__cell">{name}</div>
				<div className="table__cell table__cell--mobileRight">{formatNumber(priceUsd, 5)}</div>
				<div className="table__cell table__cell--hideMobile">{formatNumber(marketCapUsd, 2)}</div>
				<div className="table__cell table__cell--hideMobile">{formatNumber(volumeUsd24Hr, 2)}</div>
			</div>
		);
	}
}

export default TableRow;