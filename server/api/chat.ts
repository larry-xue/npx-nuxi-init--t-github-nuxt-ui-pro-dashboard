export default defineEventHandler(async (event) => {
  // fetch data
  const body = await readBody(event)
  console.log('body = ', body)
  return $fetch(process.env.CLOUDFLARE_WORKER_URL, {
    method: 'POST',
    body
  })
})
