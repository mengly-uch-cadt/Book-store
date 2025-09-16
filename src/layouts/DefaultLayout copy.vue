<template>
    <v-app>
        <v-app-bar app>
            <v-app-bar-title>My App</v-app-bar-title>
            <v-spacer />
            <v-btn variant="text" :to="{ name: 'index' }">Home</v-btn>
        </v-app-bar>

        <v-main>
            <v-container class="py-6">
                <!-- child pages render here -->
                <RouterView />
            </v-container>
        </v-main>

        <v-footer app>
            <v-container class="text-center">
                © {{ new Date().getFullYear() }} My App
            </v-container>
        </v-footer>
    </v-app>
</template>

<script setup>
// no script needed yet
</script>
