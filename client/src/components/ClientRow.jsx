import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({ client }) {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		// refetch data from GraphQL again to update front-end ui
		refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
		// this is a new way to update the front-end ui, it will edit the cache. It won't make a new request to the API
		// update: (cache, { data: { deleteClient } }) => {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS });
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		// setting data to filter the client that matches the id of the one that we wanna delete
		// 		data: {
		// 			clients: clients.filter((client) => client.id !== deleteClient.id),
		// 		},
		// 	});
		// },
	});

	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button
					className='btn btn-danger btn-sm'
					onClick={deleteClient}
				>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
}
