<!-- src/layouts/DefaultLayout.vue -->
<template>
    <v-app>
        <!-- App Bar -->
        <v-app-bar app dark>
            <v-app-bar-nav-icon class="mr-2" @click="drawer = !drawer" />
            <v-app-bar-title>My App</v-app-bar-title>
            <v-spacer />
            <v-btn variant="text" :to="{ name: 'home' }">Home</v-btn>
        </v-app-bar>

        <!-- Navigation Drawer -->
        <v-navigation-drawer app v-model="drawer" :rail="rail" expand-on-hover>
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                    subtitle="sandra_a88@gmail.com" title="Sandra Adams" />
            </v-list>

            <v-divider />

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-folder-account-outline" title="My Files" value="myfiles" />
                <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" />
                <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
            </v-list>

            <template #append>
                <v-divider />
                <v-btn block variant="text" @click="rail = !rail">
                    Toggle Rail
                </v-btn>
            </template>
        </v-navigation-drawer>

        <!-- Main content -->
        <v-main>
            <v-container class="py-6">
                <RouterView />
            </v-container>
        </v-main>

        <!-- Footer -->
        <v-footer app>
            <v-container class="text-center">
                © {{ new Date().getFullYear() }} My App
            </v-container>
        </v-footer>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true) // open by default on desktop
const rail = ref(true)   // compact rail style; expands on hover
</script>