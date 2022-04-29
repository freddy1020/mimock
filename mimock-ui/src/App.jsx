import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { FullPageLoader } from 'styles/Loaders';
import AppRoutes from './Routes';
import './index.css';

const App = () => {
	return (
		<RecoilRoot>
			<FullPageLoader />
			<AppRoutes />
		</RecoilRoot>
	);
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
