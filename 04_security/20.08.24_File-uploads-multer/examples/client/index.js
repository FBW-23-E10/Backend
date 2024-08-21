const form=document.querySelector('form')
const email=document.querySelector('#email')
const password=document.querySelector('#password')
const avatar=document.querySelector('#avatar')


const submitHandler=async(e)=>{
  e.preventDefault()

  const {email,password,avatar}=e.target

  console.log('email:',email.value)
  console.log('password:',password.value)
  console.log('avatar:',avatar.value)
  console.log('avatar:',avatar.files)



  const formData=new FormData()
  formData.append('data',JSON.stringify({email:email.value,password:password.value}))
  formData.append('avatar',avatar.files[0])

  console.log(formData.getAll('avatar'))

  const res=await fetch('http://localhost:8000/upload',{
  method:'POST',
  body:formData

  })
  console.log(res)
  const data=await res.json()
  console.log(data)

}



form.addEventListener('submit',submitHandler)