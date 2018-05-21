<template>
  <div id="app" class="container">
    <h1 align="center" class="title is-1" >Cleq Colleague</h1>
    <div>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter a name" v-model="name">
        </div>
      </div>

      <div class="field">
        <label class="label">Profile Picture</label>
        <div class="control">
          <img :src="imageUrl" height="150">
          <input class="input" type="file" ref="fileInput" @change="onFilePicked">
        </div>
      </div>



      <a class="button is-primary" @click="submitName()">Add</a>
    </div>
    <div>
      <ul>
        <li v-for="personName of colleague" v-bind:key="personName['.key']">
          <div v-if="!personName.edit">
            <p>{{ personName.name }} </p>
            <button class="button is-danger" @click="removePerson(personName['.key'])">Delete</button>
            <button class="button is-info" @click="editPerson(personName['.key'])">Edit</button>
          </div>
          <div v-else>
            <input type="text" v-model="personName.name">
            <a class="button is-success" @click="saveEdit(personName)">Save</a>
            <a class="button is-warning" @click="cancelEdit(personName['.key'])">Cancel</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>

import { namesRef } from './firebase'

export default {
  name: 'app',
  data () {
    return {
      // name: 'Paul'
      image:null
    }  
  },
  methods:{
    submitName(){
      namesRef.push({name : this.name 
                    ,edit : false});
      this.name = '';
    },
    removePerson(key){
      namesRef.child(key).remove();
    },
    editPerson(key){
      namesRef.child(key).update({ 
        edit: true,
      })
    },
    saveEdit(person){
      const key = person['.key'];
      namesRef.child(key).set({
        name: person.name,
        edit: false
      });
    },
    cancelEdit(key){
      namesRef.child(key).update({
        edit: false
      });
    },
    onFilePicked(event){
      const files = event.target.files
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('Load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  },
  firebase:{
    colleague : namesRef
  }
}
</script>



<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3d85ce;
  margin-top: 60px;
}

h1 {
  font-weight: normal;
}

div{
  margin: 20px;
}


</style>
