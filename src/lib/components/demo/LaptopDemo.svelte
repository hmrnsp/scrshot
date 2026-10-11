<script>
	import { untrack } from 'svelte';
	import { FEATURES, annotationSequence } from '#lib/features.js';
	import { ICONS, TOOL_ORDER } from '#lib/icons.js';
	import { demo } from '#lib/demo.svelte.js';
	import AppScreen from './AppScreen.svelte';

	// The laptop is drawn at a fixed 1200×740 and scaled to fit its container.
	const STAGE_W = 1200;
	const STAGE_H = 740;
	// Capture selection, in display coordinates.
	const SX = 44;
	const SY = 116;
	const SW = 628;
	const SH = 340;

	const STEP_LABELS = [
		['Capture', 'Press your shortcut and drag over any part of the screen.'],
		['Annotate', 'Mark it up with boxes, arrows, highlights, steps, notes and blur.'],
		['AI Actions', 'scrshot recognizes what you captured and suggests the right action.'],
		['Result', 'The result appears next to your work, ready to copy or apply.']
	];

	let width = $state(0);
	let ph = $state(0);
	let timers = [];

	const scale = $derived(width ? Math.min(1, width / STAGE_W) : 1);
	const offX = $derived(width ? Math.max(0, (width - STAGE_W * scale) / 2) : 0);
	const f = $derived(FEATURES[demo.active]);
	const seq = $derived(annotationSequence(f));
	const N = $derived(seq.length);
	// Phase numbers: 0 idle, 1 aim, 2 drag, 3 selected, 4..4+N-1 annotations,
	// then AI button, click, launcher, enter, thinking, done.
	const P = $derived({
		aim: 1,
		drag: 2,
		sel: 3,
		ann: 4,
		ai: 4 + N,
		click: 5 + N,
		launch: 6 + N,
		enter: 7 + N,
		think: 8 + N,
		done: 9 + N
	});

	function clear() {
		for (const t of timers) clearTimeout(t);
		timers = [];
	}

	function reducedMotion() {
		return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function timeline(n) {
		const T = [
			[0, 0],
			[500, 1],
			[1100, 2],
			[2500, 3]
		];
		let t = 2900;
		for (let k = 0; k < n; k++) {
			T.push([t, 4 + k]);
			t += 600;
		}
		T.push([t + 200, 4 + n], [t + 900, 5 + n], [t + 1150, 6 + n], [t + 2200, 7 + n], [t + 2500, 8 + n], [t + 3800, 9 + n]);
		return { T, end: t + 7800 };
	}

	function start(from = 0) {
		clear();
		const final = 9 + N;
		if (reducedMotion()) {
			ph = final;
			return;
		}
		if (!demo.playing) {
			if (ph === 0) ph = final;
			return;
		}
		const { T, end } = timeline(N);
		const base = (T.find((x) => x[1] === from) ?? [0])[0];
		ph = from;
		for (const [ms, p] of T) {
			if (p > from) timers.push(setTimeout(() => (ph = p), ms - base));
		}
		timers.push(
			setTimeout(() => {
				demo.active = (demo.active + 1) % FEATURES.length;
			}, end - base)
		);
	}

	function jumpTo(i) {
		const startPh = [P.aim, P.ann, P.ai, P.think][i];
		const endPh = [P.sel, P.ai - 1, P.enter, P.done][i];
		if (!demo.playing || reducedMotion()) {
			clear();
			ph = endPh;
		} else {
			start(startPh);
		}
	}

	$effect(() => {
		demo.active;
		demo.playing;
		untrack(() => start(0));
		return clear;
	});

	const ann = $derived.by(() => {
		const out = { hls: [], boxes: [], blurs: [], steps: [], notes: [], arrows: [] };
		seq.forEach((s, k) => out[s.kind].push({ ...s.o, on: ph >= P.ann + k }));
		return out;
	});

	const activeTool = $derived(ph >= P.ann && N ? seq[Math.min(N - 1, ph - P.ann)].tool : 'select');

	const cursor = $derived.by(() => {
		let x = 540;
		let y = 400;
		let cross = false;
		let dur = 650;
		if (ph === P.aim) {
			x = SX;
			y = SY;
			cross = true;
		} else if (ph === P.drag) {
			x = SX + SW;
			y = SY + SH;
			cross = true;
			dur = 1200;
		} else if (ph === P.sel) {
			x = SX + SW;
			y = SY + SH;
		} else if (ph >= P.ann && ph < P.ai) {
			const s = seq[ph - P.ann];
			x = SX + s.cx;
			y = SY + s.cy;
		} else if (ph === P.ai || ph === P.click) {
			x = SX + 590;
			y = SY + 374;
		} else if (ph >= P.launch) {
			x = 884;
			y = 166;
		}
		if (ph === 0) dur = 0;
		return { x, y, cross, dur };
	});

	const stepIdx = $derived(ph <= P.sel ? 0 : ph < P.ai ? 1 : ph < P.think ? 2 : 3);
</script>

<div class="demo">
	<div class="stage-wrap" bind:clientWidth={width} style:height="{STAGE_H * scale}px" aria-hidden="true">
		<div
			class="stage"
			style:transform="scale({scale})"
			style:left="{offX}px"
			style:visibility={width ? 'visible' : 'hidden'}
		>
			<!-- laptop body -->
			<div class="floor-shadow"></div>
			<div class="lid"></div>
			<div class="camera"></div>
			<div class="base"></div>
			<div class="notch"></div>

			<div class="display">
				<div class="wall wall-1"></div>
				<div class="wall wall-2"></div>
				<div class="wall wall-3"></div>

				<div class="menubar">
					<div class="mb-left">
						<b>{f.app}</b><span>File</span><span>Edit</span><span>View</span><span>Window</span><span>Help</span>
					</div>
					<div class="mb-right">
						<span class="mb-app">
							<svg width="14" height="14" viewBox="0 0 26 26" fill="none" stroke="var(--accent)" stroke-width="3.4" stroke-linecap="square"><path d="M3 9V3h6M17 3h6v6M23 17v6h-6M9 23H3v-6" /></svg>
						</span>
						<svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#F2F4EF" stroke-width="1.6" stroke-linecap="round"><path d="M1.5 4.5a9 9 0 0 1 13 0M4 7.2a5.5 5.5 0 0 1 8 0M6.5 9.8a2 2 0 0 1 3 0" /></svg>
						<svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.75" y="0.75" width="20" height="10.5" rx="3" stroke="#F2F4EF" stroke-width="1.2" /><rect x="2.5" y="2.5" width="13" height="7" rx="1.5" fill="#F2F4EF" /><rect x="21.8" y="4" width="1.6" height="4" rx="0.8" fill="#F2F4EF" /></svg>
						<span>Tue 2:32 PM</span>
					</div>
				</div>

				<div class="window" style:background={f.theme.winBg}>
					<div class="titlebar" style:background={f.theme.barBg} style:border-bottom-color={f.theme.barLine}>
						<span class="tl" style="background:#FF5F57"></span>
						<span class="tl" style="background:#FEBC2E"></span>
						<span class="tl" style="background:#28C840"></span>
						<span class="wt" style:color={f.theme.barText}>{f.winTitle}</span>
					</div>
					<div class="win-body">
						<AppScreen id={f.id} />
					</div>
				</div>

				<div class="dock">
					<span class="di" style="background:#3D7BF0"></span>
					<span class="di center" style="background:#F2F4EF"><span class="ring"></span></span>
					<span class="di center code-ic" style="background:#1E2630">&lt;/&gt;</span>
					<span class="di center" style="background:#1E8E3E"><span class="grid-ic"></span></span>
					<span class="di" style="background:#8E5CF7"></span>
					<span class="di center" style="background:#34C759"><span class="bubble-ic"></span></span>
					<span class="dock-sep"></span>
					<span class="di center running" style="background:#0C1013">
						<svg width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="square"><path d="M3 9V3h6M17 3h6v6M23 17v6h-6M9 23H3v-6" /></svg>
					</span>
				</div>

				<!-- capture selection -->
				<div
					class="selection"
					style:width="{ph >= P.drag ? SW : 0}px"
					style:height="{ph >= P.drag ? SH : 0}px"
					style:--dim={ph >= P.aim ? 0.5 : 0}
					style:--line={ph >= P.drag ? 'var(--accent)' : 'transparent'}
					style:--dur="{ph === P.drag ? 1200 : 0}ms"
				>
					<div class="sel-ui" class:on={ph >= P.sel}>
						<div class="size-badge">1256 × 680</div>
						{#each [[-5, -5], [309, -5], [623, -5], [-5, 165], [623, 165], [-5, 335], [309, 335], [623, 335]] as [hx, hy]}
							<span class="handle" style:left="{hx}px" style:top="{hy}px"></span>
						{/each}
					</div>

					{#each ann.hls as h}
						<div class="a-hl" class:on={h.on} style:left="{h.x}px" style:top="{h.y}px" style:width="{h.w}px" style:height="{h.h}px"></div>
					{/each}
					{#each ann.blurs as b}
						<div class="a-blur" class:on={b.on} style:left="{b.x}px" style:top="{b.y}px" style:width="{b.w}px" style:height="{b.h}px"></div>
					{/each}
					{#each ann.boxes as r}
						<div class="a-box" class:on={r.on} style:left="{r.x}px" style:top="{r.y}px" style:width="{r.w}px" style:height="{r.h}px"></div>
					{/each}
					{#each ann.arrows as a}
						<div class="a-arrow" class:on={a.on} style:left="{a.left}px" style:top="{a.top}px" style:width="{a.w}px" style:height="{a.h}px">
							<svg width={a.w} height={a.h}>
								<path d={a.d} stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" fill="none" />
								<polygon points={a.pts} fill="#FFFFFF" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round" />
								<path d={a.d} stroke="#FF453A" stroke-width="4" stroke-linecap="round" fill="none" />
								<polygon points={a.pts} fill="#FF453A" />
							</svg>
						</div>
					{/each}
					{#each ann.steps as s}
						<div class="a-step" class:on={s.on} style:left="{s.x}px" style:top="{s.y}px">{s.n}</div>
					{/each}
					{#each ann.notes as n}
						<div class="a-note" class:on={n.on} style:left="{n.x}px" style:top="{n.y}px">{n.text}</div>
					{/each}

					<!-- annotation toolbar -->
					<div class="toolbar" class:on={ph >= P.sel}>
						{#each TOOL_ORDER as t}
							<span class="tool" class:active={t === activeTool}>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={ICONS[t]} /></svg>
							</span>
						{/each}
						<span class="tb-sep"></span>
						<span class="swatch" style="background:#FF453A;box-shadow:0 0 0 2px #16191D,0 0 0 3.5px #FFFFFF"></span>
						<span class="swatch" style="background:#FFD60A"></span>
						<span class="swatch" style="background:#0A84FF"></span>
						<span class="swatch" style="background:#FFFFFF"></span>
						<span class="tb-sep"></span>
						{#each ['undo', 'copy', 'save'] as t}
							<span class="tool sm"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={ICONS[t]} /></svg></span>
						{/each}
						<span class="ai-btn" class:pressed={ph === P.click}>
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#0C1013" stroke-width="1.8" stroke-linejoin="round"><path d={ICONS.spark} /></svg>AI Actions
						</span>
					</div>
				</div>

				<!-- launcher -->
				<div class="launcher" class:on={ph >= P.launch}>
					<div class="l-head">
						<span class="l-logo">
							<svg width="18" height="18" viewBox="0 0 26 26" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="square"><path d="M3 9V3h6M17 3h6v6M23 17v6h-6M9 23H3v-6" /></svg>
						</span>
						<div>
							<div class="l-title">{f.det}</div>
							<div class="l-meta">{f.detMeta}</div>
						</div>
					</div>
					<div class="l-search">
						<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#6B7680" stroke-width="1.8" stroke-linecap="round"><path d={ICONS.search} /></svg>Search actions…
					</div>
					<div class="l-list">
						{#each f.actions as x, i}
							<div class="l-item" class:primary={i === 0}>
								<span class="l-label">
									<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d={ICONS[x.icon]} /></svg>{x.label}
								</span>
								<span class="l-key" class:flash={i === 0 && ph === P.enter}>{x.key}</span>
							</div>
						{/each}
					</div>
					<div class="l-foot"><span>↑↓ navigate</span><span>↵ run</span><span>esc close</span></div>
				</div>

				<!-- result -->
				<div class="result" class:on={ph >= P.think}>
					<div class="r-head">
						<span class="r-app">
							<svg width="12" height="12" viewBox="0 0 26 26" fill="none" stroke="var(--accent)" stroke-width="3.4" stroke-linecap="square"><path d="M3 9V3h6M17 3h6v6M23 17v6h-6M9 23H3v-6" /></svg>scrshot · {f.action}
						</span>
						{#if ph >= P.done}
							<span class="chip done">✓ Done</span>
						{:else}
							<span class="chip">Analyzing…</span>
						{/if}
					</div>
					<div class="skeleton" class:on={ph === P.think}>
						<div>Reading your capture…</div>
						<div class="bar"><div class="bar-fill" class:run={ph >= P.think}></div></div>
						<div class="sk" style="width:70%"></div>
						<div class="sk" style="width:92%"></div>
						<div class="sk" style="width:55%"></div>
					</div>
					<div class="r-body" class:on={ph >= P.done}>
						<div class="r-meta">{f.resMeta}</div>
						<div class="r-title">{f.resTitle}</div>
						<div class="r-text">{f.resText}</div>
						{#if f.code}
							<div class="r-code">
								{#each f.code as k}
									<div style:background={k.bg} style:color={k.color}>{k.t}</div>
								{/each}
							</div>
						{/if}
						<ul class="r-list">
							{#each f.bullets as b}
								<li>{b}</li>
							{/each}
						</ul>
						<div class="r-btns"><span class="r-btn primary">{f.btn1}</span><span class="r-btn">{f.btn2}</span></div>
					</div>
				</div>

				<!-- cursor -->
				<div class="cursor" style:left="{cursor.x}px" style:top="{cursor.y}px" style:--cdur="{cursor.dur}ms">
					{#if cursor.cross}
						<svg width="34" height="34" viewBox="-17 -17 34 34" class="cross"><path d="M0 -15V15M-15 0H15" stroke="#FFFFFF" stroke-width="3.2" /><path d="M0 -15V15M-15 0H15" stroke="#0C1013" stroke-width="1.2" /></svg>
					{:else}
						<svg width="22" height="26" viewBox="0 0 22 26" class="pointer" class:press={ph === P.click}><path d="M2 2L2 20L7 15.5L10.5 23L13.5 21.7L10 14.3L16.5 14.3Z" fill="#0C1013" stroke="#FFFFFF" stroke-width="1.6" stroke-linejoin="round" /></svg>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="controls">
		<div class="steps">
			<button
				class="play"
				type="button"
				onclick={() => (demo.playing = !demo.playing)}
				aria-label={demo.playing ? 'Pause the demo' : 'Play the demo'}
				title={demo.playing ? 'Pause the demo' : 'Play the demo'}
			>
				{#if demo.playing}
					<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2.5" y="1.5" width="3" height="11" rx="1" /><rect x="8.5" y="1.5" width="3" height="11" rx="1" /></svg>
				{:else}
					<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3.5 1.5v11l9-5.5z" /></svg>
				{/if}
			</button>
			<span class="divider" aria-hidden="true"></span>
			{#each STEP_LABELS as [label], i}
				<button
					class="step"
					class:now={i === stepIdx}
					class:done={i < stepIdx}
					type="button"
					onclick={() => jumpTo(i)}
					aria-label="Go to step {i + 1}: {label}"
					aria-current={i === stepIdx ? 'step' : undefined}
				>
					<span class="dot" aria-hidden="true">{i < stepIdx ? '✓' : i + 1}</span>{label}
				</button>
			{/each}
		</div>
		<p class="caption" aria-live="polite">{STEP_LABELS[stepIdx][1]}</p>

		<div class="tabs" role="group" aria-label="Choose a feature to preview">
			{#each FEATURES as feat, i (feat.id)}
				<button class="tab" class:on={i === demo.active} type="button" aria-pressed={i === demo.active} onclick={() => (demo.active = i)}>
					<span>{feat.kind}</span><span class="tab-action">→ {feat.action}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.demo { width: 100%; }
	.stage-wrap { position: relative; width: 100%; max-width: 1200px; margin: 0 auto; overflow: hidden; }
	.stage { position: absolute; top: 0; width: 1200px; height: 740px; transform-origin: 0 0; color: #0c1013; font-variant-ligatures: none; }

	/* laptop */
	.floor-shadow { position: absolute; left: 150px; top: 722px; width: 900px; height: 18px; border-radius: 50%; background: rgba(0, 0, 0, 0.35); filter: blur(10px); }
	.lid { position: absolute; left: 50px; top: 0; width: 1100px; height: 704px; border-radius: 22px 22px 6px 6px; background: #0b0d10; border: 1px solid #2a2f36; box-sizing: border-box; }
	.camera { position: absolute; left: 596px; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: #1e242b; }
	.base { position: absolute; left: 0; top: 700px; width: 1200px; height: 20px; border-radius: 2px 2px 16px 16px; background: #c9cdd3; border-bottom: 2px solid #9da3ab; }
	.notch { position: absolute; left: 520px; top: 700px; width: 160px; height: 7px; border-radius: 0 0 8px 8px; background: #a9aeb5; }

	.display { position: absolute; left: 62px; top: 14px; width: 1076px; height: 676px; border-radius: 6px; overflow: hidden; background: #233140; }
	.wall { position: absolute; border-radius: 50%; filter: blur(90px); }
	.wall-1 { left: -120px; top: -160px; width: 620px; height: 620px; background: #3b6683; }
	.wall-2 { right: -100px; bottom: -140px; width: 560px; height: 560px; background: #6a5a8e; }
	.wall-3 { left: 380px; top: 240px; width: 380px; height: 300px; background: #2e4e68; filter: blur(80px); }

	.menubar { position: absolute; left: 0; top: 0; width: 100%; height: 26px; display: flex; align-items: center; justify-content: space-between; padding: 0 14px; box-sizing: border-box; background: rgba(14, 18, 22, 0.55); backdrop-filter: blur(20px); color: #f2f4ef; font-size: 12.5px; }
	.mb-left, .mb-right { display: flex; align-items: center; gap: 16px; }
	.mb-app { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 20px; border-radius: 5px; background: rgba(255, 255, 255, 0.22); }

	.window { position: absolute; left: 28px; top: 44px; width: 660px; height: 500px; border-radius: 11px; overflow: hidden; box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.25); }
	.titlebar { position: relative; height: 36px; display: flex; align-items: center; gap: 8px; padding: 0 14px; border-bottom: 1px solid; box-sizing: border-box; }
	.tl { width: 12px; height: 12px; border-radius: 50%; }
	.wt { position: absolute; left: 90px; right: 90px; text-align: center; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.win-body { position: relative; height: 464px; overflow: hidden; }

	.dock { position: absolute; left: 50%; bottom: 8px; transform: translateX(-50%); display: flex; gap: 8px; padding: 6px 8px; border-radius: 18px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.25); }
	.di { position: relative; width: 42px; height: 42px; border-radius: 11px; }
	.center { display: flex; align-items: center; justify-content: center; }
	.ring { width: 24px; height: 24px; border-radius: 50%; border: 3px solid #3d7bf0; box-sizing: border-box; }
	.code-ic { color: #4d8dff; font-family: var(--mono); font-weight: 700; font-size: 13px; }
	.grid-ic { width: 22px; height: 18px; border: 2px solid #fff; box-sizing: border-box; border-radius: 2px; }
	.bubble-ic { width: 22px; height: 18px; border-radius: 9px; background: #fff; }
	.dock-sep { width: 1px; background: rgba(255, 255, 255, 0.35); margin: 4px 2px; }
	.running::after { content: ''; position: absolute; bottom: -5px; left: 19px; width: 4px; height: 4px; border-radius: 50%; background: #f2f4ef; }

	/* selection + annotations */
	.selection { position: absolute; left: 44px; top: 116px; box-shadow: 0 0 0 2400px rgba(6, 8, 10, var(--dim)); outline: 1.5px solid var(--line); transition: width var(--dur) cubic-bezier(0.4, 0, 0.2, 1), height var(--dur) cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s; }
	.sel-ui { position: absolute; left: 0; top: 0; width: 628px; height: 340px; opacity: 0; transition: opacity 0.3s; }
	.sel-ui.on { opacity: 1; }
	.size-badge { position: absolute; left: 0; top: -28px; padding: 3px 8px; border-radius: 5px; background: var(--accent); color: #0c1013; font-family: var(--mono); font-size: 11px; font-weight: 700; }
	.handle { position: absolute; width: 9px; height: 9px; background: #fff; border: 1.5px solid var(--accent); }

	.a-hl, .a-blur, .a-box, .a-arrow, .a-step, .a-note { position: absolute; opacity: 0; }
	.a-hl { background: rgba(255, 214, 10, 0.38); border-radius: 2px; transform-origin: left center; transform: scaleX(0); transition: opacity 0.2s, transform 0.45s ease-out; }
	.a-blur { border-radius: 6px; background: rgba(233, 233, 235, 0.45); backdrop-filter: blur(7px); transition: opacity 0.4s; }
	.a-box { border: 3px solid #ff453a; border-radius: 7px; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6); box-sizing: border-box; transform-origin: top left; transform: scale(0.6); transition: opacity 0.2s, transform 0.4s ease-out; }
	.a-arrow { transform: scale(0.6); transition: opacity 0.2s, transform 0.35s cubic-bezier(0.2, 1.4, 0.4, 1); }
	.a-arrow svg { display: block; overflow: visible; }
	.a-step { width: 26px; height: 26px; border-radius: 50%; background: #ff453a; border: 2px solid #fff; box-sizing: border-box; color: #fff; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); transform: scale(0.6); transition: opacity 0.2s, transform 0.35s cubic-bezier(0.2, 1.6, 0.4, 1); }
	.a-note { padding: 5px 10px; border-radius: 7px; background: #ff453a; border: 2px solid #fff; color: #fff; font-size: 13px; font-weight: 700; white-space: nowrap; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3); transform-origin: left center; transform: scale(0.6); transition: opacity 0.2s, transform 0.35s cubic-bezier(0.2, 1.4, 0.4, 1); }
	.on.a-hl, .on.a-blur, .on.a-box, .on.a-arrow, .on.a-step, .on.a-note { opacity: 1; transform: none; }

	.toolbar { position: absolute; left: 0; top: 352px; height: 44px; display: flex; align-items: center; gap: 2px; padding: 0 6px; border-radius: 12px; background: #16191d; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45); white-space: nowrap; opacity: 0; transform: translateY(8px); transition: opacity 0.3s, transform 0.3s; }
	.toolbar.on { opacity: 1; transform: none; }
	.tool { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; stroke: #b4bdc6; transition: background 0.2s; }
	.tool.sm { width: 28px; }
	.tool.active { background: rgba(255, 255, 255, 0.16); stroke: var(--accent); }
	.tb-sep { width: 1px; height: 22px; background: #2f363e; margin: 0 6px; }
	.swatch { width: 16px; height: 16px; border-radius: 50%; margin: 0 4px; }
	.ai-btn { height: 32px; display: flex; align-items: center; gap: 6px; margin-left: 6px; padding: 0 12px; border-radius: 8px; background: var(--accent); color: #0c1013; font-size: 12.5px; font-weight: 700; transition: transform 0.15s, box-shadow 0.3s; }
	.ai-btn.pressed { transform: scale(0.92); box-shadow: 0 0 0 6px rgba(212, 255, 63, 0.3); }

	/* launcher */
	.launcher { position: absolute; left: 700px; top: 44px; width: 352px; padding: 8px; box-sizing: border-box; background: rgba(246, 247, 243, 0.97); border-radius: 14px; box-shadow: 0 22px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.2); opacity: 0; transform: translateY(10px) scale(0.97); transform-origin: top left; transition: opacity 0.3s, transform 0.4s cubic-bezier(0.2, 1.2, 0.4, 1); }
	.launcher.on { opacity: 1; transform: none; }
	.l-head { display: flex; gap: 10px; align-items: center; padding: 6px 6px 10px; }
	.l-logo { flex: 0 0 auto; width: 34px; height: 34px; border-radius: 9px; background: #0c1013; display: flex; align-items: center; justify-content: center; }
	.l-title { font-weight: 700; font-size: 13.5px; }
	.l-meta { font-family: var(--mono); font-size: 10.5px; color: #56606a; }
	.l-search { height: 32px; display: flex; align-items: center; gap: 8px; padding: 0 10px; border-radius: 8px; background: #e6e9e2; color: #6b7680; font-size: 12.5px; }
	.l-list { margin-top: 6px; }
	.l-item { height: 34px; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 10px; color: #2a323b; font-size: 13px; stroke: #56606a; }
	.l-item.primary { height: 36px; border-radius: 8px; background: #0c1013; color: #f2f4ef; font-weight: 600; stroke: var(--accent); }
	.l-label { display: flex; align-items: center; gap: 9px; }
	.l-key { font-family: var(--mono); font-size: 10.5px; color: #6b7680; }
	.primary .l-key { color: #0c1013; background: var(--accent); border-radius: 5px; padding: 2px 7px; transition: box-shadow 0.2s; }
	.primary .l-key.flash { box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.45); }
	.l-foot { margin-top: 6px; padding: 6px 6px 2px; border-top: 1px solid #d5dacf; display: flex; gap: 14px; font-size: 10.5px; color: #6b7680; font-family: var(--mono); }

	/* result */
	.result { position: absolute; left: 700px; top: 330px; width: 352px; min-height: 150px; max-height: 276px; overflow: hidden; background: rgba(15, 19, 23, 0.97); border-radius: 14px; border: 1px solid #2a323b; box-shadow: 0 22px 60px rgba(0, 0, 0, 0.5); color: #e6eaee; opacity: 0; transform: translateY(12px); transition: opacity 0.3s, transform 0.4s cubic-bezier(0.2, 1.2, 0.4, 1); }
	.result.on { opacity: 1; transform: none; }
	.r-head { height: 34px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; border-bottom: 1px solid #222a32; font-size: 11.5px; }
	.r-app { display: flex; align-items: center; gap: 8px; color: #b4bdc6; }
	.chip { padding: 2px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.08); color: #b4bdc6; font-weight: 600; }
	.chip.done { background: rgba(143, 227, 164, 0.15); color: #8fe3a4; }
	.skeleton { position: absolute; left: 14px; right: 14px; top: 50px; font-size: 12.5px; color: #b4bdc6; opacity: 0; transition: opacity 0.3s; }
	.skeleton.on { opacity: 1; }
	.bar { margin-top: 10px; height: 4px; border-radius: 2px; background: #222a32; overflow: hidden; }
	.bar-fill { height: 100%; width: 0; background: var(--accent); }
	.bar-fill.run { width: 100%; transition: width 1.2s linear; }
	.sk { margin-top: 10px; height: 10px; border-radius: 4px; background: #222a32; }
	.r-body { padding: 12px 14px 14px; opacity: 0; transition: opacity 0.45s; }
	.r-body.on { opacity: 1; }
	.r-meta { font-family: var(--mono); font-size: 10.5px; color: #8a95a0; }
	.r-title { margin-top: 4px; font-weight: 700; font-size: 16.5px; line-height: 1.2; color: #f2f4ef; }
	.r-text { margin-top: 6px; font-size: 12.5px; line-height: 1.5; color: #b4bdc6; }
	.r-code { margin-top: 8px; border-radius: 7px; background: #1a2027; font-family: var(--mono); font-size: 11px; line-height: 1.7; overflow: hidden; }
	.r-code div { padding: 0 10px; white-space: pre; overflow: hidden; text-overflow: ellipsis; }
	.r-list { margin: 8px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 5px; }
	.r-list li { position: relative; padding-left: 14px; font-size: 12px; line-height: 1.45; }
	.r-list li::before { content: ''; position: absolute; left: 0; top: 6px; width: 6px; height: 6px; border-radius: 2px; background: var(--accent); }
	.r-btns { margin-top: 10px; display: flex; gap: 6px; }
	.r-btn { height: 28px; display: flex; align-items: center; padding: 0 12px; border-radius: 999px; border: 1px solid #3a444e; font-size: 11.5px; }
	.r-btn.primary { background: var(--accent); border-color: var(--accent); color: #0c1013; font-weight: 700; }

	/* cursor */
	.cursor { position: absolute; z-index: 20; pointer-events: none; transition: left var(--cdur) cubic-bezier(0.4, 0, 0.2, 1), top var(--cdur) cubic-bezier(0.4, 0, 0.2, 1); }
	.cross { position: absolute; left: -17px; top: -17px; }
	.pointer { position: absolute; left: -2px; top: -2px; transform-origin: 2px 2px; transition: transform 0.15s; }
	.pointer.press { transform: scale(0.82); }

	/* controls */
	.controls { display: flex; flex-direction: column; align-items: center; gap: 12px; padding-top: 22px; }
	.steps { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px 10px; }
	.play { width: 44px; height: 44px; border-radius: 50%; border: 1px solid #3a444e; background: #151a20; color: #f2f4ef; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; }
	.play:hover { border-color: #8a95a0; }
	.divider { width: 1px; height: 24px; background: #2a323b; margin: 0 6px; }
	.step { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 12px 0 8px; border: 1px solid transparent; border-radius: 999px; background: transparent; color: #8a95a0; font-size: 14px; cursor: pointer; }
	.step:hover { border-color: #2a323b; }
	.dot { width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid #3a444e; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 13px; }
	.step.done { color: #b4bdc6; }
	.step.done .dot { border-color: var(--accent); color: var(--accent); font-weight: 700; }
	.step.now { color: #f2f4ef; font-weight: 600; }
	.step.now .dot { background: var(--accent); border-color: var(--accent); color: #0c1013; font-weight: 700; }
	.caption { margin: 0; min-height: 22px; font-size: 15px; line-height: 1.45; color: #b4bdc6; text-align: center; }
	.tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 12px; }
	.tab { display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 18px; border-radius: 999px; border: 1px solid #2a323b; background: transparent; color: #e6eaee; font-size: 15px; font-weight: 500; cursor: pointer; }
	.tab:hover { border-color: #5b6671; }
	.tab-action { font-family: var(--mono); font-size: 12px; color: #9aa4ad; }
	.tab.on { background: var(--accent); border-color: var(--accent); color: #0c1013; font-weight: 600; }
	.tab.on .tab-action { color: #0c1013; }
	@media (max-width: 640px) {
		.tabs { width: 100%; flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; padding-bottom: 6px; scroll-snap-type: x proximity; scrollbar-width: none; }
		.tabs::-webkit-scrollbar { display: none; }
		.tab { flex: 0 0 auto; scroll-snap-align: start; }
	}
</style>
