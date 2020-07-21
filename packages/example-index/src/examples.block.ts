import { readdirSync } from 'fs';
import { join } from 'path';

export default function () {
	return readdirSync(join(__dirname, '..', '..'), { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
		.filter((name) => name !== 'example-index');
}
