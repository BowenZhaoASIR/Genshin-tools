<script>
	import Menu from './../../Menu.svelte';
    	/** @type {import('./$types').PageData} */
	export let data;
	import MenuLoged from './../../dashboard/Menu.svelte'; 
</script>
<img class="sideimg" src="/img/side background.jpg" alt="">
{#if data.user}
<MenuLoged/>
{:else}
<Menu/>
{/if}
<main class="container">
    <iframe title="chasm" style="position:fixed; top:-80px; left:380px; bottom:0px; right:0; width:84.5%; height:121%; border:none; 
    margin:0; padding:0; overflow:hidden; z-index:999999;" src="https://genshin-impact-map.appsample.com/location?mid=9"
    frameBorder="0"></iframe>
    <div class="container user">
		<div class="row profile">
			<div class="col-6 container profile">
				<div class="row">
					<div class="col username">
						{#if !data.user}
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
                    {#if data.user}
					<div class="col">
						<form action="/api/signout" method="post">
							<button class="signout"><img class="userlogo" src="/img/userlogo/logout.png" alt="logo" /></button>
						</form>	
					</div>
                    {/if}
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
    button{
		border: none;
		background: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
</style>
