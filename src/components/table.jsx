import React from 'react';
import TableRow from './tableRow';

const Table = ({ data }) => {

	return (
		<div className="table">
			<div className="table__row table__row--head">
				<div className="table__cell">Name</div>
				<div className="table__cell table__cell--mobileRight">Price</div>
				<div className="table__cell table__cell--hideMobile">Market Cap</div>
				<div className="table__cell table__cell--hideMobile">Volume (24Hr)</div>
			</div>

			{
				data.map(item => (
					<TableRow
						id={item.id}
						name={item.name}
						priceUsd={item.priceUsd}
						marketCapUsd={item.marketCapUsd}
						volumeUsd24Hr={item.volumeUsd24Hr}
					/>
				))
			}
		</div>
	);
}

export default Table;