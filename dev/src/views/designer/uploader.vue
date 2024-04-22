<template>
  <div>
    <form
      action="/vtj/local/repository/uploader.json"
      enctype="multipart/form-data"
      method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="files" multiple="true" /></div>
      <input type="submit" value="Upload" />
    </form>
  </div>
</template>
<script lang="ts" setup></script>
