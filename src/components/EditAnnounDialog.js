import { useRef } from 'react';
import { announs as announsAtom } from '../atoms';
import { useRecoilState } from 'recoil';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';

function EditAnnounDialog({ isEditOpen, setIsEditOpen, itemId }) {
	// get state from recoil atoms
	const [announs, setAnnouns] = useRecoilState(announsAtom);

	// get parent announ
	const parentAnnoun = announs.find((announ) => announ.id === itemId);

	// inputs refs
	const titleInput = useRef(null);
	const descriptionInput = useRef(null);

	// event handlers
	const saveClickHandler = () => {
		const newAnnouns = announs.map((announ) => {
			if (announ.id === itemId) {
				return {
					...announ,
					title: titleInput.current.value,
					description: descriptionInput.current.value,
				};
			} else return announ;
		});

		setAnnouns(newAnnouns);

		setIsEditOpen(false);
	};

	const cancelClickHandler = () => {
		setIsEditOpen(false);
	};

	return (
		<div className='EditDialog'>
			<Dialog open={isEditOpen} onClose={cancelClickHandler} p={2}>
				<DialogTitle>Edit The Announcement</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						id='title'
						label='Title'
						type='text'
						fullWidth
						variant='standard'
						sx={{ marginBottom: 2 }}
						defaultValue={parentAnnoun.title}
						inputRef={titleInput}
					/>
					<TextField
						id='description'
						label='Description'
						type='text'
						fullWidth
						variant='standard'
						multiline
						defaultValue={parentAnnoun.description}
						inputRef={descriptionInput}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={cancelClickHandler}>Cancel</Button>
					<Button onClick={saveClickHandler}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditAnnounDialog;
