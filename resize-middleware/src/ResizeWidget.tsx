import { create, tsx } from '@dojo/framework/core/vdom';
import resize from '@dojo/framework/core/middleware/resize';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ resize, icache });

export const ResizeWidget = factory(function ResizeWidget({ middleware: { resize, icache } }) {
	const fontFamily = icache.getOrSet('font', 'arial');
	const fontSize = icache.getOrSet('size', '16');
	const dimensions = resize.get('text-input');

	return (
		<div key="root">
			<select
				onchange={(event) => {
					icache.set('font', (event.target as HTMLInputElement).value);
				}}
			>
				<option value="arial">arial</option>
				<option value="courier new">courier new</option>
				<option value="comic sans ms">comic sans ms</option>
			</select>
			<input
				oninput={(event) => {
					icache.set('size', (event.target as HTMLInputElement).value);
				}}
				type="range"
				value={fontSize}
				min={8}
				max={40}
				step={1}
			/>
			<div classes={['container']}>
				<div
					key="text-input"
					classes={['text']}
					contenteditable="true"
					styles={{
						fontFamily,
						fontSize: `${fontSize}px`
					}}
				>
					<h1>Here is some text</h1>
					<p>
						you can edit it if you like! as you do, the dimensions of this div element will be reflected
						automatically.
					</p>
				</div>
			</div>
			{dimensions && (
				<div classes={['height']} styles={{ height: `${dimensions.height}px` }}>
					<span>{`${Math.ceil(dimensions.height)}px`}</span>
				</div>
			)}
		</div>
	);
});
