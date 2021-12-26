import AnnounItem from './AnnounItem';
import { announs as announsAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';

function AnnounList({ searchInput }) {
	// get states from recoil atoms
	const announs = useRecoilValue(announsAtom);

	//pick suitable announs to render
	const pickWhatRender = () => {
		let announsForRender = [];

		// if search input is not empty render found announs
		if (searchInput) {
			// filter suitable announs
			announsForRender = announs.filter((announ) => {
				return announ.title.toLowerCase().includes(searchInput.toLowerCase());
			});
		}
		// if search input is empty render list of all announs
		else {
			announsForRender = announs;
		}

		return announsForRender;
	};

	return (
		<Grid container spacing={2} justifyContent='start'>
			{/* if announs exist render suitable announs */}
			{announs &&
				pickWhatRender().map((announ, index) => {
					return (
						<AnnounItem
							key={index}
							title={announ.title}
							description={announ.description}
							editDate={announ.editDate}
							id={announ.id}
						/>
					);
				})}
		</Grid>
	);
}

export default AnnounList;
