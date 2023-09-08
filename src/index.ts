import { Injector, Logger } from "replugged";

const inject = new Injector();
const logger = Logger.plugin("UnlockMetaLocks");

async function loadMetaUnlock() {
	(() => {
		let meta = document.createElement("meta");
		meta.httpEquiv = "Content-Security-Policy";
		meta.content = "upgrade-insecure-requests";
		meta.setAttribute("meta_unlock", "yes");
		document.head.appendChild(meta);
	})();
}

async function unloadMetaUnlock() {
	(() => {
		document.querySelectorAll("meta").forEach((element) => {
			if (element.getAttribute("meta_unlock")) element.remove();
		})
	})();
}

export async function start(): Promise<void> {
	await loadMetaUnlock();
	logger.log('Meta unlocked!');
}

export async function stop(): Promise<void> {
	await unloadMetaUnlock();
	inject.uninjectAll();
	logger.log('Meta is set to default');
}
