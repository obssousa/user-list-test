<template>
  <div class="content">
  <fieldset  class="inputFilter">
    <label for="filter">Filtrar</label>
    <input id="filter" v-model="filter" />
  </fieldset >
    <ul class="userList">
      <li class="item" v-for="user in filteredUsers" :key="user.id.value">
        <img :src="user.picture.thumbnail" />
        {{ getUserFullName(user) }}
      </li>
    </ul>
    <div class="buttonContainer">
      <button class="button" @click="fetchUser">Add User</button>
      <button class="button" @click="removeUser">Remove User</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  data: () => {
    return {
      filter: ''
    }
  },
  computed: {
    ...mapGetters([
      'getUsers'
    ]),
    filteredUsers () {
      return this.getUsers.filter(user => {
        const firstName = user.name.first.toLowerCase()
        const lastName = user.name.last.toLowerCase()
        const localFilter = this.filter.toLowerCase()
        const results = firstName.includes(localFilter) || lastName.includes(localFilter)
        return results
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchUser'
    ]),
    getUserFullName (user) {
      return user.name.first + ' ' + user.name.last
    },
    removeUser () {
      this.$store.commit('REMOVE_USER')
    }
  }
}
</script>

<style lang="scss" scoped>

$secondaryColor: #424242;
$primaryColor: #6a1b9a;
$primaryLightColor: #9c4dcc;
$textColor: #ffffff;
$space: 8px;
$xspace: 16px;
$maxContent: 300px;
$componentStyle: $secondaryColor 0px 2px 5px -1px, $secondaryColor 0px 1px 3px -1px;

.content {
  display:flex;
  flex-direction: column;
  align-items: center;
  gap: $xspace;

  > .inputFilter {
    width: $maxContent;
    border: none;
    outline: none;
    position: relative;
    margin: 0 0 20px 0;
    padding: 0;
    box-sizing: border-box;

    > label {
      margin-right: $space;
    }

    > input {
      height: 32px;
      box-shadow: $componentStyle;
      border: 1px;
      border: none;
      outline: none;
      padding: 5px 5px 8px 0px;
      width: 100%;
      font-size: 18px;
      border-bottom: solid 1px #efefef;
    }
  }

  > .userList {
    background-color: $primaryLightColor;
    list-style-type: none;
    padding: 0;
    width: $maxContent;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    > .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 12px;
      border-bottom: 1px $secondaryColor;
    }
  }

  > .buttonContainer {
    > .button {
      margin: $space;
      border: none;
      border-radius: 5px;
      color: $textColor;
      background-color: $primaryColor;
      box-shadow: $componentStyle;
      width: 130px;
      height: 24px;

      &:hover {
        background-color: $primaryLightColor;
      }
    }
  }
}
</style>
