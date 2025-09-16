<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
    name: 'CalendarWithEventDialogAndFilter',
    components: { FullCalendar },
    data() {
        return {
            dialog: false,
            selectedEvent: null,

            // filter: which users to show (empty = show all)
            selectedUserIds: [],

            // master list of events (more users & events added)
            allEvents: [
                // Engineering
                {
                    id: 'e1', title: 'Product Sync', start: '2025-09-16T09:30:00', end: '2025-09-16T10:15:00',
                    extendedProps: { userId: 'u_ava', name: 'Ava Rahman', unit: 'Product', position: 'Product Manager', profileUrl: 'https://i.pravatar.cc/100?img=32' }
                },
                {
                    id: 'e2', title: 'Design Review', start: '2025-09-17T13:00:00', end: '2025-09-17T14:00:00',
                    extendedProps: { userId: 'u_kenji', name: 'Kenji Ito', unit: 'Design', position: 'Lead Designer', profileUrl: 'https://i.pravatar.cc/100?img=12' }
                },
                {
                    id: 'e3', title: 'Sprint Planning', start: '2025-09-18T10:00:00', end: '2025-09-18T11:30:00',
                    extendedProps: { userId: 'u_maya', name: 'Maya Chen', unit: 'Engineering', position: 'Scrum Master', profileUrl: 'https://i.pravatar.cc/100?img=48' }
                },
                {
                    id: 'e4', title: 'QA Triage', start: '2025-09-18T15:00:00', end: '2025-09-18T15:45:00',
                    extendedProps: { userId: 'u_raj', name: 'Raj Patel', unit: 'Quality', position: 'QA Engineer', profileUrl: 'https://i.pravatar.cc/100?img=67' }
                },
                {
                    id: 'e5', title: 'Architecture Deep Dive', start: '2025-09-20T14:00:00', end: '2025-09-20T15:30:00',
                    extendedProps: { userId: 'u_maya', name: 'Maya Chen', unit: 'Engineering', position: 'Scrum Master', profileUrl: 'https://i.pravatar.cc/100?img=48' }
                },

                // Biz/Marketing
                {
                    id: 'e6', title: 'Partner Call', start: '2025-09-19T11:00:00', end: '2025-09-19T11:45:00',
                    extendedProps: { userId: 'u_lina', name: 'Lina Gómez', unit: 'Business Dev', position: 'Partnerships Lead', profileUrl: 'https://i.pravatar.cc/100?img=5' }
                },
                {
                    id: 'e7', title: 'Q4 Campaign Brief', start: '2025-09-21T10:00:00', end: '2025-09-21T11:00:00',
                    extendedProps: { userId: 'u_sam', name: 'Samir Khan', unit: 'Marketing', position: 'Growth Marketer', profileUrl: 'https://i.pravatar.cc/100?img=15' }
                },
                {
                    id: 'e8', title: 'PR Sync', start: '2025-09-22T16:00:00', end: '2025-09-22T16:30:00',
                    extendedProps: { userId: 'u_kate', name: 'Kate Nguyen', unit: 'Marketing', position: 'Comms Manager', profileUrl: 'https://i.pravatar.cc/100?img=36' }
                },

                // Ops/HR/Finance
                {
                    id: 'e9', title: 'Hiring Panel', start: '2025-09-23T09:00:00', end: '2025-09-23T10:30:00',
                    extendedProps: { userId: 'u_omar', name: 'Omar Ali', unit: 'People', position: 'Recruiter', profileUrl: 'https://i.pravatar.cc/100?img=23' }
                },
                {
                    id: 'e10', title: 'Payroll Review', start: '2025-09-24T14:30:00', end: '2025-09-24T15:15:00',
                    extendedProps: { userId: 'u_ella', name: 'Ella Rossi', unit: 'Finance', position: 'Accountant', profileUrl: 'https://i.pravatar.cc/100?img=30' }
                },
                {
                    id: 'e11', title: 'Vendor Negotiation', start: '2025-09-25T13:30:00', end: '2025-09-25T14:30:00',
                    extendedProps: { userId: 'u_diego', name: 'Diego Martínez', unit: 'Operations', position: 'Ops Manager', profileUrl: 'https://i.pravatar.cc/100?img=8' }
                },

                // CS/Support
                {
                    id: 'e12', title: 'VIP Customer Check-in', start: '2025-09-26T10:00:00', end: '2025-09-26T10:30:00',
                    extendedProps: { userId: 'u_sara', name: 'Sara Lee', unit: 'Customer Success', position: 'CSM', profileUrl: 'https://i.pravatar.cc/100?img=41' }
                },
                {
                    id: 'e13', title: 'NPS Review', start: '2025-09-27T15:00:00', end: '2025-09-27T15:45:00',
                    extendedProps: { userId: 'u_james', name: 'James Park', unit: 'Support', position: 'Support Lead', profileUrl: 'https://i.pravatar.cc/100?img=54' }
                },

                // Leadership
                {
                    id: 'e14', title: 'Weekly Leadership Standup', start: '2025-09-22T09:30:00', end: '2025-09-22T10:00:00',
                    extendedProps: { userId: 'u_cece', name: 'Cecilia Wang', unit: 'Leadership', position: 'COO', profileUrl: 'https://i.pravatar.cc/100?img=3' }
                },
                {
                    id: 'e15', title: 'Board Prep', start: '2025-09-28T13:00:00', end: '2025-09-28T15:00:00',
                    extendedProps: { userId: 'u_arthur', name: 'Arthur Brown', unit: 'Leadership', position: 'CFO', profileUrl: 'https://i.pravatar.cc/100?img=45' }
                }
            ],

            // base calendar options
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                weekends: true,
                height: 'auto',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridDay,dayGridWeek,dayGridMonth'
                },
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,        // 12h format
                    meridiem: 'short',   // "AM"/"PM"
                    omitZeroMinute: false
                },
                displayEventEnd: false, // or true if you want "10:00 AM - 11:30 AM"

                eventClick: (info) => this.handleEventClick(info)
            }
        }
    },

    computed: {
        // dynamic user list for filter
        userOptions() {
            const map = new Map()
            for (const e of this.allEvents) {
                const p = e.extendedProps || {}
                if (!map.has(p.userId)) {
                    map.set(p.userId, {
                        value: p.userId,
                        title: p.name,
                        subtitle: [p.position, p.unit].filter(Boolean).join(' • '),
                        profileUrl: p.profileUrl
                    })
                }
            }
            return [...map.values()].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
        },

        // filter events by selected users (empty => all)
        filteredEvents() {
            if (!this.selectedUserIds.length) return this.allEvents
            const set = new Set(this.selectedUserIds)
            return this.allEvents.filter(e => set.has(e.extendedProps?.userId))
        },

        // ✅ merge filtered events back into options so FullCalendar renders them
        mergedOptions() {
            return {
                ...this.calendarOptions,
                events: this.filteredEvents
            }
        }
    },

    methods: {
        handleEventClick(info) {
            const e = info.event
            this.selectedEvent = {
                title: e.title,
                start: e.start,
                hour12: true,        // 12h format
                meridiem: 'short',     // with AM/PM
                end: e.end,
                name: e.extendedProps?.name,
                unit: e.extendedProps?.unit,
                position: e.extendedProps?.position,
                profileUrl: e.extendedProps?.profileUrl
            }
            this.dialog = true
        },
        formatDateTime(d) {
            if (!d) return '—'
            return new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true   // ✅ 12h with AM/PM
            }).format(d)
        }

    }
}
</script>

<template>
    <div class="pa-3 d-flex flex-column ga-3">
        <!-- FILTER BAR -->
        <div class="d-flex align-center ga-3">
            <v-select v-model="selectedUserIds" :items="userOptions" item-title="title" item-value="value"
                label="Filter by user" multiple chips closable-chips clearable hide-details="auto" class="flex-1-1">
                <template #chip="{ props, item }">
                    <v-chip v-bind="props" class="d-flex align-center ga-2">
                        <v-avatar size="20" v-if="item?.raw?.profileUrl">
                            <v-img :src="item.raw.profileUrl" alt="avatar" />
                        </v-avatar>
                        <span>{{ item.raw.title }}</span>
                    </v-chip>
                </template>
                <template #item="{ props, item }">
                    <v-list-item v-bind="props" :title="item.raw.title" :subtitle="item.raw.subtitle">
                        <template #prepend>
                            <v-avatar size="28" v-if="item.raw.profileUrl">
                                <v-img :src="item.raw.profileUrl" alt="avatar" />
                            </v-avatar>
                        </template>
                    </v-list-item>
                </template>
            </v-select>

            <v-btn variant="text" @click="selectedUserIds = []">Show All</v-btn>
        </div>

        <!-- CALENDAR -->
        <!-- Use mergedOptions so events are inside options -->
        <FullCalendar :options="mergedOptions" />

        <!-- EVENT DETAIL DIALOG -->
        <v-dialog v-model="dialog" max-width="520">
            <v-card v-if="selectedEvent">
                <v-card-title class="d-flex align-center ga-3">
                    <v-avatar size="44" v-if="selectedEvent.profileUrl">
                        <v-img :src="selectedEvent.profileUrl" alt="Profile" />
                    </v-avatar>
                    <div class="d-flex flex-column">
                        <span class="text-h6">{{ selectedEvent.name || 'Unknown User' }}</span>
                        <span class="text-body-2 text-medium-emphasis">
                            {{ selectedEvent.position || '—' }}<span v-if="selectedEvent.unit"> • {{ selectedEvent.unit
                                }}</span>
                        </span>
                    </div>
                </v-card-title>

                <v-divider />

                <v-card-text class="d-flex flex-column ga-3">
                    <div class="d-flex align-center justify-space-between">
                        <span class="text-subtitle-1 font-weight-medium">Event</span>
                        <span class="text-body-1">{{ selectedEvent.title }}</span>
                    </div>

                    <div class="d-flex align-center justify-space-between">
                        <span class="text-subtitle-1 font-weight-medium">Start</span>
                        <span class="text-body-1">{{ formatDateTime(selectedEvent.start) }}</span>
                    </div>

                    <div class="d-flex align-center justify-space-between">
                        <span class="text-subtitle-1 font-weight-medium">End</span>
                        <span class="text-body-1">{{ formatDateTime(selectedEvent.end) }}</span>
                    </div>
                </v-card-text>

                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.pa-3 {
    padding: 16px;
}
</style>
