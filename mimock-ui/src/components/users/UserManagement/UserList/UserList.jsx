import React, { useState, useEffect } from 'react';
import { getAllUsers } from 'services/users/getUsers.service';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
} from './UserList.style';

export default function UserList() {
	const [gettingUsers, setGettingUsers] = useState(true);
	const [error, setError] = useState(false);
	const [users, setUsers] = useState([]);

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
			<Header data-testid='user-management-header'>User Management</Header>

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
									<FaEdit data-testid='user-edit' />
									<FaTrash data-testid='user-delete' />
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
