import { RouteName } from '../routes';

export async function copyToClipboard(text: string) {
	try {
		if (navigator.clipboard) {
			await copyWithClipboardApi(text);
			return true;
		}
	} catch (e) {
		console.log(`Failed to copy ${e}`);
	}
	try {
		return copyWithExecCommand(text);
	} catch (e) {
		console.log(`failed to copy using fallback`);
	}
	return false;
}

function copyWithClipboardApi(text: string) {
	return navigator.clipboard.writeText(text);
}

function copyWithExecCommand(text: string) {
	const result = document.execCommand('copy');
	if (!result) {
		console.log('Failed to copy using fallback');
	}
}

export function buildCopyUrl(hashList: string[]) {
	const separator = window.location.pathname.endsWith('/') ? '' : '/';
	if (hashList.length === 1) {
		return `${window.location.origin + window.location.pathname}${separator}#${RouteName.Skills}/${hashList[0]}`;
	}
	return `${window.location.origin + window.location.pathname}${separator}#${RouteName.Compare}/${hashList.join(',')}`;
}

export function cleanCopyUrl(url: string) {
	return url.replace(/^.*(#(skills)|(compare))\//, '');
}
