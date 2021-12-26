import { useRecoilState } from 'recoil';
import { announs as announsAtom } from '../atoms';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function DeleteAnnounDialog({ isDeleteOpen, setIsDeleteOpen, itemId }) {
	// get state from recoil atoms
	const [announs, setAnnouns] = useRecoilState(announsAtom);

	// get current item
	const currentItem = announs.find((announ) => itemId === announ.id);

	// event handlers
	const handleClose = () => {
		setIsDeleteOpen(false);
	};

	const handleDelete = () => {
		// deleting announ from announs state
		const newAnnouns = announs.filter((announ) => announ.id !== itemId);

		// pushing new announsArray to localStorage
		localStorage.setItem('announs', JSON.stringify(newAnnouns));
		setAnnouns(newAnnouns);

		// closing Delete dialog
		setIsDeleteOpen(false);
	};

	return (
		<div className='DeleteDialog'>
			<Dialog open={isDeleteOpen} onClose={handleClose} sx={{ padding: 0 }}>
				<DialogTitle
					variant='h6'
					component='h2'
					textAlign='center'
					sx={{ fontSize: 19, padding: '1.5rem 1.5rem 0.5rem' }}
				>
					Delete '{currentItem.title}'?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default DeleteAnnounDialog;
