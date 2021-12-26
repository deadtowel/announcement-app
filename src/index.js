import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById('root'),
);

reportWebVitals();
