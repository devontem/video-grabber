import React, { PropTypes } from 'react'

const Form = ({ onClick }) => {
	return (
		<form onSubmit={ e => {
			e.preventDefault();
			if (!input.value.trime()) return

			dispatch()
		}}
)