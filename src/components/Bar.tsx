import {Link} from 'react-router-dom';
import ava from '../assets/ava.png';

function Logo() {
	return (
		<Link to='/'>
			<span className='text-white font-bold pl-2' style={{fontSize: 24}}>
				Ani
				<span className='bg-red-500 rounded-md px-1 py-0.5 ml-1'>One</span>
			</span>
		</Link>
	);
}

function Profile() {
	const color = '#afa187';

	return (
		<Link to='/profile'>
			<div className='rounded-xl p-2 flex items-center' style={{backgroundColor: color}}>
				<img src={ava} className='h-10 w-10 rounded-full'/>
				<span className='text-white ml-2 mr-4 mb-1' style={{fontSize: 20}}>
					noki3138
				</span>
			</div>
		</Link>
	);
}

function Bar() {
	return (
		<div className='fixed w-full h-18 flex justify-between items-center px-2 py-2'>
			<Logo/>
			<Profile/>
		</div>
	);
}

export default Bar;

