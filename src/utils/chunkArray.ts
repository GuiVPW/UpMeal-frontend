export const chunkArray = <T>(myArray: T[], chunkSize: number): T[][] => {
	const tempArray: T[][] = []

	for (let i = 0; i < myArray.length; i += chunkSize) {
		const myChunk = myArray.slice(i, i + chunkSize)
		tempArray.push(myChunk)
	}

	return tempArray
}
