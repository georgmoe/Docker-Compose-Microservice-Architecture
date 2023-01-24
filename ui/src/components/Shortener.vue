<script setup>
    import { ref } from "vue"
    const baseUrl = window.location
    // console.log(baseUrl)
    const url = ref("")
    const shortenedUrl = ref("")
    
    const shortenUrl = async () => {
        // console.log(url.value)
        const response = await fetch(`${baseUrl}shortener/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url: url.value})
        })
        const data = await response.json()
        // console.log(data)
        shortenedUrl.value = `${baseUrl}shortener${data.url}`
        // console.log(shortenedUrl.value)
    }

    const reset = () => {
        url.value = ""
        shortenedUrl.value = ""
    }
</script>

<template>
    <div v-if="shortenedUrl" class="input-group">
        <input v-model="shortenedUrl" class="form-control form-control-lg" disabled type="text" placeholder="Paste an URL to shorten it!">
        <button @click="reset" class="btn btn-success">&#x21BA; Reset!</button>
    </div>
    <div v-else class="input-group">
        <input v-model="url" class="form-control form-control-lg" type="text" placeholder="Paste an URL to shorten it!">
        <button @click="shortenUrl" class="btn btn-primary">Shorten it!</button>
    </div>
</template>