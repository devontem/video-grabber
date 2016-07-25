import React from 'react';

const Link = ({ link, onClick }) => {
	// let content = link;

	// if (!link) content = 'Please paste a link to download!'

	return (
		<div>
			<h3>The Link is: {{ link }}</h3>
			<button onClick={onClick(link)}>
				Download
			</button>
		</div>
	)
}