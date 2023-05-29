<script>
	import Menu from '../Menu.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	let del_user;

	async function fetchData() {
		try {
			const response = await fetch('/api/drop_user');
			del_user = await response.json();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<img class="sideimg" src="/img/side background.jpg" alt="" />
<Menu />
<img class="bgimage" src="/img/sucrose_aside.png" alt="" />
<main class="container">
	<div class="grid">
		<form action="/api/drop_user" method="post">
			<div class="login">
				<p>
					<b
						>Are you sure you want to de delete your account, this action will delete everything
						assosiate to your account</b
					>
				</p>

				<button class="deluser" type="submit">delete account</button>
			</div>
		</form>
	</div>

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
	form {
		position: fixed;
	}
	.deluser {
		background-color: rgb(204, 21, 21);
		color: white;
		padding: 14px 20px;
		margin: 70px 0px 0px 0px;
		border: none;
		cursor: pointer;
		width: 100%;
	}

	button:hover {
		opacity: 0.8;
	}
	.login {
		width: 85%;
		padding: 60px;
		margin: 160px 0px 0px 240px;
		align-content: center;
		background-color: #dbe2ef;
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
</style>
