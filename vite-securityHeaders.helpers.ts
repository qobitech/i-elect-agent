import type { ServerResponse } from 'http';
import type { Plugin, PreviewOptions, PreviewServer, ViteDevServer } from 'vite';

interface SecurityHeadersOptions {
	// HSTS options
	strictTransportSecurity?: {
		maxAge?: number; // in seconds
		includeSubDomains?: boolean;
		preload?: boolean;
	};

	// CSP options
	contentSecurityPolicy?: {
		defaultSrc?: string[];
		scriptSrc?: string[];
		styleSrc?: string[];
		imgSrc?: string[];
		connectSrc?: string[];
		fontSrc?: string[];
		objectSrc?: string[];
		mediaSrc?: string[];
		frameSrc?: string[];
		frameAncestors?: string[];
		formAction?: string[];
		workerSrc?: string[];
		sandbox?: string[];
		reportUri?: string;
		reportOnly?: boolean;
	};

	// Permissions Policy options
	permissionsPolicy?: {
		'camera'?: string[];
		'microphone'?: string[];
		'geolocation'?: string[];
		'interest-cohort'?: string[];
		'encrypted-media'?: string[];
	};

	// Cross-Origin options
	crossOrigin?: {
		openerPolicy?: 'same-origin' | 'same-origin-allow-popups' | 'unsafe-none';
		openerPolicyReportOnly?: boolean;
		resourcePolicy?: 'same-origin' | 'same-site' | 'cross-origin';
		embedderPolicy?: 'require-corp' | 'unsafe-none';
		embedderPolicyReportOnly?: boolean;
	};

	// Referrer options
	referrerPolicy?: string;

	// Frame options
	xFrameOptions?: 'DENY' | 'SAMEORIGIN';

	// Expect-CT options
	expectCT?: {
		maxAge?: number;
		enforce?: boolean;
		reportUri?: string;
	};
}

const buildCSPHeader = (csp: SecurityHeadersOptions['contentSecurityPolicy']) => {
	if (!csp) return null;

	const directives = [];

	if (csp.defaultSrc) directives.push(`default-src ${csp.defaultSrc.join(' ')}`);
	if (csp.scriptSrc) directives.push(`script-src ${csp.scriptSrc.join(' ')}`);
	if (csp.styleSrc) directives.push(`style-src ${csp.styleSrc.join(' ')}`);
	if (csp.imgSrc) directives.push(`img-src ${csp.imgSrc.join(' ')}`);
	if (csp.connectSrc) directives.push(`connect-src ${csp.connectSrc.join(' ')}`);
	if (csp.fontSrc) directives.push(`font-src ${csp.fontSrc.join(' ')}`);
	if (csp.objectSrc) directives.push(`object-src ${csp.objectSrc.join(' ')}`);
	if (csp.mediaSrc) directives.push(`media-src ${csp.mediaSrc.join(' ')}`);
	if (csp.frameSrc) directives.push(`frame-src ${csp.frameSrc.join(' ')}`);
	if (csp.frameAncestors) directives.push(`frame-ancestors ${csp.frameAncestors.join(' ')}`);
	if (csp.sandbox) directives.push(`sandbox ${csp.sandbox.join(' ')}`);
	if (csp.reportUri) directives.push(`report-uri ${csp.reportUri}`);

	return directives.length > 0 ? directives.join('; ') : null;
};

const buildPermissionsPolicy = (permissions: SecurityHeadersOptions['permissionsPolicy']) => {
	if (!permissions) return '';

	return Object.entries(permissions)
		.map(([feature, allowlist]) => {
			if (!allowlist.length || allowlist.includes("'none'")) return `${feature}=()`;

			return `${feature}=(${allowlist.map((value) => (value.startsWith("'") ? value.slice(1, -1) : value)).join(' ')})`;
		})
		.join(', ');
};

export const createSecurityHeadersPlugin = (options: SecurityHeadersOptions = {}): Plugin => {
	const setReferrerPolicy = (res: ServerResponse, policy?: string) => {
		res.setHeader('Referrer-Policy', policy ?? 'strict-origin-when-cross-origin');
	};

	const setContentSecurityPolicy = (res: ServerResponse, cspOptions?: SecurityHeadersOptions['contentSecurityPolicy']) => {
		if (!cspOptions) return;

		const cspHeader = buildCSPHeader(cspOptions);
		if (cspHeader) {
			const headerName = cspOptions.reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
			res.setHeader(headerName, cspHeader);
		}
	};

	const setFrameOptions = (res: ServerResponse, frameOptions?: string) => {
		res.setHeader('X-Frame-Options', frameOptions ?? 'DENY');
	};

	const setPermissionsPolicy = (res: ServerResponse, permissions?: SecurityHeadersOptions['permissionsPolicy']) => {
		if (!permissions) return;

		const permissionsHeader = buildPermissionsPolicy(permissions);
		if (permissionsHeader) res.setHeader('Permissions-Policy', permissionsHeader);
	};

	const setExpectCT = (res: ServerResponse, expectCT?: SecurityHeadersOptions['expectCT']) => {
		if (!expectCT) return;

		const { maxAge = 86400, enforce = true, reportUri } = expectCT;
		let header = `max-age=${maxAge}`;
		if (enforce) header += ', enforce';
		if (reportUri) header += `, report-uri="${reportUri}"`;

		res.setHeader('Expect-CT', header);
	};

	const setCrossOriginPolicies = (res: ServerResponse, crossOrigin?: SecurityHeadersOptions['crossOrigin']) => {
		if (!crossOrigin) return;

		const { openerPolicy, openerPolicyReportOnly, resourcePolicy, embedderPolicy, embedderPolicyReportOnly } = crossOrigin;

		if (openerPolicy) res.setHeader('Cross-Origin-Opener-Policy', openerPolicy);

		if (openerPolicyReportOnly) res.setHeader('Cross-Origin-Opener-Policy-Report-Only', openerPolicy ?? 'same-origin');

		if (resourcePolicy) res.setHeader('Cross-Origin-Resource-Policy', resourcePolicy);

		if (embedderPolicy) res.setHeader('Cross-Origin-Embedder-Policy', embedderPolicy);

		if (embedderPolicyReportOnly) res.setHeader('Cross-Origin-Embedder-Policy-Report-Only', embedderPolicy ?? 'require-corp');
	};

	const setStrictTransportSecurity = (res: ServerResponse, hsts?: SecurityHeadersOptions['strictTransportSecurity']) => {
		if (!hsts) return;

		const { maxAge = 31536000, includeSubDomains = true, preload = false } = hsts;
		let header = `max-age=${maxAge}`;
		if (includeSubDomains) header += '; includeSubDomains';
		if (preload) header += '; preload';

		res.setHeader('Strict-Transport-Security', header);
	};

	const setContentTypeOptions = (res: ServerResponse) => {
		res.setHeader('X-Content-Type-Options', 'nosniff');
	};

	const addSecurityHeaders = (server: ViteDevServer | PreviewServer) => {
		server.middlewares.use((_req, res, next) => {
			setStrictTransportSecurity(res, options.strictTransportSecurity);
			setContentTypeOptions(res);
			setReferrerPolicy(res, options.referrerPolicy);
			setContentSecurityPolicy(res, options.contentSecurityPolicy);
			setFrameOptions(res, options.xFrameOptions);
			setPermissionsPolicy(res, options.permissionsPolicy);
			setExpectCT(res, options.expectCT);
			setCrossOriginPolicies(res, options.crossOrigin);
			next();
		});
	};

	return {
		name: 'vite-plugin-security-headers',
		configureServer(server: ViteDevServer) {
			addSecurityHeaders(server);
		},
		configurePreviewServer(server: PreviewServer) {
			addSecurityHeaders(server);
		},
	};
};

export const localPreviewOptions: Partial<PreviewOptions> = {
	allowedHosts: true,
};

export const remotePreviewOptions: Partial<PreviewOptions> = {
	allowedHosts: [],
};
