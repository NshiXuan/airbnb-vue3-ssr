<template>
  <div class="login">
    <div class="left-part"></div>

    <div class="right-part">
      <div class="login-panel">
        <!-- tabs -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <!-- 表单 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon size="large">
          <el-form-item prop="mobile">
            <el-input :placeholder="t('login.placeMobile')" v-model="ruleForm.mobile" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input :placeholder="t('login.placePass')" v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm">{{ loginText }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import useFormProperties from '@/composables/login/useFormProperties'
import useFormOperaties from '@/composables/login/useFormOperaties'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const { ruleForm, loginText, ruleFormRef, activeName } = useFormProperties(t)
const { userSign, userLogin } = useFormOperaties(router, ruleForm)

function handleClick(e: any) {
  const { name } = e.props
  loginText.value = t(`login['${name}Btn']`)
}

function submitForm() {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      if (activeName.value === 'sign') {
        userSign(ruleForm)
      } else if (activeName.value === 'login') {
        userLogin(ruleForm)
      }
    } else {
      return false
    }
  })
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/login/index.scss";
</style>
