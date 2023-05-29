<script>
    import Menu from '../Menu.svelte';
</script>
<img class="sideimg" src="/img/side background.jpg" alt="">
<Menu/>
<img class="bgimage" src="/img/sucrose_aside.png" alt="">
<main class="container">
  <form action="/action_page.php" method="post"> 
    <div class="login">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>
  
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>
          
      <button type="submit">Log in</button>
      <div class="grid signup_rememberme" >
      <label class="">
        <input type="checkbox" name="remember" checked >Remember me
      </label>
      <div></div>
      <div></div>
      <div></div>
      <a class="signup_link" href="/signup">Create account</a>
    </div>
    </div>
  </form>
</main>
<style>
  form {
    position: fixed;
  }

  input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  button {
    background-color: #04AA6D;
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
    background-color:#DBE2EF;
  }
  .signup_link{
    padding: 6px;
    text-align: center;
    border-radius: 10px;
  }
  .signup_link:hover{
    background-color: #b6bcc7;
  }
  .signup_rememberme{
    padding-top: 20px;
  }
  </style>