// The seven content types scrshot recognizes, with the data that drives the
// laptop demo: window chrome, annotations (in selection coordinates, 628×340),
// launcher actions and the result panel.

/** Arrow annotation in selection coordinates, with a precomputed head. */
function arrow(x1, y1, x2, y2) {
	const pad = 14;
	const r = (n) => Math.round(n * 10) / 10;
	const left = Math.min(x1, x2) - pad;
	const top = Math.min(y1, y2) - pad;
	const w = Math.abs(x2 - x1) + pad * 2;
	const h = Math.abs(y2 - y1) + pad * 2;
	const ax = x1 - left;
	const ay = y1 - top;
	const bx = x2 - left;
	const by = y2 - top;
	const ang = Math.atan2(by - ay, bx - ax);
	const L = 14;
	const W = 8;
	const cx = bx - L * Math.cos(ang);
	const cy = by - L * Math.sin(ang);
	const px = -Math.sin(ang) * W;
	const py = Math.cos(ang) * W;
	return {
		ex: x2,
		ey: y2,
		left,
		top,
		w,
		h,
		d: `M${r(ax)} ${r(ay)}L${r(cx)} ${r(cy)}`,
		pts: `${r(bx)},${r(by)} ${r(cx + px)},${r(cy + py)} ${r(cx - px)},${r(cy - py)}`
	};
}

const act = (label, key, icon) => ({ label, key, icon });
const code = (t, bg = 'transparent', color = '#E6EAEE') => ({ t, bg, color });

const DARK = { winBg: '#14181D', barBg: '#1B2026', barLine: '#0E1114', barText: '#C9D1D9' };
const LIGHT = { winBg: '#FFFFFF', barBg: '#ECEDEA', barLine: '#D5D8D1', barText: '#2A323B' };
const DESIGN = { winBg: '#2C2C2E', barBg: '#2C2C2E', barLine: '#1E1E20', barText: '#E6E6E6' };

const empty = { hls: [], boxes: [], blurs: [], steps: [], notes: [], arrows: [] };

export const FEATURES = [
	{
		id: 'debug',
		kind: 'Stack trace',
		action: 'Debug',
		desc: 'Capture an error and get the likely cause plus a fix you can paste.',
		app: 'Code',
		winTitle: 'CartList.tsx — shop-web',
		theme: DARK,
		ann: {
			...empty,
			hls: [{ x: 178, y: 122, w: 448, h: 20 }],
			boxes: [{ x: 184, y: 296, w: 436, h: 28 }],
			steps: [
				{ x: 148, y: 119, n: 1 },
				{ x: 150, y: 297, n: 2 }
			],
			notes: [{ x: 404, y: 214, text: 'Crashes on first load' }],
			arrows: [arrow(470, 246, 440, 290)]
		},
		det: 'Stack trace detected',
		detMeta: 'React · TypeScript · 4 frames',
		actions: [
			act('Debug this error', '↵', 'bolt'),
			act('Explain the error', '⌘E', 'spark'),
			act('Search the docs', '⌘D', 'search'),
			act('Copy as text', '⌘C', 'copy')
		],
		resMeta: 'CartList.tsx:42',
		resTitle: 'items is undefined on first render',
		resText: 'The cart has not loaded yet when CartList first renders.',
		code: [
			code('- {items.map(item => <CartItem … />)}', '#2A1A1D', '#FF9A9A'),
			code('+ {(items ?? []).map(item => <CartItem … />)}', '#18261C', '#8FE3A4')
		],
		bullets: ['Show a loading state until the cart data arrives.'],
		btn1: 'Apply fix',
		btn2: 'Open in editor'
	},
	{
		id: 'extract',
		kind: 'Table',
		action: 'Extract Data',
		desc: 'Turn any table on screen into clean CSV, JSON or a spreadsheet.',
		app: 'Spreadsheet',
		winTitle: 'October Sales.xlsx',
		theme: LIGHT,
		ann: {
			...empty,
			hls: [{ x: 20, y: 218, w: 550, h: 28 }],
			boxes: [{ x: 428, y: 24, w: 144, h: 224 }],
			steps: [{ x: 414, y: 10, n: 1 }],
			notes: [{ x: 196, y: 286, text: 'Export this for finance' }],
			arrows: [arrow(380, 284, 452, 252)]
		},
		det: 'Table detected',
		detMeta: '4 columns · 5 rows',
		actions: [
			act('Extract data', '↵', 'bolt'),
			act('Export as CSV', '⌘E', 'save'),
			act('Send to spreadsheet', '⌘G', 'spark'),
			act('Copy as text', '⌘C', 'copy')
		],
		resMeta: '5 rows · 4 columns',
		resTitle: 'Table extracted',
		resText: 'Numbers normalized and ready to export.',
		code: [
			code('product,qty,price,total', '#222B35', '#F2F4EF'),
			code('Gayo Coffee 250 g,12,89000,1068000'),
			code('Jasmine Tea 100 g,8,42000,336000'),
			code('…', 'transparent', '#8A95A0')
		],
		bullets: ['Total 2,884,000 matches the sum of all rows.'],
		btn1: 'Copy CSV',
		btn2: 'Export .xlsx'
	},
	{
		id: 'generate',
		kind: 'Design',
		action: 'Generate UI',
		desc: 'Turn a mockup into component code that matches its spacing and colors.',
		app: 'Design',
		winTitle: 'Catalog — Mobile',
		theme: DESIGN,
		ann: {
			...empty,
			steps: [
				{ x: 186, y: 34, n: 1 },
				{ x: 186, y: 222, n: 2 }
			],
			notes: [{ x: 352, y: 284, text: 'Build this as a component' }],
			arrows: [arrow(400, 282, 418, 240)]
		},
		det: 'UI design detected',
		detMeta: 'Product card · 6 layers',
		actions: [
			act('Generate UI code', '↵', 'bolt'),
			act('Export as React', '⌘R', 'spark'),
			act('Export as HTML + CSS', '⌘H', 'save'),
			act('Extract color palette', '⌘P', 'copy')
		],
		resMeta: 'React · CSS',
		resTitle: 'ProductCard.tsx is ready',
		resText: 'Spacing, colors and corner radii match the design.',
		code: [
			code('<article className="card">'),
			code('  <span className="badge">New</span>', 'transparent', '#8FE3A4'),
			code('  <h3>{name}</h3>'),
			code('  <button>Add to cart</button>')
		],
		bullets: ['Palette: #0C1013 · #FFFFFF · #C3CCD8'],
		btn1: 'Copy code',
		btn2: 'Open in editor'
	},
	{
		id: 'explain',
		kind: 'Diagram',
		action: 'Explain Architecture',
		desc: 'Get a plain-language walkthrough of how the system fits together.',
		app: 'Whiteboard',
		winTitle: 'Order Service Architecture',
		theme: LIGHT,
		ann: {
			...empty,
			boxes: [{ x: 192, y: 115, w: 120, h: 57 }],
			steps: [{ x: 50, y: 106, n: 1 }],
			notes: [{ x: 40, y: 262, text: 'Single point of failure?' }],
			arrows: [arrow(150, 258, 222, 180)]
		},
		det: 'Diagram detected',
		detMeta: 'System architecture · 7 nodes',
		actions: [
			act('Explain architecture', '↵', 'bolt'),
			act('Convert to Mermaid', '⌘M', 'spark'),
			act('Find failure points', '⌘F', 'search'),
			act('Copy image', '⌘C', 'copy')
		],
		resMeta: '7 nodes · 7 connections',
		resTitle: 'How an order flows',
		resText:
			'Client → API Gateway checks the token with Auth Service, then forwards to Order Service.',
		code: null,
		bullets: [
			'Order Service writes to PostgreSQL and queues jobs for the Worker.',
			'Risk: API Gateway and PostgreSQL each run as a single instance.'
		],
		btn1: 'Copy explanation',
		btn2: 'Convert to Mermaid'
	},
	{
		id: 'summarize',
		kind: 'Document',
		action: 'Summarize',
		desc: 'Get the key points of a page, report or PDF in seconds.',
		app: 'PDF Viewer',
		winTitle: 'Q3 Operations Report.pdf — Page 1 of 4',
		theme: LIGHT,
		ann: {
			...empty,
			hls: [{ x: 118, y: 104, w: 470, h: 36 }],
			steps: [
				{ x: 96, y: 82, n: 1 },
				{ x: 96, y: 152, n: 2 },
				{ x: 96, y: 220, n: 3 }
			],
			notes: [{ x: 400, y: 14, text: 'TL;DR for leadership' }],
			arrows: [arrow(450, 46, 400, 74)]
		},
		det: 'Document detected',
		detMeta: 'Report · 3 sections visible',
		actions: [
			act('Summarize', '↵', 'bolt'),
			act('Extract action items', '⌘A', 'spark'),
			act('Translate', '⌘T', 'search'),
			act('Copy text', '⌘C', 'copy')
		],
		resMeta: 'Page 1 · 3 sections',
		resTitle: 'TL;DR in 3 points',
		resText: 'Summary of the captured page:',
		code: null,
		bullets: [
			'Revenue up, led by subscriptions and enterprise.',
			'Support costs rose with ticket volume.',
			'Next: ticket automation and two new agents.'
		],
		btn1: 'Copy summary',
		btn2: 'Extract action items'
	},
	{
		id: 'fields',
		kind: 'Form',
		action: 'Explain Fields',
		desc: 'Understand what each field asks for before you fill it in.',
		app: 'Browser',
		winTitle: 'Taxpayer Registration',
		theme: LIGHT,
		ann: {
			...empty,
			boxes: [{ x: 4, y: 146, w: 412, h: 70 }],
			steps: [{ x: 436, y: 286, n: 2 }],
			notes: [{ x: 436, y: 150, text: 'What format is this?' }],
			arrows: [arrow(450, 182, 420, 196)]
		},
		det: 'Form detected',
		detMeta: '4 fields · 3 required',
		actions: [
			act('Explain these fields', '↵', 'bolt'),
			act('Highlight required fields', '⌘R', 'spark'),
			act('Copy field labels', '⌘L', 'copy'),
			act('Find a filling guide', '⌘D', 'search')
		],
		resMeta: '4 fields',
		resTitle: 'What each field means',
		resText: 'Fields marked * are required.',
		code: null,
		bullets: [
			'Taxpayer ID: 15 or 16 digits, as printed on your tax card.',
			'Full name: exactly as written on your ID card.',
			'Business type: the category closest to your main activity.'
		],
		btn1: 'Copy explanation',
		btn2: 'Highlight required'
	},
	{
		id: 'edit',
		kind: 'Image',
		action: 'Edit',
		desc: 'Annotate with boxes, arrows and notes, and blur private details before sharing.',
		app: 'Messages',
		winTitle: 'Rina Kusuma',
		theme: LIGHT,
		ann: {
			...empty,
			boxes: [{ x: 210, y: 76, w: 300, h: 64 }],
			blurs: [{ x: 218, y: 84, w: 284, h: 48 }],
			notes: [{ x: 360, y: 196, text: 'Hide before sharing' }],
			arrows: [arrow(420, 192, 400, 146)]
		},
		det: 'Personal info detected',
		detMeta: 'Chat · email and phone found',
		actions: [
			act('Edit image', '↵', 'bolt'),
			act('Blur sensitive info', '⌘B', 'spark'),
			act('Add annotations', '⌘A', 'search'),
			act('Save to Desktop', '⌘S', 'save')
		],
		resMeta: 'PNG · 3 edits',
		resTitle: 'Sensitive info blurred',
		resText: 'Email and phone number are hidden. Arrow and note added.',
		code: null,
		bullets: ['Blurred pixels are flattened into the exported image.'],
		btn1: 'Save to Desktop',
		btn2: 'Copy image'
	}
];

const KIND_TOOL = {
	hls: 'highlight',
	boxes: 'rect',
	blurs: 'blur',
	steps: 'step',
	notes: 'text',
	arrows: 'arrow'
};

/**
 * Orders a feature's annotations into the sequence the demo draws them in,
 * with the point the cursor moves to for each one.
 */
export function annotationSequence(feature) {
	const a = feature.ann;
	const seq = [];
	const push = (kind, o, cx, cy) => seq.push({ kind, o, tool: KIND_TOOL[kind], cx, cy });
	a.hls.forEach((o) => push('hls', o, o.x + o.w, o.y + o.h / 2));
	a.boxes.forEach((o) => push('boxes', o, o.x + o.w, o.y + o.h));
	a.blurs.forEach((o) => push('blurs', o, o.x + o.w, o.y + o.h));
	a.steps.forEach((o) => push('steps', o, o.x + 13, o.y + 13));
	a.notes.forEach((o) => push('notes', o, o.x + 8, o.y + 14));
	a.arrows.forEach((o) => push('arrows', o, o.ex, o.ey));
	return seq;
}
