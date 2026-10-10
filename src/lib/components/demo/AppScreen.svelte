<script>
	// The app being captured in the laptop demo. Purely illustrative, so it is
	// hidden from assistive tech by the parent.
	let { id } = $props();

	const sheet = [
		{ n: 1, a: 'Product', b: 'Qty', c: 'Price (IDR)', d: 'Total (IDR)', bold: true },
		{ n: 2, a: 'Gayo Coffee 250 g', b: '12', c: '89,000', d: '1,068,000' },
		{ n: 3, a: 'Jasmine Tea 100 g', b: '8', c: '42,000', d: '336,000' },
		{ n: 4, a: 'Palm Sugar 500 g', b: '20', c: '36,500', d: '730,000' },
		{ n: 5, a: 'Forest Honey 250 ml', b: '6', c: '125,000', d: '750,000' },
		{ n: 6, a: '', b: '', c: '', d: '' },
		{ n: 7, a: 'Total', b: '46', c: '', d: '2,884,000', bold: true },
		{ n: 8, a: '', b: '', c: '', d: '' },
		{ n: 9, a: '', b: '', c: '', d: '' },
		{ n: 10, a: '', b: '', c: '', d: '' }
	];

	const code = [
		{ n: 36, html: '<i class="k">import</i> { useCart } <i class="k">from</i> <i class="s">\'../hooks/useCart\'</i>' },
		{ n: 37, html: '' },
		{ n: 38, html: '<i class="k">export function</i> <i class="f">CartList</i>() {' },
		{ n: 39, html: '  <i class="k">const</i> { items } = <i class="f">useCart</i>()' },
		{ n: 40, html: '  <i class="k">return</i> (' },
		{ n: 41, html: '    &lt;<i class="f">ul</i> className=<i class="s">"cart"</i>&gt;' },
		{ n: 42, html: '      {items.<i class="f">map</i>(item =&gt; &lt;<i class="f">CartItem</i> {...item} /&gt;)}', err: true },
		{ n: 43, html: '    &lt;/<i class="f">ul</i>&gt;' },
		{ n: 44, html: '  )' },
		{ n: 45, html: '}' }
	];
</script>

{#if id === 'debug'}
	<div class="editor">
		<div class="activity"><span class="sq on"></span><span class="ci"></span><span class="sq"></span></div>
		<div class="tree">
			<div class="tree-title">EXPLORER</div>
			<div style="padding-left:12px">▾ src</div>
			<div style="padding-left:22px">▾ components</div>
			<div class="sel" style="padding-left:34px">CartList.tsx</div>
			<div style="padding-left:34px">CartItem.tsx</div>
			<div style="padding-left:22px">▸ hooks</div>
			<div style="padding-left:22px">App.tsx</div>
			<div style="padding-left:22px">main.tsx</div>
			<div style="padding-left:12px">package.json</div>
		</div>
		<div class="main">
			<div class="tabs"><span class="tab on">CartList.tsx</span><span class="tab">useCart.ts</span></div>
			<div class="code">
				{#each code as line (line.n)}
					<div class:err={line.err}><span class="ln">{line.n}</span>{@html line.html}</div>
				{/each}
			</div>
			<div class="terminal">
				<div class="term-tabs"><span>PROBLEMS</span><span>OUTPUT</span><span class="on">TERMINAL</span></div>
				<div class="term">
					<div style="color:#9AA4AD">$ npm run dev</div>
					<div style="color:#8FE3A4">&nbsp; ready in 312 ms &nbsp;➜ &nbsp;http://localhost:5173/</div>
					<div style="color:#FF7A7A">Uncaught TypeError: Cannot read properties of undefined (reading 'map')</div>
					<div style="color:#C9D1D9">&nbsp;&nbsp;&nbsp; at CartList (src/components/CartList.tsx:42:18)</div>
					<div style="color:#6B7680">&nbsp;&nbsp;&nbsp; at renderWithHooks (react-dom.development.js:16305)</div>
					<div style="color:#6B7680">&nbsp;&nbsp;&nbsp; at mountIndeterminateComponent (react-dom.development.js:20074)</div>
				</div>
			</div>
		</div>
	</div>
{:else if id === 'extract'}
	<div class="sheet">
		<div class="sheet-bar">
			<b>B</b><i>I</i><u>U</u><span>|</span><span>$</span><span>%</span><span>.00</span><span>|</span><span>Σ Sum</span><span>Filter</span>
		</div>
		<div class="fx"><span class="cell-ref">D7</span><span class="fx-i">fx</span><span class="mono">=SUM(D2:D5)</span></div>
		<div class="cols">
			<span style="width:36px"></span><span style="width:210px">A</span><span style="width:80px">B</span><span style="width:120px">C</span><span class="col-on" style="width:140px">D</span><span style="flex:1;border:0">E</span>
		</div>
		{#each sheet as r (r.n)}
			<div class="row" class:bold={r.bold}>
				<span class="rn">{r.n}</span>
				<span style="width:210px">{r.a}</span>
				<span class="num" style="width:80px">{r.b}</span>
				<span class="num" style="width:120px">{r.c}</span>
				<span class="num" style="width:140px">{r.d}</span>
				<span style="flex:1;border:0"></span>
			</div>
		{/each}
		<div class="sheet-tabs"><span class="on">October</span><span>September</span><span>+</span></div>
	</div>
{:else if id === 'generate'}
	<div class="design">
		<div class="design-bar">
			<span class="logo-sq"></span><span>▢</span><span>◯</span><span>T</span><span>✎</span>
			<span style="margin-left:auto">Catalog / <b>Mobile</b></span>
			<span class="share">Share</span>
		</div>
		<div class="design-body">
			<div class="layers">
				<div style="padding:0 12px 8px;font-weight:600;color:#E6E6E6">Layers</div>
				<div style="padding:4px 12px">▾ ▭ Product / Mobile</div>
				<div class="layer-on" style="padding:4px 22px">▾ ▢ Card</div>
				<div style="padding:4px 36px">◇ Badge</div>
				<div style="padding:4px 36px">▨ Image</div>
				<div style="padding:4px 36px">T Title</div>
				<div style="padding:4px 36px">T Price</div>
				<div style="padding:4px 36px">▢ Button</div>
			</div>
			<div class="canvas">
				<div class="card">
					<div class="card-img">
						<span class="badge">New</span>
						<span class="hill"></span>
						<span class="sun"></span>
					</div>
					<div style="padding:12px 14px 14px">
						<div style="font-weight:700;font-size:16px">Gayo Coffee 250 g</div>
						<div style="margin-top:2px;font-size:11.5px;color:#56606A">Medium roast · Aceh</div>
						<div style="margin-top:8px;font-weight:700;font-size:15px">IDR 89,000</div>
						<div class="card-btn">Add to cart</div>
					</div>
				</div>
				<div class="card-sel"></div>
				<div class="card-dim">220 × 243</div>
			</div>
			<div class="inspector">
				<div class="ih">Design</div>
				<div class="ir"><span>W 220</span><span>H 243</span></div>
				<div class="ir"><span>X 55</span><span>Y 30</span></div>
				<div class="ih">Fill</div>
				<div style="display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:3px;background:#fff"></span>FFFFFF</div>
				<div class="ih">Corner radius</div>
				<div>16</div>
				<div class="ih">Effects</div>
				<div>Drop shadow</div>
			</div>
		</div>
	</div>
{:else if id === 'explain'}
	<div class="board">
		<div class="board-bar">
			<b>Order Service · v1</b>
			<span style="display:flex;gap:8px;align-items:center"><span class="av" style="background:#F5A524"></span><span class="av" style="background:#6A5A8E;margin-left:-14px;border:2px solid #fff"></span><span class="share blue">Share</span></span>
		</div>
		<div class="board-tools"><span>↖</span><span>▢</span><span>↗</span><span>T</span><span class="sticky-ic"></span></div>
		<svg viewBox="0 0 600 280" width="580" class="diagram">
			<defs><marker id="wbh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#0C1013" /></marker></defs>
			<g stroke="#0C1013" stroke-width="1.6" fill="none" marker-end="url(#wbh)">
				<path d="M110 132H160" /><path d="M215 110V74" /><path d="M270 132H320" /><path d="M430 124L480 62" /><path d="M375 154V210" /><path d="M430 232H480" /><path d="M530 210V74" />
			</g>
			<g stroke="#0C1013" stroke-width="1.6" fill="#FFFFFF">
				<rect x="20" y="110" width="90" height="44" rx="6" /><rect x="160" y="110" width="110" height="44" rx="6" /><rect x="160" y="30" width="110" height="44" rx="6" /><rect x="320" y="110" width="110" height="44" rx="6" /><rect x="480" y="30" width="100" height="44" rx="6" fill="#DCE8FF" /><rect x="320" y="210" width="110" height="44" rx="6" /><rect x="480" y="210" width="100" height="44" rx="6" />
			</g>
			<g fill="#0C1013" text-anchor="middle">
				<text x="65" y="136">Client</text><text x="215" y="136">API Gateway</text><text x="215" y="56">Auth Service</text><text x="375" y="136">Order Service</text><text x="530" y="56">PostgreSQL</text><text x="375" y="236">Queue</text><text x="530" y="236">Worker</text>
			</g>
		</svg>
		<div class="sticky">v2: add a cache in front of PostgreSQL?</div>
	</div>
{:else if id === 'summarize'}
	<div class="pdf">
		<div class="pdf-bar"><span>▤ Thumbnails</span><span>1 / 4</span><span>− &nbsp;100% &nbsp;+</span><span>⌕</span></div>
		<div class="pdf-body">
			<div class="thumbs"><span class="on"></span><span></span><span></span></div>
			<div style="flex:1;padding:16px 20px 0">
				<div class="page">
					<div class="mono" style="font-size:10px;color:#56606A">INTERNAL REPORT · Q3</div>
					<div style="margin-top:6px;font-weight:700;font-size:20px">Q3 Operations Report</div>
					<div class="ph">1. Performance overview</div>
					<p>Revenue grew quarter over quarter, driven mainly by subscriptions. Growth was strongest among enterprise customers.</p>
					<div class="ph">2. Costs and support</div>
					<p>Support costs rose with higher ticket volume, and the average first response time increased.</p>
					<div class="ph">3. Next steps</div>
					<p>The team plans simple ticket automation next quarter and will add two support agents.</p>
				</div>
			</div>
		</div>
	</div>
{:else if id === 'fields'}
	<div class="browser">
		<div class="b-tabs"><span class="b-tab"><span class="fav"></span>Taxpayer Registration</span><span style="padding:0 12px;color:#56606A">+</span></div>
		<div class="b-addr"><span>←</span><span>→</span><span>↻</span><span class="url">register.example.com/taxpayer</span></div>
		<div class="site-head">Example Tax Portal</div>
		<div style="padding:20px 24px">
			<div style="font-weight:700;font-size:19px">Taxpayer Registration</div>
			<div class="form">
				<div><div class="lbl">Taxpayer ID <span class="req">*</span></div><div class="inp ph-c">00.000.000.0-000.000</div></div>
				<div><div class="lbl">Full name as on ID card <span class="req">*</span></div><div class="inp">Budi Santoso</div></div>
				<div style="display:flex;gap:12px">
					<div style="width:130px"><div class="lbl">Postal code</div><div class="inp ph-c">12345</div></div>
					<div style="flex:1"><div class="lbl">Business type <span class="req">*</span></div><div class="inp ph-c" style="justify-content:space-between"><span>Select a category</span><span>▾</span></div></div>
				</div>
				<div class="cont">Continue</div>
			</div>
		</div>
	</div>
{:else if id === 'edit'}
	<div class="chat">
		<div class="chat-list">
			<div class="search">Search</div>
			<div class="conv on"><span class="av lg" style="background:#F5A524"></span><span><b>Rina Kusuma</b><br /><small>Thanks, sending…</small></span></div>
			<div class="conv"><span class="av lg" style="background:#7B8CA3"></span><span><b>Delivery Team</b><br /><small>Pickup at 4 PM</small></span></div>
			<div class="conv"><span class="av lg" style="background:#34C759"></span><span><b>Andi</b><br /><small>See you tomorrow</small></span></div>
		</div>
		<div style="flex:1;display:flex;flex-direction:column">
			<div class="chat-head"><span class="av" style="background:#F5A524;width:30px;height:30px"></span><b>Rina Kusuma</b></div>
			<div class="msgs">
				<div class="in">Hi! Here are the delivery contacts.</div>
				<div class="in">Email: rina.kusuma@example.com<br />Phone: +62 812-3456-7890</div>
				<div class="out">Thanks, sending them to the courier now.</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.mono { font-family: var(--mono); }
	/* code editor */
	.editor { display: flex; height: 464px; background: #14181d; color: #c9d1d9; font-family: var(--mono); font-size: 12px; }
	.activity { width: 44px; background: #101317; display: flex; flex-direction: column; align-items: center; gap: 16px; padding-top: 14px; }
	.activity span { width: 18px; height: 18px; border: 2px solid #5b6671; box-sizing: border-box; border-radius: 4px; }
	.activity .ci { border-radius: 50%; }
	.activity .on { border-color: #c9d1d9; }
	.tree { width: 150px; background: #171b21; padding: 10px 0; font-family: var(--font); font-size: 12.5px; color: #9aa4ad; }
	.tree > div { padding-top: 3px; padding-bottom: 3px; }
	.tree-title { padding: 0 12px 8px; font-size: 11px; letter-spacing: 0.08em; }
	.tree .sel { background: #26303b; color: #f2f4ef; }
	.main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
	.tabs { height: 30px; display: flex; background: #101317; }
	.tab { display: flex; align-items: center; padding: 0 14px; color: #6b7680; }
	.tab.on { background: #14181d; color: #f2f4ef; border-top: 2px solid #4d8dff; }
	.code { height: 238px; padding-top: 8px; line-height: 20px; box-sizing: border-box; white-space: pre; }
	.code .err { background: rgba(255, 90, 90, 0.12); }
	.code .err .ln { color: #ff7a7a; }
	.ln { display: inline-block; width: 40px; text-align: right; padding-right: 14px; color: #4a545e; }
	.code :global(i) { font-style: normal; }
	.code :global(.k) { color: #ff7ab2; }
	.code :global(.s) { color: #a5d6a7; }
	.code :global(.f) { color: #82aaff; }
	.terminal { flex: 1; border-top: 1px solid #2a323b; background: #101317; padding: 0 12px; }
	.term-tabs { height: 28px; display: flex; align-items: center; gap: 18px; font-size: 11px; color: #6b7680; }
	.term-tabs .on { color: #f2f4ef; border-bottom: 1px solid #f2f4ef; padding-bottom: 2px; }
	.term { line-height: 19px; padding-top: 6px; white-space: nowrap; }
	/* spreadsheet */
	.sheet { position: relative; height: 464px; background: #fff; font-size: 12.5px; color: #1f2328; }
	.sheet-bar { height: 34px; display: flex; align-items: center; gap: 16px; padding: 0 12px; background: #f6f7f5; border-bottom: 1px solid #e1e4dd; color: #56606a; font-size: 12px; }
	.sheet-bar b { color: #1f2328; }
	.fx { height: 28px; display: flex; align-items: center; border-bottom: 1px solid #e1e4dd; font-size: 12px; }
	.cell-ref { width: 60px; text-align: center; border-right: 1px solid #e1e4dd; color: #56606a; }
	.fx-i { padding: 0 10px; color: #56606a; font-style: italic; }
	.cols { display: flex; height: 24px; line-height: 24px; background: #f6f7f5; border-bottom: 1px solid #e1e4dd; color: #56606a; font-size: 11.5px; text-align: center; }
	.cols span { border-right: 1px solid #e1e4dd; }
	.cols .col-on { background: #e3ecfa; color: #1a56c4; }
	.row { display: flex; height: 28px; line-height: 28px; border-bottom: 1px solid #eef0eb; }
	.row.bold { font-weight: 700; }
	.row span { padding: 0 8px; box-sizing: border-box; border-right: 1px solid #eef0eb; white-space: nowrap; overflow: hidden; }
	.row .num { text-align: right; }
	.row .rn { width: 36px; padding: 0; text-align: center; background: #f6f7f5; border-right-color: #e1e4dd; color: #56606a; font-weight: 400; font-size: 11.5px; }
	.sheet-tabs { position: absolute; left: 0; bottom: 0; width: 100%; height: 28px; display: flex; align-items: center; gap: 4px; padding: 0 10px; box-sizing: border-box; background: #f6f7f5; border-top: 1px solid #e1e4dd; font-size: 12px; color: #56606a; }
	.sheet-tabs span { padding: 4px 12px; }
	.sheet-tabs .on { background: #fff; border-radius: 4px; color: #1a56c4; font-weight: 600; }
	/* design tool */
	.design { height: 464px; background: #2c2c2e; color: #b0b0b0; font-size: 12px; }
	.design-bar { height: 36px; display: flex; align-items: center; gap: 14px; padding: 0 12px; border-bottom: 1px solid #3a3a3d; }
	.design-bar b { color: #e6e6e6; font-weight: 500; }
	.logo-sq { width: 24px; height: 24px; border-radius: 6px; background: #0d99ff; }
	.share { margin-left: auto; padding: 4px 10px; border-radius: 6px; background: #0d99ff; color: #fff; font-weight: 600; }
	.share.blue { margin-left: 0; background: #3d5afe; }
	.design-body { display: flex; height: 428px; }
	.layers { width: 170px; border-right: 1px solid #3a3a3d; padding: 10px 0; color: #e6e6e6; }
	.layer-on { background: rgba(13, 153, 255, 0.2); color: #fff; }
	.canvas { position: relative; width: 330px; background: #e5e5e5; }
	.card { position: absolute; left: 55px; top: 30px; width: 220px; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12); color: #0c1013; }
	.card-img { position: relative; height: 110px; background: #c3ccd8; }
	.badge { position: absolute; left: 10px; top: 10px; background: #0c1013; color: #f2f4ef; font-size: 10.5px; font-weight: 600; padding: 3px 9px; border-radius: 999px; }
	.hill { position: absolute; left: 70px; bottom: 0; width: 80px; height: 70px; background: #7b8ca3; border-radius: 40px 40px 0 0; }
	.sun { position: absolute; left: 94px; top: 22px; width: 32px; height: 32px; background: #7b8ca3; border-radius: 50%; border: 3px solid #c3ccd8; }
	.card-btn { margin-top: 10px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; background: #0c1013; color: #f2f4ef; font-size: 12.5px; font-weight: 600; }
	.card-sel { position: absolute; left: 54px; top: 29px; width: 220px; height: 243px; border: 1.5px solid #0d99ff; }
	.card-dim { position: absolute; left: 120px; top: 278px; padding: 2px 6px; border-radius: 4px; background: #0d99ff; color: #fff; font-size: 10.5px; }
	.inspector { flex: 1; border-left: 1px solid #3a3a3d; padding: 10px 12px; display: flex; flex-direction: column; gap: 10px; }
	.ih { color: #e6e6e6; font-weight: 600; margin-top: 4px; }
	.ir { display: flex; justify-content: space-between; }
	/* whiteboard */
	.board { position: relative; height: 464px; background-color: #fafaf7; background-image: radial-gradient(#d9dcd3 1px, transparent 1px); background-size: 18px 18px; color: #0c1013; }
	.board-bar { height: 36px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; background: #fff; border-bottom: 1px solid #e6e9e2; font-size: 12.5px; }
	.board-bar b { font-weight: 600; }
	.av { display: inline-block; width: 22px; height: 22px; border-radius: 50%; flex: 0 0 auto; }
	.av.lg { width: 32px; height: 32px; }
	.board-tools { position: absolute; left: 10px; top: 60px; width: 36px; padding: 6px 0; display: flex; flex-direction: column; align-items: center; gap: 12px; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12); font-size: 13px; color: #56606a; }
	.sticky-ic { width: 14px; height: 14px; background: #ffd60a; border-radius: 2px; }
	.diagram { position: absolute; left: 60px; top: 52px; font-family: var(--mono); font-size: 12px; }
	.sticky { position: absolute; left: 470px; top: 340px; width: 130px; padding: 10px; background: #ffe680; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12); font-size: 12.5px; line-height: 1.4; transform: rotate(-2deg); }
	/* pdf */
	.pdf { height: 464px; background: #dadbd7; font-size: 12px; color: #56606a; }
	.pdf-bar { height: 36px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; background: #f6f6f4; border-bottom: 1px solid #d0d2cc; }
	.pdf-body { display: flex; height: 428px; }
	.thumbs { width: 90px; background: #edeeea; border-right: 1px solid #d0d2cc; padding: 12px 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
	.thumbs span { width: 52px; height: 68px; background: #fff; }
	.thumbs .on { outline: 2px solid #3d7bf0; outline-offset: 2px; }
	.page { background: #fff; height: 420px; padding: 22px 26px; box-sizing: border-box; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12); color: #0c1013; }
	.page .ph { margin-top: 12px; font-weight: 700; font-size: 12.5px; }
	.page p { margin: 4px 0 0; font-size: 12px; line-height: 1.55; color: #2a323b; }
	/* browser */
	.browser { height: 464px; background: #fff; font-size: 12.5px; color: #0c1013; }
	.b-tabs { height: 34px; display: flex; align-items: flex-end; gap: 2px; padding: 0 10px; background: #e3e6e9; }
	.b-tab { height: 28px; display: flex; align-items: center; gap: 8px; padding: 0 14px; background: #fff; border-radius: 8px 8px 0 0; font-size: 12px; }
	.fav { width: 12px; height: 12px; border-radius: 3px; background: #0c3b5e; }
	.b-addr { height: 36px; display: flex; align-items: center; gap: 12px; padding: 0 12px; border-bottom: 1px solid #e1e4dd; color: #56606a; }
	.url { flex: 1; height: 26px; display: flex; align-items: center; padding: 0 12px; border-radius: 999px; background: #f1f3f4; color: #1f2328; font-size: 12px; }
	.site-head { height: 44px; display: flex; align-items: center; padding: 0 24px; background: #0c3b5e; color: #fff; font-weight: 700; font-size: 14px; }
	.form { width: 400px; margin-top: 14px; display: flex; flex-direction: column; gap: 12px; }
	.lbl { font-weight: 600; font-size: 12.5px; }
	.req { color: #c0392b; }
	.inp { margin-top: 5px; height: 36px; display: flex; align-items: center; padding: 0 12px; border: 1px solid #b9c0b3; border-radius: 7px; }
	.ph-c { color: #8a95a0; }
	.cont { height: 38px; width: 120px; display: flex; align-items: center; justify-content: center; border-radius: 7px; background: #0c3b5e; color: #fff; font-weight: 600; }
	/* messages */
	.chat { display: flex; height: 464px; background: #fff; font-size: 13px; color: #0c1013; }
	.chat-list { width: 200px; background: #f4f5f7; border-right: 1px solid #e1e4e8; padding: 10px; box-sizing: border-box; }
	.search { height: 28px; display: flex; align-items: center; padding: 0 10px; border-radius: 8px; background: #e6e8ec; color: #8a95a0; font-size: 12px; }
	.conv { display: flex; gap: 10px; align-items: center; padding: 8px; margin-top: 4px; border-radius: 10px; }
	.conv small { font-size: 11.5px; color: #56606a; }
	.conv.on { background: #0a84ff; color: #fff; margin-top: 10px; }
	.conv.on small { color: rgba(255, 255, 255, 0.85); }
	.chat-head { height: 52px; display: flex; align-items: center; gap: 10px; padding: 0 16px; border-bottom: 1px solid #e1e4e8; }
	.msgs { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
	.msgs > div { max-width: 290px; padding: 8px 12px; border-radius: 16px; line-height: 1.5; }
	.in { align-self: flex-start; background: #e9e9eb; }
	.out { align-self: flex-end; background: #0a84ff; color: #fff; }
</style>
