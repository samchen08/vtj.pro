<template>
  <div>crypto</div>
</template>
<script lang="ts" setup>
  import { MD5, RSA, unRSA } from '@vtj/web';

  const t1 = MD5('111');
  console.log(t1);

  const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoIzmn1FYQ1YOhOBw9EhABxZ+PySAIa
ydI+zdhoKflrdgJ4A5E4/5gbQmRpk09hPWG8nvX7h+l/QLU8kXxAIBECAwEAAQ==`;

  const privateKey = `MIIBOgIBAAJBAKoIzmn1FYQ1YOhOBw9EhABxZ+PySAIaydI+zdhoKflrdgJ4A5E4
/5gbQmRpk09hPWG8nvX7h+l/QLU8kXxAIBECAwEAAQJAAlgpxQY6sByLsXqzJcth
C8LSGsLf2JEJkHwlnpwFqlEV8UCkoINpuZ2Wzl+aftURu5rIfAzRCQBvHmeOTW9/
zQIhAO5ufWDmnSLyfAAsNo5JRNpVuLFCFodR8Xm+ulDlosR/AiEAtpAltyP9wmCA
BKG/v/hrtTr3mcvFNGCjoGa9bUAok28CIHbrVs9w1ijrBlvTsXYwJw46uP539uKR
RT4ymZzlm9QjAiB+1KH/G9f9pEEL9rtaSOG7JF5D0JcOjlze4MGVFs+ZrQIhALKO
UFBNr2zEsyJIjw2PlvEucdlG77UniszjXTROHSPd`;

  const test = `{"id":"ba1972f8-059a-4317-9f09-32b9c3a1a9a2","createdAt":"2024-10-23T03:17:25.435Z","updatedAt":"2024-10-23T07:39:00.000Z","createdBy":"","updatedBy":"","username":"samchen08","avatar":"https://foruda.gitee.com/avatar/1676965419459339672/1386281_samchen08_1578950307.png","email":"samchen08@163.com","phone":"","oauthType":"gitte","oauthId":"1386281","freeze":false,"roles":[{"id":"544b2ba0-ec3c-4cd7-a488-0b75e4e6e78f","createdAt":"2024-10-16T01:22:31.826Z","updatedAt":"2024-10-19T05:33:04.000Z","createdBy":"","updatedBy":"","name":"Normal","label":"普通用 户","isDefault":true}],"token":"c6f5317c-860d-4d54-b0dd-f43ea5cbcb9e","permissions":{"j0qnbrs9j6":true,"BASE":true,"12wrqh4ejpb":true},"apis":{"GET,/api/logs":true,"GET,/api/caches":true,"GET,/api/oauth/logout":true}}`;

  console.log(test);
  const size = 40;
  const length = Math.ceil(test.length / size);
  const codes = [];
  for (let i = 0; i < length; i++) {
    const text = test.substring(i * size, (i + 1) * size);
    codes.push(RSA(text, publicKey));
  }

  console.log(codes);

  // const code = RSA(test, publicKey);
  // console.log(code);

  const result = [];
  for (let code of codes) {
    result.push(unRSA(code.toString(), privateKey));
  }

  console.log(result.join(''));
</script>
