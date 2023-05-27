import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Auth from './pages/Auth';

function App() {
	const router = createBrowserRouter([
		{
			element: <Auth/>,
			path: '/auth',
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
