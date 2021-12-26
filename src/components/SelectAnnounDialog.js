import { announs as announsAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,
	Grid,
} from '@mui/material';
import AnnounItem from './AnnounItem';

function SelectAnnounDialog({ isSelectOpen, setIsSelectOpen, itemId }) {
	// get state from recoil atoms
	const announs = useRecoilValue(announsAtom);

	// get parent announ
	const parentAnnoun = announs.find((announ) => announ.id === itemId);

	// find similar announs
	const announs2Show = announs.filter((announ) => {
		//check if current announ is not shown
		if (announ.id === parentAnnoun.id) return false;

		const parentTitleArr = parentAnnoun.title.toLowerCase().split(' ');
		const parentDescriptionArr = parentAnnoun.description
			.toLowerCase()
			.split(' ');

		let isSimilar = false;

		const currentTitleArr = announ.title.toLowerCase().split(' ');
		const currentDescriptionArr = announ.description.toLowerCase().split(' ');

		parentTitleArr.forEach((word) => {
			if (
				currentTitleArr.includes(word) ||
				currentDescriptionArr.includes(word)
			) {
				isSimilar = true;
			}
		});

		parentDescriptionArr.forEach((word) => {
			if (
				currentTitleArr.includes(word) ||
				currentDescriptionArr.includes(word)
			) {
				isSimilar = true;
			}
		});

		return isSimilar;
	});

	// crop found announs to only top 3
	const croppedAnnouns2Show = announs2Show.slice(0, 3);

	// event handlers
	const closeClickHandler = () => {
		setIsSelectOpen(false);
	};

	return (
		<div className='SelectDialog'>
			<Dialog
				open={isSelectOpen}
				maxWidth='auto'
				onClose={closeClickHandler}
				p={2}
			>
				<DialogContent
					sx={{
						padding: {
							md: '1.5rem 1.5rem 0.5rem',
							xs: '1.5rem',
						},
						overflowY: 'unset',
					}}
				>
					<Grid container justifyContent='center'>
						<Grid item md='auto' sm='auto' xs={12}>
							<AnnounItem
								variant='no-show-button'
								title={parentAnnoun.title}
								description={parentAnnoun.description}
								editDate={parentAnnoun.editDate}
								id={parentAnnoun.id}
							/>
						</Grid>
					</Grid>
					{/* Similar Announs Typography */}
					{croppedAnnouns2Show.length ? (
						<Typography
							variant='h6'
							component='h2'
							textAlign='center'
							sx={{
								margin: '2rem 0 0.75rem',
								fontSize: 17,
							}}
						>
							SIMILAR ANNOUNS
						</Typography>
					) : (
						<Typography
							variant='h6'
							component='h2'
							textAlign='center'
							sx={{
								margin: '1.5rem 0 0 0',
								fontSize: 17,
							}}
							color='gray'
						>
							NO SIMILAR ANNOUNS
						</Typography>
					)}
					{/* End of Similar Announs Typography */}
					<Grid
						container
						spacing={2}
						justifyContent='start'
						sx={{
							minWidth: {
								md: 790,
							},
						}}
					>
						{croppedAnnouns2Show.map((announ, index) => {
							return (
								<AnnounItem
									variant='no-show-button'
									key={index}
									title={announ.title}
									description={announ.description}
									editDate={announ.editDate}
									id={announ.id}
								/>
							);
						})}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeClickHandler}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default SelectAnnounDialog;
