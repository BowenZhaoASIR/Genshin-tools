<script>
	import Menu from '../Menu.svelte';
</script>

<img class="sideimg" src="/img/side background.jpg" alt="" />
<Menu />
<img class="bgimage" src="/img/sucrose_aside.png" alt="" />
<main class="container">
	<form method="post">
		<div class="login">
			<label for="uname"><b>Username</b></label>
			<input type="text" placeholder="Enter Username" name="username" id="username" required />

			<label for="psw"><b>Password</b></label>
			<input type="password" placeholder="Enter Password" name="password" id="password" required />

			<button type="submit">Log in</button>
			<div class="grid signup_rememberme">
				<div />
				<div />
				<div />
				<a class="signup_link" href="/signup">Create account</a>
			</div>
		</div>
	</form>
	<div class="container user">
		<div class="row profile">
			<div class="col-6 container profile">
				<div class="row">
					<div class="col username">
						<a href="/login">Login</a>
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
	form {
		position: fixed;
	}

	input[type='text'],
	input[type='password'] {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		box-sizing: border-box;
	}

	button {
		background-color: #04aa6d;
		color: white;
		padding: 14px 20px;
		margin: 8px 0;
		border: none;
		cursor: pointer;
		width: 100%;
	}

	button:hover {
		opacity: 0.8;
	}
	.login {
		width: 100%;
		padding: 60px;
		margin: 160px 0px 0px 240px;
		align-content: center;
		background-color: #dbe2ef;
	}
	.signup_link {
		padding: 6px;
		text-align: center;
		border-radius: 10px;
	}
	.signup_link:hover {
		background-color: #b6bcc7;
	}
	.signup_rememberme {
		padding-top: 20px;
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
