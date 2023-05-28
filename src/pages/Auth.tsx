import {useState} from 'react';
import Background from '../components/Background';
import Bar from '../components/Bar';
import './Auth.css';
// import {Link} from 'react-router-dom';
// import authVk from '../assets/auth-vk.png';
// import authGoogle from '../assets/auth-google.png';

type InputProps = {
	placeholder: string,
	role: 'text' | 'password'
}

function Input({placeholder, role}: InputProps) {
	return (
		<input
			placeholder={placeholder}
			type={role}
			style={{fontSize: 18}}
			className='border-b h-10 mx-10 outline-0 focus:border-red-500 transition-all'
		/>
	);
}

type ButtonProps = {isLogin: boolean}

function Button({isLogin}: ButtonProps) {
	return (
		<button
			className='bg-red-500 mx-auto w-40 h-16 text-white rounded-md hover:bg-red-600 transition-all'
			style={{fontSize: 30}}
		>
			{isLogin ? 'Sign in' : 'Sign up'}
		</button>
	);
}

// type OtherButtonProps = {img: string, to: string}

// function OtherButton({img, to}: OtherButtonProps) {
// 	return (
// 		<Link to={to}>
// 			<img src={img} className='rounded-full h-14 w-14' />
// 		</Link>
// 	);
// }

function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const [seen, setSeen] = useState(false);

	return (
		<Background>
			<Bar/>
			<div className='flex justify-center items-center h-full pt-18'>
				<div className='flex flex-col bg-white w-96 rounded-md [&>*]:my-5 pb-5 transition-all'>
					<div className='flex justify-between select-none'>
						<div className='flex items-center'>
							<div className={`h-14 ${isLogin ? 'bg-red-500' : 'bg-gray-300'} w-2 transition-all`}></div>
							<span
								className={`${isLogin ? 'text-red-500' : 'text-gray-300 hover:text-gray-500 cursor-pointer'} font-bold ml-5 transition-all`}
								style={{fontSize: 30}}
								onClick={() => isLogin ? null : setIsLogin(true)}
							>Login</span>
						</div>
						<div className='flex items-center'>
							<span
								className={`${isLogin ? 'text-gray-300 hover:text-gray-500 cursor-pointer' : 'text-red-500'} font-bold mr-5 transition-all`}
								style={{fontSize: 30}}
								onClick={() => isLogin ? (setIsLogin(false), seen ? null : setSeen(true)) : null}
							>Register</span>
							<div className={`h-14 ${isLogin ? 'bg-gray-300' : 'bg-red-500'} w-2 transition-all`}></div>
						</div>
					</div>
					<Input placeholder='Username' role='text'/>
					<Input placeholder='Password' role='password'/>
					<div style={seen ? isLogin ? {animation: 'za 1s', height: 0, opacity: 0} : {animation: 'az 1s'} : {height: 0, opacity: 0}}>
						<Input placeholder='Repeat password' role='password'/>
					</div>
					<Button isLogin={isLogin}/>
					<div className='flex items-center self-center [&>*]:mx-5'>
						{/*
						<OtherButton img={authVk} to='/auth/vk'/>
						<OtherButton img={authGoogle} to='/auth/google'/>
						*/}
					</div>
				</div>
			</div>
		</Background>
	);
}

export default Auth;
