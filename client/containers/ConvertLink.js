import React from 'react'
import { connect } from 'react-redux'
import { convertUrl } from '../downloadActions'

let ConvertLink = ({ dispatch }) => {

	let input

	return (
		<div>
			<form onSubmit={ e => {
				e.preventDefault();
				if (!input.value.trim()) return

				dispatch(convertUrl(input.value))
				input.value = ''
				}}>
				
				<input ref={ (node) => {
					input = node
				}} />
				
				<button type="submit">
					Convert Link
				</button>

			</form>
		</div>
	)
}