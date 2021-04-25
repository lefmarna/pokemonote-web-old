<template>
  <v-form name="contact" netlify>
    <input name="form-name" value="Netlify Rocks" type="hidden" />
    <v-container>
      <v-text-field label="名前" name="name"></v-text-field>
      <v-text-field label="Email" name="email"></v-text-field>
      <v-btn type="submit">Send</v-btn>
    </v-container>
  </v-form>
</template>
