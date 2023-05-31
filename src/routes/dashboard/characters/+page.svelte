<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Menu from '../Menu.svelte';
	import { onMount } from 'svelte';
	import genshindb from 'genshin-db';
	let name_filter;
	let filter = 'reset';
	let characters;
	let cards = '';
	if (filter === 'reset') {
		characters = genshindb.characters('names', { matchCategories: true });
	}
	export async function char_name(characters) {
		let char_cards = '<div class="grid char_grid">';
		let char_name;
		let count = 0;
		for (let name of characters) {
			if (name === 'Aether' || name === 'Lumine') {
				continue;
			}
			char_name = genshindb.characters(name);
			let c_name = char_name?.name.replace(' ', '_');
			let char_icon = char_name?.images.nameicon;
			let char_rank = char_name?.rarity;
			let char_color;
			if (char_rank == '5') {
				char_color = '#c98f1c';
			} else {
				char_color = '#8e5a9c';
			}
			let char_card =
				'<a class="char_card" align="left" style="text-decoration:none; color:black;" href=/characters/' +
				c_name +
				'><article class="char_card_class" id="char_card" style="background-color:' +
				char_color +
				';"><img src="https://res.cloudinary.com/genshin/image/upload/sprites/' +
				char_icon +
				'" on:error={reload_image} alt="icon">' +
				'<div class="container"><small><b>' +
				name +
				'</b></small></div></article></a>';
			char_cards += char_card;
			count++;
			if (count % 6 === 0) {
				char_cards += '</div><div class="grid char_grid">';
			}
			if (count >= 66) {
				break;
			}
		}
		char_cards += '</div>';
		cards = char_cards;
		return cards;
	}
	function userOwnCharacters() {
		characters = [];
		data.charactersPulled.forEach((element) => {
			characters.push(element.name);
		});
		char_name(characters);
	}

	function pyro() {
		filter = 'pyro';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function hydro() {
		filter = 'hydro';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function anemo() {
		filter = 'anemo';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function electro() {
		filter = 'electro';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function dendro() {
		filter = 'dendro';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function cryo() {
		filter = 'cryo';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function geo() {
		filter = 'geo';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}
	function reset() {
		filter = 'reset';
		characters = genshindb.characters('name', { matchCategories: true });
		return characters
	}

	function sword() {
		filter = 'sword';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function claymore() {
		filter = 'claymore';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function polearm() {
		filter = 'polearm';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function catalyst() {
		filter = 'catalyst';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}

	function bow() {
		filter = 'bow';
		characters = genshindb.characters(filter, { matchCategories: true });
		return characters
	}
	function name_f() {
		let cname_array = [];
		let cname_status;
		let lowcasename;
		let cleaname;
		let cname_f = genshindb.characters('name' , { matchCategories: true } );
		// let cname_f = characters;
		cname_f.forEach((element) => {
			lowcasename = name_filter.toLocaleLowerCase();
			cleaname = lowcasename.replace(/ /g, '');
			element = element.toLowerCase();
			element = element.replace(/ /g, '');
			cname_status = element.includes(cleaname);
			if (element === 'aether' || element === 'lumine') {
				cname_status = false;
			}
			if (cname_status === true) {
				let og_name = genshindb.characters(element, { matchAltNames: false });
				cname_array = cname_array.concat(og_name?.name);
			}
		});
		return characters = cname_array;
	}
</script>

<img class="sideimg" src="/img/side background.jpg" alt="" />
<Menu />
<img class="bgimage" src="/img/sucrose_aside.png" alt="" />
<main class="container">
	<div class="grid first-grid">
		<h2 class="char_title">Characters</h2>
	</div>
	<div class="grid">
		<form>
			<div class="grid">
				<input
					bind:value={name_filter}
					placeholder="Search"
					class="filter"
					type="search"
					on:input={() => name_f()}
				/>
			</div>
		</form>
		<div class="grid img_filter">
			<button on:click={reset} class="reset"><img src="/img/reset.png" alt="reset" /></button>
			<button on:click={pyro}><img src="/img/element/Pyro.webp" alt="Pyro" /></button>
			<button on:click={hydro}><img src="/img/element/Hydro.webp" alt="Hydro" /></button>
			<button on:click={anemo}><img src="/img/element/Anemo.webp" alt="Anemo" /></button>
			<button on:click={electro}><img src="/img/element/Electro.webp" alt="Electro" /></button>
			<button on:click={dendro}><img src="/img/element/Dendro.webp" alt="Dendro" /></button>
			<button on:click={cryo}><img src="/img/element/Cryo.webp" alt="Cryo" /></button>
			<button on:click={geo}><img src="/img/element/Geo.webp" alt="Geo" /></button>
			<button on:click={userOwnCharacters}
				><img src="/img/userlogo/characters.webp" alt="Geo" /></button
			>
		</div>
		<div class="grid img_filter_weapon">
			<button on:click={sword}
				><img class="weapon" src="/img/weapon/Sword.webp" alt="Sword" /></button
			>
			<button on:click={claymore}
				><img class="weapon2" src="/img/weapon/Claymore.webp" alt="Claymore" /></button
			>
			<button on:click={polearm}
				><img class="weapon" src="/img/weapon/Polearm.webp" alt="Polearm" /></button
			>
			<button on:click={catalyst}
				><img class="weapon3" src="/img/weapon/Catalyst.webp" alt="Catalyst" /></button
			>
			<button on:click={bow}><img class="weapon2" src="/img/weapon/Bow.webp" alt="Bow" /></button>
		</div>
	</div>
		{#await char_name(characters)}
			<div id="char_card_container">
				<div class="grid char_grid">
					<p aria-busy="true">....Loading information</p>
				</div>
			</div>
		{:then cards}
			<div id="char_card_container">
				{@html cards}
			</div>
		{/await}
	<div class="container user">
		<div class="row profile">
			<div class="col-6 container profile">
				<div class="row">
					<div class="col username">
						{#if !data}
							<a href="/login">Login</a>
						{:else}
							<a href="/dashboard">{data.user.username}</a>
						{/if}
					</div>
				</div>
				<div class="row">
					<div class="col">
						<a href="/dashboard/wish"
							><img class="userlogo" src="/img/userlogo/wish.webp" alt="logo" /></a
						>
					</div>
					<!-- <div class="col">
								<a href="/profile/artifacts"><img class="userlogo" src="/img/userlogo/artifact.webp" alt="logo"></a>
							  </div> -->
					<div class="col">
						<a href="/dashboard/characters"
							><img class="userlogo" src="/img/userlogo/characters.webp" alt="logo" /></a
						>
					</div>

					<div class="col">
						<form action="/api/signout" method="post">
							<button class="signout"
								><img class="userlogo" src="/img/userlogo/logout.png" alt="logo" /></button
							>
						</form>
					</div>
				</div>
			</div>
			<div class="col-6" />
		</div>
	</div>
</main>

<style>
	#char_card_container {
		margin: 0px 0px 0px 40px;
		border-radius: 10px;
		position: relative;
		padding: 10px;
	}
	.weapon {
		margin: 5px 0px 0px 10px;
		padding: 0;
		width: 50%;
	}
	.weapon2 {
		margin: 8px 0px 0px 0px;
		padding: 0;
		width: 60%;
	}
	.weapon3 {
		margin: 8px 0px 0px 0px;
		padding: 0;
		width: 65%;
	}
	.img_filter {
		margin: 36px 0px 0px -60px;
	}
	.img_filter_weapon {
		margin: 36px 0px 0px 0px;
	}
	button {
		border: none;
		background: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
	.reset {
		background: #5aa7e7;
		width: 120%;
		border-radius: 10px;
		height: 100%;
	}
	.reset img {
		padding: 8px;
		filter: blur(0.6px);
	}
	.user {
		border-radius: 7px;
		min-height: 10vh;
		position: fixed;
		bottom: 0;
		left: 45px;
		width: 600px;
		margin-bottom: 5px;
		z-index: top;
	}
	.username {
		background-color: rgba(245, 245, 220, 0.733);
		border-radius: 5px;
		margin: 5px;
	}
	.profile {
		align-items: center;
		text-align: center;
	}
	.userlogo {
		width: 50%;
	}
</style>
