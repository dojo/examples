import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Link from '@dojo/framework/routing/Link';

import store from '../store';
import { loginProcess } from '../processes/loginProcesses';
import ErrorList from './ErrorList';

const factory = create({ icache, store });

export const Login = factory(function Login({ middleware: { store, icache } }) {
	const { get, path, executor } = store;
	const isLoading = get(path('login', 'isLoading'));
	const errors = get(path('errors'));
	const email = icache.get<string>('email') || '';
	const password = icache.get<string>('password') || '';
	function setEmail(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement;
		icache.set('email', target.value);
	}
	function setPassword(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement;
		icache.set('password', target.value);
	}

	return (
		<div classes={['auth-page']}>
			<div classes={['container', 'page']}>
				<div classes={['row']}>
					<div classes={['col-md-6', 'offset-md-3', 'col-xs-12']}>
						<h1 classes={['text-xs-center']}>Sign In</h1>
						<p classes={['text-xs-center']}>
							<Link to="register">Need an account?</Link>
						</p>
						{errors && <ErrorList errors={errors} />}
						<form
							onsubmit={(event: Event) => {
								event.preventDefault();
								executor(loginProcess)({ email, password });
							}}
						>
							<fieldset>
								<fieldset classes={['form-group']}>
									<input
										autocomplete="email"
										value={email}
										placeholder="Email"
										type="email"
										oninput={setEmail}
										classes={['form-control', 'form-control-lg']}
									></input>
								</fieldset>
								<fieldset classes={['form-group']}>
									<input
										autocomplete="current-password"
										value={password}
										placeholder="Password"
										type="password"
										oninput={setPassword}
										classes={['form-control', 'form-control-lg']}
									></input>
								</fieldset>
							</fieldset>
							<button
								disabled={isLoading}
								type="submit"
								classes={['btn btn-lg', 'btn-primary', 'pull-xs-right']}
							>
								Sign In
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Login;
