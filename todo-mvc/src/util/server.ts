import { createServer, MockerRequest, MockerResponse, RouteCallback } from 'service-mocker/server';

const { router } = createServer();

let id = 0;

let todos = [
	{
		uuid: `${id++}`,
		label: 'hello world',
		completed: false,
		timeCreated: Date.now()
	}
];

function failOccasionally(callback: RouteCallback) {
	return (req: MockerRequest, res: MockerResponse) => {
		const fail = !!Math.round(Math.random());
		fail ? res.sendStatus(500) : callback(req, res);
	};
}

function delayOccasionally(callback: RouteCallback) {
	return (req: MockerRequest, res: MockerResponse) => {
		const delay = !!Math.round(Math.random());
		delay ? setTimeout(() => callback(req, res), 2000) : callback(req, res);
	};
}

router.get('/todos', (req, res) => {
	res.json(todos.sort((a, b) => a.timeCreated - b.timeCreated));
});

router.delete('/todo/:id', failOccasionally((req, res) => {
	const id = req.params.id;
	todos = todos.filter((todo) => todo.uuid !== id);
	res.sendStatus(200);
}));

router.put('/todo/:id', (req, res) => {
	req.json().then((json) => {
		todos = todos.map((todo) => {
			if (todo.uuid === json.uuid) {
				return json;
			}
			return todo;
		});
		res.json(json);
	});
});

router.post('/todo', delayOccasionally(failOccasionally((req, res) => {
	req.json().then((json) => {
		const todo = {
			...json,
			uuid: `${id++}`
		};
		todos.push(todo);
		res.json(todo);
	});
})));
