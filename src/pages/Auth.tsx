import {InputHTMLAttributes, useEffect, useState} from 'react';
import Background from '../components/Background';
import Bar from '../components/Bar';
import React from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import styled, {css} from 'styled-components';
import authVk from '../assets/auth-vk.png';
// import authGoogle from '../assets/auth-google.png';

type InputProps =
	React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
	{fail?: string}

const Input = ({fail, ...props}: InputProps) => (
	<div className='relative flex flex-col'>
		<input
			style={{fontSize: 18}}
			className='border-b h-10 mx-10 outline-0 focus:border-red-500 transition-all'
			{...props}
		/>
		{fail ? <span className='absolute' style={{top: '40px', left: '40px'}}>{fail}</span> : null}
	</div>
);

type SignButtonProps = {className?: string, isLogin: boolean}

const SignButton = (({className, isLogin}: SignButtonProps) => (
	<button
		className={`${className} bg-red-500 mx-auto w-40 h-16 text-white rounded-md hover:bg-red-600 transition-all`}
		style={{fontSize: 30}}
	>
		Sign {isLogin ? 'in' : 'up'}
	</button>
));

type OAuthButtonProps = {logo: string, url: string}

const OAuthButton = ({logo, url}: OAuthButtonProps) => (
	<Link to={url}>
		<img src={logo} className='rounded-full h-14 w-14 cursor-pointer' />
	</Link>
);

const VkOAuthButton = () => (
	<OAuthButton
		url={`/api/auth/vk?source=${encodeURI(window.location.href)}`}
		logo={authVk}
	/>
);

const AnimatedDiv = styled.div<{isSeen: boolean, isLogin: boolean}>`
		@keyframes to {
		0% {
			opacity: 0;
			height: 0;
		}
		50% {
			opacity: 0;
			height: 40px;
		}
		100% {
			opacity: 1;
			height: 40px;
		}
	}

	@keyframes from {
		0% {
			opacity: 1;
			height: 40px;
		}
		50% {
			opacity: 0;
			height: 40px;
		}
		100% {
			opacity: 0;
			height: 0;
		}
	}


	${props => props.isSeen ? props.isLogin
		? css`
			animation: from 1s;
			height: 0;
			opacity: 0;
		`
		: css`
			animation: to 1s;
		`
		: css`
			height: 0;
			opacity: 0;
		`}
`;

function getCookie(name: string) {
	const escaped = name.replace(/([.*+?^$(){}|[\]/\\])/g, '\\$1');
	const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escaped + '=([^;]*)'));
	return match ? match[1] : null;
}

const Auth = () => {
	const nav = useNavigate();

	if (getCookie('access_token')) {
		nav('/profile');
	}

	const params = useSearchParams()[0];
	const mapSet = (fn: (_: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => fn(e.currentTarget.value);
	const [isLogin, setLogin] = useState(true);
	const [isSeen, setSeen] = useState(false);
	const [usernameF, setUsernameF] = useState('');
	const [passwordF, setPasswordF] = useState('');
	const [repeatPasswordF, setRepeatPasswordF] = useState('');
	const refreshToken = params.get('refresh_token');

	useEffect(() => {
		if (!refreshToken) {
			return;
		}

		fetch(`/api/auth/access_token?refresh=${refreshToken}`)
			.then(i => i.json())
			.then(i => {
				if (i.error) {
					console.log(i);
				} else {
					document.cookie = `access_token=${i.token}; expires=${new Date(i.expires).toUTCString()}; path=/`;
					nav('/');
				}
			});
	}, [refreshToken, nav]);

	if (refreshToken) {
		return (
			<Background>
				<Bar/>
				<div className='flex justify-center items-center h-full pt-18'>
					<div className='flex flex-col justify-center items-center bg-white h-96 w-96 rounded-md [&>*]:my-5 pb-5 transition-all'>
						<span className='text-red-500 font-bold' style={{fontSize: 36}}>Authorizing</span>
						<svg aria-hidden='true' className='w-20 h-20 mr-2 text-white animate-spin fill-red-500' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor'/>
							<path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill'/>
						</svg>
					</div>
				</div>
			</Background>
		);
	}

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
								onClick={() => isLogin ? null : (setLogin(true), setRepeatPasswordF(''))}
							>Login</span>
						</div>
						<div className='flex items-center'>
							<span
								className={`${isLogin ? 'text-gray-300 hover:text-gray-500 cursor-pointer' : 'text-red-500'} font-bold mr-5 transition-all`}
								style={{fontSize: 30}}
								onClick={() => isLogin ? (setLogin(false), isSeen ? null : setSeen(true)) : null}
							>Register</span>
							<div className={`h-14 ${isLogin ? 'bg-gray-300' : 'bg-red-500'} w-2 transition-all`}></div>
						</div>
					</div>
					<Input
						value={usernameF}
						onChange={mapSet(setUsernameF)}
						placeholder='Username'
						type='text'
					/>
					<Input
						value={passwordF}
						onChange={mapSet(setPasswordF)}
						placeholder='Password'
						type='password'
					/>
					<AnimatedDiv isSeen={isSeen} isLogin={isLogin}>
						<Input
							value={repeatPasswordF}
							onChange={mapSet(setRepeatPasswordF)}
							placeholder='Repeat password'
							type='password'
						/>
					</AnimatedDiv>
					<SignButton isLogin={isLogin}/>
					<div className='flex items-center self-center [&>*]:mx-5'>
						<VkOAuthButton />
						{/* <OAuthButton logo={authGoogle} to='/auth/google'/> */}
					</div>
				</div>
			</div>
		</Background>
	);
};

export default Auth;
