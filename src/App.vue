<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/grid">grid</router-link>
        </div>
        <router-view/>
    </div>
</template>
    
<style lang="scss">
html,
body,
#app {
    height: 100%;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    height: 5%;
    display: flex;
    align-items:center;
    a {
        font-weight: bold;
        color: #2c3e50;
        // height: 100%;
        // display: inline-block;
        // line-height: 2.5;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
