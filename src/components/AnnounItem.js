import { useState } from 'react';
import {
	Grid,
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
	IconButton,
	Tooltip,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import EditAnnounDialog from './EditAnnounDialog';
import DeleteAnnounDialog from './DeleteAnnounDialog';
import SelectAnnounDialog from './SelectAnnounDialog';

function AnnounItem({ variant = 'primary', title, description, editDate, id }) {
	// state for management Edit dialog
	const [isEditOpen, setIsEditOpen] = useState(false);

	// state for management delete dialog
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	// state for managment Select dialog
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	// event handlers
	const deleteClickHandler = () => {
		setIsDeleteOpen(true);
	};

	const editClickHandler = () => {
		setIsEditOpen(true);
	};

	const showClickHandler = () => {
		setIsSelectOpen(true);
	};

	return (
		<>
			<Grid item md={4} sm={6} xs={12}>
				<Card sx={{ minWidth: { sm: 250, xs: 200 } }} variant='outlined'>
					<CardContent>
						<Typography sx={{ fontSize: 14 }} color='text.secondary' mb={2}>
							{`${editDate.day}.${editDate.month} ${editDate.hours}:${editDate.minutes}`}
						</Typography>
						<Typography variant='h5' component='div' mb={1}>
							{title}
						</Typography>
						<Typography variant='body2'>{description}</Typography>
					</CardContent>
					<CardActions>
						{variant === 'primary' ? (
							<Button size='small' onClick={showClickHandler}>
								Show More
							</Button>
						) : (
							<></>
						)}
						<Tooltip title='Edit Announcement'>
							<IconButton aria-label='edit' onClick={editClickHandler}>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title='Delete Announcement'>
							<IconButton aria-label='delete' onClick={deleteClickHandler}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</CardActions>
				</Card>
			</Grid>
			{/* Edit dialog */}
			{isEditOpen && (
				<EditAnnounDialog
					isEditOpen={isEditOpen}
					setIsEditOpen={setIsEditOpen}
					itemId={id}
				/>
			)}
			{/* End of Edit Dialog */}
			{/* ------------------ */}
			{/* Start of Delete Dialog */}
			{isDeleteOpen && (
				<DeleteAnnounDialog
					isDeleteOpen={isDeleteOpen}
					setIsDeleteOpen={setIsDeleteOpen}
					itemId={id}
				/>
			)}
			{/* End of Delete Dialog */}
			{/* ------------------ */}
			{/* Select Dialog */}
			{isSelectOpen && (
				<SelectAnnounDialog
					isSelectOpen={isSelectOpen}
					setIsSelectOpen={setIsSelectOpen}
					itemId={id}
				/>
			)}
			{/* End of Select Dialog */}
		</>
	);
}

export default AnnounItem;
