<script setup lang="ts">
import { Button, InputText, InputPassword } from 'wangsvue';
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-[#BDA552]">
    <div
      class="flex flex-col justify-center items-center h-[591px] w-[468px] px-[24px] py-[32px] bg-white rounded-2xl"
    >
      <h1 class="text-md font-extralight mb-[20px]">Login</h1>
      <div class="flex flex-col w-full gap-3">
        <div>
          <InputText
            id="alias-name-input-text"
            :max-length="30"
            :validator-message="{
              exceed: 'Max length is 30 characters',
            }"
            label="Email"
            mandatory
            placeholder="Enter your email"
            use-validator
          />
        </div>
        <div>
          <InputPassword
            label="Password"
            mandatory
            placeholder="Enter your password"
          />
        </div>
      </div>
      <Button
        id="btn-login-form"
        class="w-full my-[32px]"
        label="Login"
        severity="secondary"
        size="large"
      />
    </div>
  </div>
</template>
