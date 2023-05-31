<script>
	import Menu from '../../Menu.svelte';
	import genshinDb from 'genshin-db';
	/** @type {import('./$types').PageData} */
	export let data;
	const options = {
		weekday: 'short',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'UTC'
	};
	let icon
	let star_5 = true;
	let star_4 = true;
	let star_3 = true;
	const item_icon = [];

	async function geticon(name = '', type = '') {
		if( type == "Character" ){
			const character = genshinDb.characters(name);
			const icon_character = character?.images.icon;
			return icon_character;
		}
		if (type == "Weapon") {
			const weapon = genshinDb.weapons(name);
			const icon_weapon = weapon?.images.icon;
			return icon_weapon;
		}
	}

	// data.charactersPulled.forEach((element) => {
	// 	if (element.item_type === 'Weapon') {
	// 		const icon_weapon = weapon(element.name);
	// 		const newItem = {
	// 			[element.name]: {
	// 				icon: icon_weapon
	// 			}
	// 		};
	// 		item_icon.push(newItem);
	// 	} else {
	// 		const icon_characters = character(element.name);
	// 		const newItem = {
	// 			[element.name]: {
	// 				icon: icon_characters
	// 			}
	// 		};
	// 		item_icon.push(newItem);
	// 	}
	// });

	//--------------------chart render function---------------------
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	if (data.totalEventPull.length !== 0) {
	
	function createChart() {
		const ctx = document.getElementById('myChart');

		var chart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['3 star', '4 star', '5 star'],
				datasets: [
					{
						label: 'Total pulls',
						data: [data.star_3, data.star_4, data.star_5],
						backgroundColor: ['rgb(54, 162, 235)', '#d28fd6', '#ffb13f'],
						borderWidth: 1,
						hoverOffset: 30
					}
				]
			},
			options: {
				layout: {
					padding: {
						bottom(ctx) {
							const chart = ctx.chart;
							let pb = 0;
							chart.data.datasets.forEach(function (el) {
								const hOffset = el.hoverOffset || 0;
								pb = Math.max(hOffset / 2 + 5, pb);
							});
							return pb;
						}
					}
				},
				plugins: {
						tooltip: {
							callbacks: {
								label: function(context){
								var label = context.label,
									currentValue = context.raw,
									total = context.chart._metasets[context.datasetIndex].total;

								var percentage = parseFloat((currentValue/total*100).toFixed(1));

								return label + ": " +currentValue + ' (' + percentage + '%)';
								}
							}
						}
					}
				}
			});
		}
	onMount(createChart);
	function createChart2() {
		const ctx = document.getElementById('myChart2');
		var chart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Weapon', 'Character'],
				datasets: [
					{
						label: 'Total pull',
						data: [data.totalweaponcount, data.totalcharactercount],
						backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
						borderWidth: 1,
						hoverOffset: 30
					}
				]
			},
			options: {
				layout: {
					padding: {
						bottom(ctx) {
							const chart = ctx.chart;
							let pb = 0;
							chart.data.datasets.forEach(function (el) {
								const hOffset = el.hoverOffset || 0;
								pb = Math.max(hOffset / 2 + 5, pb);
							});
							return pb;
						}
					}
				},
				plugins: {
						tooltip: {
							callbacks: {
								label: function(context){
								var label = context.label,
									currentValue = context.raw,
									total = context.chart._metasets[context.datasetIndex].total;

								var percentage = parseFloat((currentValue/total*100).toFixed(1));

								return label + ": " +currentValue + ' (' + percentage + '%)';
								}
							}
						}
					}
				}
			});
		}
	onMount(createChart2);
// 	let defaultColors = [
// 	"#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#990099", "#0077b6", "#0099C6",
// 	"#fb5607", "#3a5a40", "#f5cac3", "#118ab2", "#06d6a0", "#a7c957", "#8ac926",
// 	"#1982c4", "#ff595e", "#6a4c93", "#329262", "#b9aaee", "#9bf6ff"
// ];
// 			const charactername = [];
// 			data.charactersPulled.forEach(element => {
// 				charactername.push(element.name)
// 			});
// 				function createChart3() {
// 					const ctx = document.getElementById('Event');
// 					var chart = new Chart(ctx, {
// 						type: 'pie',
// 						data: {
// 							labels: charactername,
// 							datasets: [
// 								{
// 									label: 'Total pull',
// 									data: [data.totalweaponcount, data.totalcharactercount, data.totalcharactercount],
// 									backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
// 									borderWidth: 1,
// 									hoverOffset: 2
// 								}
// 							]
// 						},
// 						options: {
// 							layout: {
// 								padding: {
// 									bottom(ctx) {
// 										const chart = ctx.chart;
// 										let pb = 0;
// 										chart.data.datasets.forEach(function (el) {
// 											const hOffset = el.hoverOffset || 0;
// 											pb = Math.max(hOffset / 2 + 5, pb);
// 										});
// 										return pb;
// 									}
// 								}
// 							},
// 							plugins: {
// 								legend: {
// 								display: false 
// 							}
// 							}
// 						}
// 					});
// 				}
// 				onMount(createChart3);
}
</script>

<img class="sideimg" src="/img/side background.jpg" alt="" />
<Menu />
<img class="bgimage" src="/img/sucrose_aside.png" alt="" />
<main class="container">
	<div class="grid" />
	{#await data.totalEventPull}
		<div class="no_entry">
			<p>...... Loading</p>
		</div>
	{:then totalEventPull}
		{#if data.totalEventPull.length !== 0}
			<div class="flexbox">
				<div class="banner_history">
					<div class="header">
						<div class="backdiv">
							<button class="back"><a href="/dashboard/wish" class="back_text"><b>BACK</b></a></button>
						</div>
						<div class="banner_data">
							<p class="back"><b>Event Banner Total pulls: &nbsp;&nbsp;</b><b style="color:#B0DAFF;">{data.star_5+data.star_4+data.star_3}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</b><b style="color:#ffb23f;">5 ★: {data.star_5}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#9f67a2;">4 ★: {data.star_4}</b> 
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:#6DA9E4;">3 ★: {data.star_3}</b></p>
						</div>
						<div class="filter" >
							<div class="rank_filter" data-tooltip="5★">
								<input type="checkbox" id="star_5" name="switch" role="switch" bind:checked={star_5}>
							</div>
							<div class="rank_filter" data-tooltip="4★">
								<input type="checkbox" id="star_4" name="switch" role="switch" bind:checked={star_4}>
							</div>
							<div class="rank_filter" data-tooltip="3★">
								<input type="checkbox" id="star_3" name="switch" role="switch" bind:checked={star_3}>
							</div>
						</div>
					</div>
					<div class="wishHistoryTable">
						<table class="table">
							<thead>
								<tr>
									<th>Time</th>
									<th>Pity</th>
									<th>Name</th>
									<th>Type</th>
									<th>★</th>
								</tr>
							</thead>
							<tbody>
								{#each data.totalEventPull as { name, item_type, rank_type, time }, i}
								{#await geticon(name , item_type )}
								{#if rank_type === 5}
									<tr class="star5" hidden={!star_5}>
										<td>{time.toLocaleString('en-US', options)}</td>
										<td>{i + 1}</td>
										<td>{"Loading..."+name}</td>
										<td>{item_type}</td>
										<td>{rank_type}</td>
									</tr>
								{:else if rank_type === 4 }
									<tr class="star4" hidden={!star_4}>
										<td>{time.toLocaleString('en-US', options)}</td>
										<td>{i + 1}</td>
										<td>{"Loading..."+name}</td>
										<td>{item_type}</td>
										<td>{rank_type}</td>
									</tr>
								{:else}
									<tr hidden={!star_3}>
										<td>{time.toLocaleString('en-US', options)}</td>
										<td>{i + 1}</td>
										<td>{"Loading..."+name}</td>
										<td>{item_type}</td>
										<td>{rank_type}</td>
									</tr>
								{/if}
								{:then icon} 
								{#if rank_type === 5}
									<tr class="star5" hidden={!star_5}>
										<td>{time.toLocaleString('en-US', options)}</td>
										<td>{i + 1}</td>
										<td><img class="icon" src="{icon}" alt="{name}">{name}</td>
										<td>{item_type}</td>
										<td>{rank_type}</td>
									</tr>
								{:else if rank_type === 4 }
									<tr class="star4" hidden={!star_4}>
										<td>{time.toLocaleString('en-US', options)}</td>
										<td>{i + 1}</td>
										<td><img class="icon" src="{icon}" alt="{name}">{name}</td>
										<td>{item_type}</td>
										<td>{rank_type}</td>
									</tr>
								{:else}
									<tr hidden={!star_3}>
										<td>{time.toLocaleString('en-US', options)}</td>
										<td>{i + 1}</td>
										<td><img class="icon" src="{icon}" alt="{name}">{name}</td>
										<td>{item_type}</td>
										<td>{rank_type}</td>
									</tr>
								{/if}
								{/await}
								{/each}
							</tbody>
						</table>
					</div>
				</div>
				<div class="flexbox_chart"> 
					<div class="chart">
						<canvas id="myChart" />
					</div>
					<div class="chart">
						<canvas id="myChart2" />
					</div>
					<!-- <div class="chart3">
						<canvas id="Event" />
					</div> -->
				</div>
			</div>
		{:else}
			<div class="no_entry">
				<p>No pull history found can import it from <a href="/dashboard/wish/import">here</a></p>
			</div>
		{/if}
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
	button {
		border: none;
		background: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
	.banner_history {
		margin: 30px 80px 0px 120px;
		border-radius: 10px;
		min-height: 100vh;
		background-color: rgba(236, 236, 236, 0.733);
		display: flex;
		text-align: left;
		position: relative;
		background-color: #2f6ebc;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}
	.back {
		background-color: #7895B2;
		padding: 10px 30px 10px 30px;
		border-radius: 10px;
	}
	.back .back_text {
		color: #F5EFE6;
	}
	.table {
		min-width: 53vw;
	}
	.no_entry {
		margin: 90px 0px 0px 100px;
		border-radius: 10px;
		background-color: rgba(236, 236, 236, 0.733);
		display: flex;
		text-align: left;
		position: relative;
		background-color: #2f6ebc;
		padding: 20px;
	}
	.no_entry p {
		padding: 10px;
		border-radius: 5px;
		background-color: rgba(240, 248, 255, 0.63);
	}
	table.table {
		color: #ffffff;
	}
	table.table th,
	table.table td {
		color: #F5EFE6;
	}
	.header {
		display: flex;
		flex-direction: row;
	}
	.banner_data {
		width: 90%;
		padding-left: 10px;
	}
	.flexbox {
		display: flex;
		flex-direction: row;
	}
	.chart {
		margin-top: 50px;
		padding: 5px;
		border-radius: 5px;
		background-color: rgba(240, 255, 255, 0.5);
		width: 100%;
		height: auto;
	}
	.flexbox_chart{
		display: flex;
		flex-direction: column;
	}
	/* .chart3{
		margin-top: 20px;
		padding: 5px;
		border-radius: 5px;
		background-color: rgba(240, 255, 255, 0.863);
		width: 100%;
		height: auto;
	} */
	tr:nth-child(even) {
		background: rgb(255, 255, 255);
		background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.05) 0%,
		rgba(0, 0, 0, 0.43461134453781514) 41%,
		rgba(255, 255, 255, 0.05085784313725494) 99%
		);
	}
	tr.star5 {
		background: rgb(255,255,255);
		background: linear-gradient(90deg,
		rgba(255,255,255,0.05) 0%, 
		#ffb13fc8 50%,
		rgba(255,255,255,0.05085784313725494) 99%);
	}
	tr.star4 {
		background: rgb(255,255,255);
		background: linear-gradient(90deg,
		rgba(255,255,255,0.05) 0%,
		#9f67a2c5 50%,
		rgba(255,255,255,0.05085784313725494) 99%);
	}
	.filter{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-bottom: 20px;
	}
	.rank_filter{
		display: flex;
		align-items: center;
		border-radius: 10px;
		padding: 10px 5px 7px 13px;
		margin: 6px 5px 0px 5px;
		background-color:#F5EFE6;
	}
	#star_5:checked{
		background-color:#ffb13fc8;
		border-color:#ffb13fc8;
	}
	#star_4:checked{
		background-color:#9f67a2c5;
		border-color:#9f67a2c5;
	}
	#star_3:checked{
		background-color:#3282B8;
		border-color:#3282B8;
	}
	#star_5{
		background-color:#f5e4cc;
		border-color:#ffb23f;
	}
	#star_4{
		background-color:#f5e4cc;
		border-color:#9f67a2;
	}
	#star_3{
		background-color:#f5e4cc;
		border-color:#3282B8;
	}
	.icon{
		margin: 0px 10px 0px 0px;
		width: 35px;
	}
</style>