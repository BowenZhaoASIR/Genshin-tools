<script>
  	/** @type {import('./$types').PageData} */
	  export let data;
  import Menu from './Menu.svelte';
  import { onMount } from 'svelte';
  import genshindb from 'genshin-db';
  let name_filter = ''
  let filter = '';
  let characters
  let cards = ''
  const CURRENT_BANNER = ["Yoimya","Yae miko","Kirara","Yunjin","Chonyun"]
  char_name(CURRENT_BANNER)
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
  return cards
}
</script>

<img class="sideimg" src="/img/side background.jpg" alt="" />
<Menu />
<img class="bgimage" src="/img/sucrose_aside.png" alt="" />
<main class="container">
<div class="flexbox">
	<div class="fleximg">
		<div class="img">
			<img class="" src="https://upload-os-bbs.hoyolab.com/upload/2023/05/22/31c53e4baff0545a48b248f9f02eea72_8057426986167935930.jpg?x-oss-process=image/auto-orient,0/interlace,1/format,jpg" alt="" />
		</div>
		<div class="img">
			<img class="" src="https://upload-os-bbs.hoyolab.com/upload/2023/05/22/b18fdc32efc4313260032ec54d6463fc_3690443881388186557.jpg?x-oss-process=image/resize,s_1000/quality,q_80/auto-orient,0/interlace,1/format,jpg" alt="" />
		</div>
	</div>
	<div id="char_card_container">
		<div id="char_card_container">
			<h3><b>Current banner:</b></h3>
			{@html cards}
		</div>
	</div>
</div>
	<div class="container user">
		<div class="row profile">
			<div class="col-6 container profile">
				<div class="row">
					<div class="col username">
						{#if !data.user }
						<a href="/login">Login</a>
						{:else}
						<a href="/dashboard">{ data.user.username }</a>
						{/if}
					</div>
				</div>
				<div class="row">
					<div class="col">
						<a href="/dashboard/wish"><img class="userlogo" src="/img/userlogo/wish.webp" alt="logo" /></a>
					</div>
					<!-- <div class="col">
								<a href="/profile/artifacts"><img class="userlogo" src="/img/userlogo/artifact.webp" alt="logo"></a>
							  </div> -->
					<div class="col">
						<a href="/dashboard/characters"
							><img class="userlogo" src="/img/userlogo/characters.webp" alt="logo" /></a
						>
					</div>
				</div>
			</div>
			<div class="col-6" />
		</div>
	</div>
</main>
	<style>
		 #char_card_container{
			margin: 0px 0px 0px 80px;
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
		.flexbox{
			display: flex;
			flex-direction: column;
		}
		.fleximg{
			padding: 50px 0px 50px 120px;
			display: flex;
			flex-direction: row;
		}
		.img{
			padding: 10px;
		}
	</style>
	

