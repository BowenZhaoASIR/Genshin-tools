<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { get } from 'svelte/store';
	import Menu from '../../Menu.svelte';
	import { onMount } from 'svelte';
	import { element } from 'svelte/internal';
	import { status } from '$lib/store/wish_history.js';
	let wish_history = [];
	let get_key = '';
	let queryString;
	let loading = false;
	async function getlink(get_key) {
		// Extract the authkey from the provided URL
		const url_query = get_key.split('?')[1];
		const urlParams = new URLSearchParams(url_query);
		const authkey = urlParams.get('authkey');
		const urlauthkey = encodeURIComponent(authkey);
		return urlauthkey;
	}

	async function fetch_wish() {
		loading = true;
		const keydata = await getlink(get_key);
		if (keydata) {
			try {
				const apiKey = keydata;
				const response = await fetch('/api/wish', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(apiKey)
				});

				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error('error');
		}
		loading = false;
	}

	let powershell_link =
		'https://gist.githubusercontent.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235/raw/702e34117b07294e6959928963b76cfdafdd94f3/getlink.ps1';
	let powershellScript =
		` iex "&{$((New-Object System.Net.WebClient).DownloadString('` +
		powershell_link +
		`'))} global" `;
	let powershell =
		'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;';

	async function reset_wish() {
		wish_history = '';
		fetch_status = '';
	}
</script>

<img class="sideimg" src="/img/side background.jpg" alt="" />
<Menu />
<img class="bgimage" src="/img/sucrose_aside.png" alt="" />
<main class="container">
	<div class="importbox">
		<pre
			class="powershell_script bg-black text-white bg-opacity-50 whitespace-pre-wrap p-2 rounded-xl text-xs text-wrap">
            {powershell}{powershellScript}
        </pre>
		<form>
			<br />
			<input class="input" bind:value={get_key} placeholder="Paste your link here" required />
			<br />
			<!-- {get_key} -->
			<button type="submit" class="import_btn" id="btn" on:click={fetch_wish}>import wish</button>
		</form>
		{#if loading==true}
			<div class="error_box" aria-busy=true></div>
		{/if}
		<!-- {#if status == true}
        {/if} -->
		<!-- {#if error == '' }
        
        {fetch_status+" "}{banner_name}
        </div>
        <button class="reset" on:click={reset_wish}>delete all</button>
        {/if} -->
		<!-- 
        {#each wish_history as element}
            <div>{" "+element+" "}</div>
        {/each}
        {:else}
        <div class="error_box">
        <div hidden>{document.getElementById('btn').disabled = true}</div>
        {fetch_status+": "}{error}
        <div hidden>
        {setTimeout(function() {
        document.getElementById('btn').disabled = false
        wish_history = []
        error = ''
        fetch_status = ''
        }, 3500)}
        {setTimeout(() => {
        document.getElementById('btn').disabled = false
        }, 1000)}
        </div>
        </div>
        {/if} -->
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
							<button class="logout"
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

<!-- export const load = async () => {
    return  {
      wishdata ,
      loading  ,
      status ,
      fetch_status ,
      banner_name ,
      error ,
      wish_history
    }
  }
  let wish_history = []
  let wishdata = []
  let loading = false
  let status = false
  let fetch_status = ''
  let banner_name = ''
  let error = ''
  let get_wish_history = [];
  let wish_loop = [];
  async function wish(
      pointer = "wish_history",
      page_num = 1,
      gacha_type = 301 ,
      end_id = 0,
      previousResponse = []
  ) {
      fetch_status = 'Importing wish history'
      const url_proxy = 'https://corsproxy.io/?';
      const url_head = encodeURIComponent('https://hk4e-api-os.hoyoverse.com/event/gacha_info/api/getGachaLog?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&lang=en&authkey=');
      const url_authkey = encodeURIComponent('apikey')
      let url_end = encodeURIComponent('&gacha_type=' + gacha_type + '&page=' + page_num + '&size=5&end_id=' + end_id);
      let url_history = url_proxy + url_head + url_authkey + url_end;
      return fetch(url_history)
      .then(response => response.json())
      .then(newResponse => {
      if (newResponse && newResponse.data && newResponse.data.list){
          if (gacha_type === 301) {
              banner_name = ': character event banner'
              loading = true
          }
          const response = [...previousResponse, ...newResponse.data.list];
              if (newResponse.length !== 0) {
                  if (newResponse.data.list.length < 5) {
                      for (let index = 0; index < newResponse.data.list.length; index++) {
                          get_wish_history = get_wish_history.concat(newResponse.data.list[index]);
                      }
                      if (gacha_type === 301) {
                      page_num = 1;
                      end_id = 0;
                      gacha_type = 302;
                      banner_name = ': weapon event banner'
                      console.log('from 301 to 302');
                      return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                      }
                      else if (gacha_type===302) {
                      page_num = 1;
                      end_id = 0;
                      gacha_type = 200;
                      banner_name = ': permanent banner'
                      console.log('from 302 to 200');
                      return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                      }
                      else if (gacha_type===200) {
                      fetch_status = 'wish history imported successfully'
                      banner_name = ''
                      console.log('wish history imported successfully');
                      wish_history = get_wish_history
                      status = true;
                      loading = false
                      map()
                      return wish_history;
                      }
  
                  }
                  else{
                  wish_loop = newResponse.data.list;
                  get_wish_history = get_wish_history.concat(newResponse.data.list);
                  if (page_num === 1) {
                      page_num++;
                      end_id = wish_loop[wish_loop.length - 1].id; 
                      return wish(pointer = "wish_history", page_num, gacha_type, end_id, response);
                  }
                  else{
                      page_num++;
                      end_id = wish_loop[wish_loop.length - 1].id; 
                      return setTimeout(() => {
                          wish(pointer = "wish_history", page_num, gacha_type, end_id, response)
                      }, 50);
                  }
              }
                  }
                  } 
                  else 
                  {
              if(newResponse.message == "visit too frequently") {
                  error = 'Error: Visit too frequently, try again later'
                  fetch_status = 'Import terminated'
                  banner_name = ''
                  loading = false
                  return error
              }
              else if(newResponse.message == "authkey error"){
                  error = 'Error: Invalid link unable to retrieve wish history, please try again'
                  fetch_status = 'Import terminated'
                  banner_name = ''
                  loading = false
                  return error;
              }
          }
       });
      }
  
      function map() {
        wishdata = wish_history.map(element => {
            return {
                wish_id: element.id,
                name: element.name,
                gacha_type: element.gacha_type,
                item_type: element.item_type,
                rank_type: element.rank_type,
                time: element.time,
                uid: element.uid,
            }
            }); 
            console.log(wishdata)
        }

            async function save_data() {
              await prisma.wish_history.createMany({
                Data
              });  
            }
            console.log(Data) -->
<style>
	.importbox {
		margin: 0px 0px 0px 150px;
		padding: 40px;
		position: relative;
	}
	.powershell_script {
		margin: 0px;
	}
	.import_btn {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.error_box {
		margin-top: -25px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		padding: 5px;
		background-color: rgb(253, 255, 240);
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
	.logout {
		border: none;
		background: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
	.input {
		background-color: rgba(255, 255, 255, 0.842);
	}
</style>
