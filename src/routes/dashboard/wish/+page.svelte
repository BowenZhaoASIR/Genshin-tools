<script>
	import Menu from '../Menu.svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	//--------------------chart render function---------------------
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let defaultColors = [
	"#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#990099", "#0077b6", "#0099C6",
	"#fb5607", "#3a5a40", "#f5cac3", "#118ab2", "#06d6a0", "#a7c957", "#8ac926",
	"#1982c4", "#ff595e", "#6a4c93", "#329262", "#b9aaee", "#9bf6ff"
];
	function createChart() {
		const ctx = document.getElementById('Event');
		var chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels:	data.totalpull_name,
				datasets: [
					{
						label: "total item ",
						data: data.totalpull_count,
						backgroundColor: defaultColors,
						borderWidth: 1,
						hoverOffset: 0
					},
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
				}
			},
		});
	}
	onMount(createChart);
	function createChart2() {
		const ctx = document.getElementById('myChart2');

		var chart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['Event banner', 'Weapon banner', 'Permanent banner'],
				datasets: [
					{
						label: 'Total',
						data: [data.totalEventPull.name, data.totalWeaponPull.name, data.totalPermanentPull.name],
						backgroundColor: ['#FFD3A3', '#FCFFB2', '#B6EAFA'],
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
</script>

<img class="sideimg" src="/img/side background.jpg" alt="" />
<Menu />
<img class="bgimage" src="/img/sucrose_aside.png" alt="" />
<main class="container">
	<div class="grid">
		<article class="card">
			<div class="banner_name">
				<div class="banner_title">
					<h6><b>Event banner</b></h6>
				</div>
				<div class="col">
					<a href="/dashboard/wish/event">
						<img class="wish_menu" src="/img/userlogo/menu.svg" alt="logo" />
					</a>
				</div>
			</div>

			<div class="total_pull">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>Total Pulls</b></p>
					</div>
					<div class="count_primo">
						<div>
							<img class="primogem" src="/img/userlogo/primogem.png" alt="logo" />
						</div>
						<div style="padding-top:1px;">
							<p class="subtext">{data.totalEventPull.name * 160}</p>
						</div>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4><b>{data.totalEventPull.name}</b></h4>
					</div>
				</div>
			</div>

			<div class="total_pull" data-tooltip="Shows your current 5★ pity: {data.getLastPity_E['5starPity_E']} pulls to guaranted 5★" data-placement="TOP">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>5★ Pity</b></p>
					</div>
					<div class="count_primo">
						<p class="subtext">Guaranteed at 90</p>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4 class="color_5star"><b>{90 - data.getLastPity_E['5starPity_E']}</b></h4>
					</div>
				</div>
			</div>

			<div class="total_pull" data-tooltip="Shows your current 4★ pity: {data.getLastPity_E['4starPity_E']} pulls to guaranted 4★" data-placement="TOP">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>4★ Pity</b></p>
					</div>
					<div class="count_primo">
						<p class="subtext">Guaranteed at 10</p>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4 class="color_4star"><b>{10 - data.getLastPity_E['4starPity_E']}</b></h4>
					</div>
				</div>
			</div>
		</article>
		<article class="card">
			<div class="banner_name">
				<div class="banner_title">
					<h6><b>Weapon banner</b></h6>
				</div>
				<div class="col">
					<a href="/dashboard/wish/weapon">
						<img class="wish_menu" src="/img/userlogo/menu.svg" alt="logo" />
					</a>
				</div>
			</div>

			<div class="total_pull">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>Total Pulls</b></p>
					</div>
					<div class="count_primo">
						<div>
							<img class="primogem" src="/img/userlogo/primogem.png" alt="logo" />
						</div>
						<div style="padding-top:1px;">
							<p class="subtext">{data.totalWeaponPull.name * 160}</p>
						</div>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4><b>{data.totalWeaponPull.name}</b></h4>
					</div>
				</div>
			</div>

			<div class="total_pull" data-tooltip="Shows your current 5★ pity: {data.getLastPity_W['5starPity_W']} pulls to guaranted 5★" data-placement="TOP">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>5★ Pity</b></p>
					</div>
					<div class="count_primo">
						<p class="subtext">Guaranteed at 80</p>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4 class="color_5star"><b>{80 - data.getLastPity_W['5starPity_W']}</b></h4>
					</div>
				</div>
			</div>

			<div class="total_pull" data-tooltip="Shows your current 4★ pity: {data.getLastPity_W['4starPity_W']} pulls to guaranted 4★" data-placement="TOP">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>4★ Pity</b></p>
					</div>
					<div class="count_primo">
						<p class="subtext">Guaranteed at 10</p>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4 class="color_4star"><b>{10 - data.getLastPity_W['4starPity_W']}</b></h4>
					</div>
				</div>
			</div>
		</article>
		<article class="card">
			<div class="banner_name">
				<div class="banner_title">
					<h6><b>Permanent banner</b></h6>
				</div>
				<div class="col" />
				<a href="/dashboard/wish/permanent">
					<img class="wish_menu" src="/img/userlogo/menu.svg" alt="logo" />
				</a>
			</div>

			<div class="total_pull">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>Total Pulls</b></p>
					</div>
					<div class="count_primo">
						<div>
							<img class="primogem" src="/img/userlogo/primogem.png" alt="logo" />
						</div>
						<div style="padding-top:1px;">
							<p class="subtext">{data.totalPermanentPull.name * 160}</p>
						</div>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4><b>{data.totalPermanentPull.name}</b></h4>
					</div>
				</div>
			</div>

			<div class="total_pull" data-tooltip="Shows your current 5★ pity: {data.getLastPity_P['5starPity_P']} pulls to guaranted 5★" data-placement="TOP">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>5★ Pity</b></p>
					</div>
					<div class="count_primo">
						<p class="subtext">Guaranteed at 90</p>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4 class="color_5star"><b>{90 - data.getLastPity_P['5starPity_P']}</b></h4>
					</div>
				</div>
			</div>

			<div class="total_pull" data-tooltip="Shows your current 4★ pity: {data.getLastPity_P['4starPity_P']} pulls to guaranted 4★" data-placement="TOP">
				<div class="count_box_title">
					<div class="count_title">
						<p><b>4★ Pity</b></p>
					</div>
					<div class="count_primo">
						<p class="subtext">Guaranteed at 10</p>
					</div>
				</div>
				<div class="count_box_data">
					<div class="count_data">
						<h4 class="color_4star"><b>{10 - data.getLastPity_P['4starPity_P']}</b></h4>
					</div>
				</div>
			</div>
		</article>
	</div>
	<!-- {#if chart } -->
	<div class="flexbox_chart"> 
			<div class="chart">
				<canvas id="Event" />
			</div>
			<div class="chart2">
				<canvas id="myChart2" />
			</div>
	</div>
	<!-- {/if} -->
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
						<a href="/dashboard/wish">
							<img class="userlogo" src="/img/userlogo/wish.webp" alt="logo" />
						</a>
					</div>
					<!-- <div class="col">
              <a href="/profile/artifacts"><img class="userlogo" src="/img/userlogo/artifact.webp" alt="logo"></a>
              </div> -->
					<div class="col">
						<a href="/dashboard/characters">
							<img class="userlogo" src="/img/userlogo/characters.webp" alt="logo" />
						</a>
					</div>

					<div class="col">
						<form action="/api/signout" method="post">
							<button class="signout">
								<img class="userlogo" src="/img/userlogo/logout.png" alt="logo" />
							</button>
						</form>
					</div>
				</div>
			</div>
			<div class="col-6" />
		</div>
	</div>
</main>

<style>
	.card {
		max-width: 40vw;
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
	button {
		border: none;
		background: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
	.banner_name {
		margin-top: -10px;
		display: flex;
		flex-direction: row;
	}
	.total_pull {
		border-radius: 5px;
		margin-top: 10px;
		background-color: rgb(153, 153, 153);
		width: 100%;
		height: 11vh;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.wish_menu {
		float: right;
		width: 2vw;
	}
	.count_box_title {
		width: 50%;
		padding: 10px 10px 0px 10px;
	}
	.count_box_data {
		width: 40%;
	}
	.count_data {
		text-align: right;
	}
	.count_title {
		padding-left: 3px;
		height: 45%;
	}
	.count_primo {
		display: flex;
		flex-direction: row;
	}
	.primogem {
		max-width: 19px;
	}
	.color_5star {
		color: #ffb13f;
	}
	.color_4star {
		color: #d28fd6;
	}
	.subtext {
		color: rgba(0, 0, 0, 0.692);
	}
	.chart {
		padding: 5px  10px 0px 0px;
		border-radius: 5px;
		background-color: rgba(240, 255, 255, 0.5);
		width: 60%;
		height: auto;
	}
	.chart2 {
		margin-left: 120px;
		padding: 5px;
		border-radius: 5px;
		background-color: rgba(240, 255, 255, 0.5);
		width: 30%;
		height: auto;
	}
	.flexbox_chart{
		width: 100%;
		margin: 20px 0px 0px 100px;
		display: flex;
		flex-direction: row;
	}
</style>
