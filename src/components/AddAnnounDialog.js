import { useState, useRef } from 'react';
import { announs as announsAtom } from '../atoms';
import { useRecoilState } from 'recoil';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Fab,
	Tooltip,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { guid } from '../utils';

function AddAnnounsDialog() {
	// get state from recoil atoms
	const [announs, setAnnouns] = useRecoilState(announsAtom);

	// dialog opening`s state
	const [open, setOpen] = useState(false);

	// state if field are empty
	const [isFieldEmpty, setIsFieldEmpty] = useState({
		title: false,
		description: false,
	});

	// inputs refs
	const titleInput = useRef(null);
	const descriptionInput = useRef(null);

	// event handlers
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCloseCancel = () => {
		setOpen(false);
	};

	const handleCloseAdd = () => {
		// checking if inputs are not empty and giving a message if are
		if (!titleInput.current.value) {
			setIsFieldEmpty({ ...isFieldEmpty, title: true });
			return;
		} else if (!descriptionInput.current.value) {
			setIsFieldEmpty({ ...isFieldEmpty, description: true });
			return;
		} else {
			setIsFieldEmpty({ title: false, description: false });
		}

		// creating current date object
		const currentDate = new Date();

		// creating new announ
		const newAnnoun = {
			title: titleInput.current.value,
			description: descriptionInput.current.value,
			editDate: {
				year: currentDate.getYear(),
				month: currentDate.getMonth() + 1,
				day: currentDate.getDate(),
				hours: currentDate.getHours(),
				minutes: currentDate.getMinutes(),
			},
			id: guid(),
		};

		// declaring empty array of future announs
		let currentAnnouns = [];

		//if localStorage isn`t empty run this code
		if (localStorage.getItem('announs')) {
			// getting announs from localStorage
			currentAnnouns = JSON.parse(localStorage.getItem('announs'));

			// adding new announ to currentAnnouns
			currentAnnouns.push(newAnnoun);
		} else {
			// adding new announ to currentAnnouns
			currentAnnouns.push(newAnnoun);
		}

		// setting new array of announs to state of announs
		setAnnouns(currentAnnouns);

		// closing dialog
		setOpen(false);
	};

	return (
		<div className='AddDialog'>
			{/* Button */}
			<Tooltip
				title='Add Announcement'
				sx={{
					marginLeft: {
						xs: 0,
						sm: 4,
					},
					position: {
						xs: 'fixed',
						sm: 'static',
					},
					bottom: '20px',
					right: '20px',
				}}
			>
				<Fab
					color='secondary'
					aria-label='add'
					size='large'
					onClick={handleClickOpen}
				>
					<Add />
				</Fab>
			</Tooltip>
			{/* End of Button */}
			{/* Dialog */}
			<Dialog open={open} onClose={handleCloseCancel} p={2}>
				<DialogTitle>Add New Announcement</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						id='title'
						label='Title'
						type='text'
						fullWidth
						variant='standard'
						sx={{ marginBottom: 2 }}
						inputRef={titleInput}
						error={isFieldEmpty.title ? true : false}
						helperText={isFieldEmpty.title ? 'The field can`t be empty' : ' '}
					/>
					<TextField
						id='description'
						label='Description'
						type='text'
						fullWidth
						variant='standard'
						multiline
						inputRef={descriptionInput}
						error={isFieldEmpty.description ? true : false}
						helperText={
							isFieldEmpty.description ? 'The field can`t be empty' : ' '
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseCancel}>Cancel</Button>
					<Button onClick={handleCloseAdd}>Add</Button>
				</DialogActions>
			</Dialog>
			{/* End of Dialog */}
		</div>
	);
}

export default AddAnnounsDialog;
