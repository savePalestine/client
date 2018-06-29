<template>
  <div class="body-background">
    <div class="container">
      <div class="register" style="background-color:transparent">
        <div class="container" style="padding-left:5%;">
          <div class="row">
            <div class="col s10" style="margin:4.4%; background-color:rgba(0, 0, 0, 0.5);">
              <form class="col s12">
                <h4 style="text-align:center; color:white" > <u><b>Getting Started</b></u> </h4>
                <div class="row">
                  <div class="input-field col s12" style="padding-right:15px;">
                    <input v-model='playername' id="fullname" type="text" class="validate" style="color:white;">
                    <label for="fullname" style="color:white;">Full Name</label>
                  </div>
                </div>
                <a @click="inputPlayerName" class="btn btn-block">Start Game !</a>
                <br>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      playername: ''
    }
  },
  methods: {
    inputPlayerName () {
      this.$store.dispatch('checkLobby', this.playername)
      this.$router.push('/play')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ffffff;
}

.body-background{
  text-align: left;
  background-image: url('http://epicwallpaperz.com/wallpaper-hd/ww2-tank-wallpaper-phone-On-wallpaper-hd.jpg');
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
}
.modal {
  overflow: hidden;
  width: 35%;
  height: 600px;
  margin-top: 0px;
  padding: 0 0 0 0;
}

h5
{
	font-weight: 400;
}

.container{
	margin: 0 0 0 0;
	width: 455px;
	height: 100%;
}

.tabs .indicator
{
	background-color: #1e2121;
	opacity: 0.3;
}

.form-container
{
	padding: 40px;
	padding-top: 10px;
}

.confirmation-tabs-btn
{
	position: absolute;
}
element.style {
    z-index: 1003;
    display: block;
    opacity: 1;
    top: 1%;
}
</style>
