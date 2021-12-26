import { useRef } from 'react';
import { TextField } from '@mui/material';

function Search({ setSearchInput }) {
	// input ref
	const searchInputRef = useRef(null);

	// event handlers
	const searchInputHandler = () => {
		setSearchInput(searchInputRef.current.value);
	};

	return (
		<TextField
			type='search'
			label='Search'
			placeholder='Enter search query'
			sx={{
				flex: {
					xs: '0 0 100%',
					sm: '0 0 50%',
				},
			}}
			inputRef={searchInputRef}
			onChange={() => searchInputHandler()}
		/>
	);
}

export default Search;
