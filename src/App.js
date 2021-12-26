import { useState, useEffect } from 'react';
import { announs as announsAtom } from './atoms';
import { useRecoilState } from 'recoil';
import { Container, Typography, Box } from '@mui/material';
import Search from './components/Search';
import AddAnnounsDialog from './components/AddAnnounDialog';
import AnnounList from './components/AnnounList';

function App() {
	// current search input state
	const [searchInput, setSearchInput] = useState('');

	// saved announs state (got from recoil atoms)
	const [announs, setAnnouns] = useRecoilState(announsAtom);

	// if localStorage is not empty set announs state by localStorage
	useEffect(() => {
		if (localStorage.getItem('announs')) {
			setAnnouns(JSON.parse(localStorage.getItem('announs')));
		}
	}, []);

	// if announs changes => edit record in localStorage
	useEffect(() => {
		localStorage.setItem('announs', JSON.stringify(announs));
	}, [announs]);

	return (
		<div className='App'>
			<Container maxWidth='lg' sx={{ marginBottom: 10 }}>
				<header>
					<Typography
						// variant='h4'
						component='h1'
						pt={5}
						pb={3}
						textAlign='center'
						fontSize={40}
					>
						Announs App
					</Typography>
				</header>
				{/* Search and Add container */}
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
					mb={4}
				>
					<Search setSearchInput={setSearchInput} />
					<AddAnnounsDialog />
				</Box>
				{/* End of Search and Add container */}
				<AnnounList searchInput={searchInput} />
			</Container>
		</div>
	);
}

export default App;
