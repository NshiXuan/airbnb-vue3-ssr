import { getCurrentInstance, reactive, ref } from 'vue'

interface IRuleForm {
  mobile: string,
  password: string
}

export default function useFormProperties(t: any) {
  const activeName = ref('login')
  const loginText = ref(t('login.loginBtn'))
  const ruleFormRef = ref()

  const ruleForm: IRuleForm = reactive({
    mobile: '',
    password: ''
  })
  const rules = reactive({
    mobile: [{
      required: true,
      min: 11,
      max: 11,
      message: t('login.placeMobile')
    }],
    password: [{
      required: true,
      message: t('login.placePass')
    }]
  })

  return {
    activeName,
    loginText,
    ruleFormRef,
    ruleForm,
    rules
  }
}