import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	uri: 'https://merng-project-management.onrender.com/graphql',
	// we gonna use the cache variable we created above
	cache,
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Router>
					<Header />
					<div className='container'>
						<Routes>
							<Route
								path='/'
								element={<Home />}
							/>
							<Route
								path='/projects/:id'
								element={<Project />}
							/>
							<Route
								path='*'
								element={<NotFound />}
							/>
						</Routes>
					</div>
				</Router>
			</ApolloProvider>
		</>
	);
}

export default App;
