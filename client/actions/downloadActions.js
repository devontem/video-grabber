// defining all of the action creators

export const convertUrl = (baseUrl) => {
	return {
		type: 'CONVERT_URL',
		baseUrl
	}
}