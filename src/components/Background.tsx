import {ReactNode} from 'react';
import bg from '../assets/bg.jpg';

type BackgroundProps = {children?: ReactNode}

function Background({children}: BackgroundProps) {
	return (
		<div
			className='bg-center bg-cover h-screen'
			style={{backgroundImage: `url("${bg}")`}}
		>
			<div className='h-full' style={{backdropFilter: 'blur(10px)'}}>
				{children}
			</div>
		</div>
	);
}

export default Background;
