import React, { useState, useEffect } from 'react';
import { getAllUsers } from 'services/users/getUsers.service';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { IconButtonVariants } from 'styles/Button';
import { ConfirmationModal } from 'components/common/Modals';
import {
	UserListWrapper,
	List,
	UsersError,
	User,
	UserIcon,
	UserDetails,
	Name,
	UserName,
	Header,
	Options,
	UserInfoFlexOne,
	UserManagementHeader,
	AddButton,
} from './UserList.style';

export default function UserList() {
	const [gettingUsers, setGettingUsers] = useState(true);
	const [error, setError] = useState(false);
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState({
		name: '',
		userName: '',
		userId: '',
	});
	const [showDeletionModal, setShowDeletionModal] = useState(false);

	const deletionConfirmationMessage = `Are you sure you want to delete user "${selectedUser.userName}" ?`;

	const options = [
		{
			name: 'edit',
			icon: <FaEdit />,
			tooltip: 'Edit User',
			onClick: () => {},
		},
		{
			name: 'delete',
			icon: <FaTrash />,
			tooltip: 'Delete User',
			onClick: (user) => {
				setShowDeletionModal(true);
				setSelectedUser(user);
			},
		},
	];

	const iconColors = () => {
		const colors = [
			'bg-teal-400',
			'bg-indigo-400',
			'bg-red-400',
			'bg-gray-400',
			'bg-blue-400',
			'bg-green-400',
			'bg-orange-400',
		];

		return colors[Math.floor(Math.random() * colors.length)];
	};
	useEffect(() => {
		getAllUsers()
			.then((users) => {
				setGettingUsers(false);
				setUsers(users);
			})
			.catch(() => {
				setGettingUsers(false);
				setError(true);
			});
	}, []);

	return (
		<UserListWrapper>
			<If condition={showDeletionModal}>
				<ConfirmationModal
					message={deletionConfirmationMessage}
					cancelButtonLabel='Do not delete user'
					confirmButtonLabel='Delete user'
					onConfirm={() => {
						setShowDeletionModal(false);
					}}
					onCancel={() => {
						setShowDeletionModal(false);
					}}
				/>
			</If>
			<UserManagementHeader>
				<Header data-testid='user-management-header'>User Management</Header>
				<AddButton
					dataTestid='add-user-btn'
					label='ADD USER'
					variant={IconButtonVariants.AddButton}
				/>
			</UserManagementHeader>

			<Choose>
				<When condition={error}>
					<UsersError data-testid='user-error'>
						There was an error getting the users. Please try again later.
					</UsersError>
				</When>
				<When condition={users.length > 0}>
					<List data-testid='users-list'>
						<For each='user' of={users}>
							<User data-testid={`user-${user.userId}`} key={user.userId}>
								<UserInfoFlexOne>
									<UserIcon
										data-testid={`user-${user.userId}-icon`}
										$color={iconColors()}
									>
										{user.name[0]}
									</UserIcon>
									<UserDetails>
										<Name data-testid={`user-${user.userId}-name`}>
											{user.name}
										</Name>
										<UserName data-testid={`user-${user.userId}-username`}>
											{user.userName}
										</UserName>
									</UserDetails>
								</UserInfoFlexOne>

								<Options>
									<For each='option' of={options}>
										<Tooltip
											key={option.name}
											title={option.tooltip}
											placement='right-end'
											arrow
										>
											<IconButton
												data-testid={`${option.name}-${user.userId}`}
												onClick={() => option.onClick(user)}
											>
												{option.icon}
											</IconButton>
										</Tooltip>
									</For>
								</Options>
							</User>
						</For>
					</List>
				</When>
				<Otherwise>
					{!gettingUsers && (
						<UsersError data-testid='no-users-error'>
							There are no users to display.
						</UsersError>
					)}
				</Otherwise>
			</Choose>
		</UserListWrapper>
	);
}
