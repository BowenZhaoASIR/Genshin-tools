  <script>
// @ts-nocheck
	/** @type {import('./$types').PageData} */
	  export let data;
    import { onMount } from 'svelte';
    const {name} = data;
    import Menu from '../../Menu.svelte';
    import MenuLoged from './../../dashboard/Menu.svelte'; 
    import genshindb from 'genshin-db';
    let materials = genshindb.materials("names", {"matchCategories":true});
    const all_mat = new Array()
    materials.forEach(name =>{
      all_mat.push(genshindb.materials(name));
    });
    const mat_1 = all_mat.filter(mat => mat.name === name.costs.ascend6[0].name).map(mat => mat.images.fandom);
    const mat_2 = all_mat.filter(mat => mat.name === name.costs.ascend6[1].name).map(mat => mat.images.fandom);
    const mat_3 = all_mat.filter(mat => mat.name === name.costs.ascend6[2].name).map(mat => mat.images.fandom);
    const mat_4 = all_mat.filter(mat => mat.name === name.costs.ascend6[3].name).map(mat => mat.images.fandom);
    const mat_5 = all_mat.filter(mat => mat.name === name.costs.ascend6[4].name).map(mat => mat.images.fandom);
  </script>
<img class="sideimg" src="/img/side background.jpg" alt="">
{#if data.user}
<MenuLoged/>
{:else}
<Menu/>
{/if}

<main class="container">
  <img class="char_side_image" src="{name.images.cover2}" alt="">
  <div class="char_detail">
    <button class="back"><a href="/characters" class="back_text">back</a></button>
  <h2>{name.name} <img  src="/img/element/{name.element}.webp" alt=""></h2>
  <div class="info_bg">
  <p> {name.title}</p>
  <p>descirption: {name.description}</p>
  <p>rank: {name.rarity}</p>
  <p>weapon type: {name.weapontype} <img style="width:60px;" src="/img/weapon/{name.weapontype}.webp" alt=""></p>
  <p>constellation name: {name.constellation}</p>
  </div>
  <h5>Ascension Materials:</h5>
  <table>
    <tr>
      <td>Ascend</td>
      <td>Level</td>
      <td>Ascension Materials</td>
    </tr>
    <tr>
      <td>0</td>
      <td>1 - 20</td>
      <td>
      </td>
    </tr>
    <tr>
      <td>1</td>
      <td>20 - 40</td>
      <td><img class="mat_img" src="{mat_1}" alt="">{name.costs.ascend1[0].name}: {name.costs.ascend1[0].count} <img class="mat_img" src="{mat_2}" alt="">{name.costs.ascend1[1].name}: {name.costs.ascend1[1].count} 
      <img class="mat_img" src="{mat_3}" alt="">{name.costs.ascend1[2].name}: {name.costs.ascend1[2].count} <img class="mat_img" src="{mat_4}" alt="">{name.costs.ascend1[3].name}: {name.costs.ascend1[3].count}
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>40 - 50</td>
      <td><img class="mat_img" src="{mat_1}" alt="">{name.costs.ascend2[0].name}: {name.costs.ascend2[0].count} <img class="mat_img" src="{mat_2}" alt="">{name.costs.ascend2[1].name}: {name.costs.ascend2[1].count} 
        <img class="mat_img" src="{mat_3}" alt="">{name.costs.ascend2[2].name}: {name.costs.ascend2[2].count} <img class="mat_img" src="{mat_4}" alt="">{name.costs.ascend2[3].name}: {name.costs.ascend2[3].count} 
        <img class="mat_img" src="{mat_5}" alt="">{name.costs.ascend2[4].name}: {name.costs.ascend2[4].count}
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>50 - 60</td>
      <td><img class="mat_img" src="{mat_1}" alt="">{name.costs.ascend3[0].name}: {name.costs.ascend3[0].count} <img class="mat_img" src="{mat_2}" alt="">{name.costs.ascend3[1].name}: {name.costs.ascend3[1].count} 
        <img class="mat_img" src="{mat_3}" alt="">{name.costs.ascend3[2].name}: {name.costs.ascend3[2].count} <img class="mat_img" src="{mat_4}" alt="">{name.costs.ascend3[3].name}: {name.costs.ascend3[3].count} 
        <img class="mat_img" src="{mat_5}" alt="">{name.costs.ascend3[4].name}: {name.costs.ascend3[4].count}
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>60 - 70</td>
      <td><img class="mat_img" src="{mat_1}" alt="">{name.costs.ascend4[0].name}: {name.costs.ascend4[0].count} <img class="mat_img" src="{mat_2}" alt="">{name.costs.ascend4[1].name}: {name.costs.ascend4[1].count} 
        <img class="mat_img" src="{mat_3}" alt="">{name.costs.ascend4[2].name}: {name.costs.ascend4[2].count} <img class="mat_img" src="{mat_4}" alt="">{name.costs.ascend4[3].name}: {name.costs.ascend4[3].count} 
        <img class="mat_img" src="{mat_5}" alt="">{name.costs.ascend4[4].name}: {name.costs.ascend4[4].count}
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>70 - 80</td>
      <td><img class="mat_img" src="{mat_1}" alt="">{name.costs.ascend5[0].name}: {name.costs.ascend5[0].count} <img class="mat_img" src="{mat_2}" alt="">{name.costs.ascend5[1].name}: {name.costs.ascend5[1].count} 
        <img class="mat_img" src="{mat_3}" alt="">{name.costs.ascend5[2].name}: {name.costs.ascend5[2].count} <img class="mat_img" src="{mat_4}" alt="">{name.costs.ascend5[3].name}: {name.costs.ascend5[3].count} 
        <img class="mat_img" src="{mat_5}" alt="">{name.costs.ascend5[4].name}: {name.costs.ascend5[4].count}
      </td>
    </tr>
    <tr>
      <td>6</td>
      <td>80 - 90</td>
      <td><img class="mat_img" src="{mat_1}" alt="">{name.costs.ascend6[0].name}: {name.costs.ascend6[0].count} <img class="mat_img" src="{mat_2}" alt="">{name.costs.ascend6[1].name}: {name.costs.ascend6[1].count} 
        <img class="mat_img" src="{mat_3}" alt="">{name.costs.ascend6[2].name}: {name.costs.ascend6[2].count} <img class="mat_img" src="{mat_4}" alt="">{name.costs.ascend6[3].name}: {name.costs.ascend6[3].count} 
        <img class="mat_img" src="{mat_5}" alt="">{name.costs.ascend6[4].name}: {name.costs.ascend6[4].count}
      </td>
    </tr>
  </table>
</div>
<div class="container user">
  <div class="row profile">
    <div class="col-6 container profile">
      <div class="row">
        <div class="col username">
          {#if !data.user}
          <a href="/login">Login</a>
          {:else}
          <a href="/dashboard">{data.user.username}</a>
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
td{
    list-style: none;
  }
  .char_detail{
    padding: 40px 20px 20px 60px;
    margin: 0px 0px 0px 100px;
  }
  .char_side_image{
    position: fixed;
    margin: 100px 0px 0px 1020px;
    width: 30vw;
    opacity: 0.8;
  }
  .mat_img{
    width: 5%;
  }
  table{
    background-color: rgba(255, 255, 255, 0.726);
    position:relative; 
    border-radius: 30px;
  }
  .back{
    border-color: #306fbd;
    background-color: #2f6ebb;
    width: 9%;
    padding: 5px 0px 5px 0px;
    margin: 10px 0px 10px 0px;
    border-radius: 10px;
  }
  .back .back_text{
    color: white;
  }
  .info_bg{
    background-color: rgba(255, 255, 255, 0.726);
    padding: 20px;
    margin: 10px 0px 10px 0px;
    border-radius: 30px;
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
    button{
    border: none;
    background: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
}
</style>