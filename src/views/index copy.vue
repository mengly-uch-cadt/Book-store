<template>
    <div class="calendar-wrapper">
        <!-- Top bar -->
        <div class="toolbar">
            <v-btn color="primary" @click="openCreateDialog()">New event</v-btn>
            <v-spacer />
            <v-btn size="small" variant="text" @click="setView('day')">Day</v-btn>
            <v-btn size="small" variant="text" @click="setView('week')">Week</v-btn>
            <v-btn size="small" variant="text" @click="setView('monthGrid')">Month</v-btn>
        </div>

        <!-- The calendar -->
        <ScheduleXCalendar :calendar-app="calendarApp">
            <!-- Custom render for time-grid events: click to edit -->
            <template #timeGridEvent="{ calendarEvent }">
                <div class="sx-event-custom" @click.stop="openEditDialog(calendarEvent)">
                    <span class="title">{{ calendarEvent.title }}</span>
                    <span class="assignees"
                        v-if="Array.isArray(calendarEvent.assignees) && calendarEvent.assignees.length">
                        · {{ renderAssignees(calendarEvent.assignees) }}
                    </span>
                </div>
            </template>
            <!-- Month grid event template -->
            <template #monthGridEvent="{ calendarEvent }">
                <div class="sx-event-custom" @click.stop="openEditDialog(calendarEvent)">
                    <span class="title">{{ calendarEvent.title }}</span>
                </div>
            </template>
        </ScheduleXCalendar>

        <!-- Create / Edit dialog -->
        <v-dialog v-model="dialog.open" max-width="640">
            <v-card>
                <v-card-title class="text-h6">{{ dialog.mode === 'create' ? 'Create event' : 'Edit event'
                    }}</v-card-title>
                <v-card-text>
                    <v-form ref="formRef" v-model="formValid">
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field label="Title" v-model="form.title"
                                    :rules="[v => !!v || 'Title is required']" required />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field label="Place" v-model="form.location" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="form.assignees" :items="userChoices" label="Assign to" multiple chips
                                    closable-chips />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field label="Start" type="datetime-local" v-model="form.startLocal"
                                    :rules="[validateStart]" required />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field label="End" type="datetime-local" v-model="form.endLocal"
                                    :rules="[validateEnd]" required />
                            </v-col>
                            <v-col cols="12" md="9">
                                <v-textarea label="Notes" v-model="form.description" rows="2" auto-grow />
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-select label="Color" v-model="form.color" :items="[
                                    { title: 'Blue', value: 'blue' },
                                    { title: 'Green', value: 'green' },
                                    { title: 'Amber', value: 'amber' },
                                    { title: 'Purple', value: 'purple' },
                                    { title: 'Red', value: 'red' },
                                    { title: 'Gray', value: 'gray' },
                                ]" chips />
                            </v-col>

                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-if="dialog.mode === 'edit'" color="error" variant="tonal"
                        @click="removeEvent()">Delete</v-btn>
                    <v-spacer />
                    <v-btn variant="text" @click="closeDialog()">Cancel</v-btn>
                    <v-btn color="primary" @click="saveEvent()">{{ dialog.mode === 'create' ? 'Create' : 'Save'
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
    createCalendar,
    createViewDay,
    createViewWeek,
    createViewMonthGrid,
    createViewMonthAgenda,
    type CalendarEvent,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'

// =========================
// Config you can tweak
// =========================
const TIMEZONE = 'Asia/Phnom_Penh'
const WORK_START = '06:00'
const WORK_END = '19:00'

// Example users for multi-assign
const users = [
    { id: 'u1', name: 'Alice' },
    { id: 'u2', name: 'Bob' },
    { id: 'u3', name: 'Charlie' },
]
const userChoices = users.map(u => ({ title: u.name, value: u.id }))

// =========================
// Plugins
// =========================
const eventsService = createEventsServicePlugin()
const dnd = createDragAndDropPlugin() // move between slots / days
const resize = createResizePlugin()    // drag bottom to change duration
const scroll = createScrollControllerPlugin({ initialScroll: WORK_START })
const controls = createCalendarControlsPlugin()

// Optional: adjust drag/resize granularity (minutes)
try { (dnd as any).setInterval?.(15) } catch { }
try { (resize as any).setInterval?.(15) } catch { }

// =========================
// Sample data
// =========================
const today = Temporal.Now.plainDateISO(TIMEZONE)
const base: CalendarEvent[] = [
    {
        id: '1',
        title: 'Team standup',
        start: Temporal.ZonedDateTime.from(`${today.toString()}T09:00:00+07:00[${TIMEZONE}]`),
        end: Temporal.ZonedDateTime.from(`${today.toString()}T09:30:00+07:00[${TIMEZONE}]`),
        location: 'Huddle',
        assignees: ['u1', 'u2'],
    },
]

// =========================
// App init
// =========================
const calendarApp = createCalendar({
    selectedDate: today,
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: base,
    plugins: [eventsService, dnd, resize, scroll, controls],
    // Interactive callbacks
    callbacks: {
        // Click empty slot in day/week -> start create flow, 60 min default
        onClickDateTime(dateTime /** Temporal.ZonedDateTime */) {
            openCreateDialog(dateTime, dateTime.add({ minutes: 60 }))
        },
        // Click date in month grid -> create 09:00–10:00
        onClickDate(date /** Temporal.PlainDate */) {
            openCreateDialog(
                Temporal.ZonedDateTime.from(`${date.toString()}T09:00:00+07:00[${TIMEZONE}]`),
                Temporal.ZonedDateTime.from(`${date.toString()}T10:00:00+07:00[${TIMEZONE}]`)
            )
        },
        // Click event -> open edit dialog
        onEventClick(calendarEvent) {
            openEditDialog(calendarEvent)
        },
        // Drag/drop or resize -> keep service in sync (and persist to API if you want)
        onEventUpdate(updatedEvent) {
            eventsService.update(updatedEvent)
            // TODO: await api.updateEvent(updatedEvent)
        },
    },
})

// Expose a few helpers for the toolbar
function setView(name: 'day' | 'week' | 'monthGrid') {
    (controls as any).setView?.(name)
}

// =========================
// Dialog + form state
// =========================
const dialog = ref<{ open: boolean; mode: 'create' | 'edit'; targetId?: string | number }>({ open: false, mode: 'create' })
const formRef = ref()
const formValid = ref(true)
const form = ref({
    title: '',
    location: '',
    assignees: [] as string[],
    description: '',
    color: 'blue',
    startLocal: '', // HTML datetime-local string
    endLocal: '',
})

function zdtToLocalInput(zdt: Temporal.ZonedDateTime) {
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${zdt.year}-${pad(zdt.month)}-${pad(zdt.day)}T${pad(zdt.hour)}:${pad(zdt.minute)}`
}
function localInputToZdt(v: string): Temporal.ZonedDateTime {
    // treat input as in TIMEZONE
    const [d, t] = v.split('T')
    return Temporal.ZonedDateTime.from(`${d}T${t}:00+07:00[${TIMEZONE}]`)
}

function openCreateDialog(start?: Temporal.ZonedDateTime, end?: Temporal.ZonedDateTime) {
    dialog.value = { open: true, mode: 'create' }
    const s = start ?? Temporal.Now.zonedDateTimeISO(TIMEZONE)
    const e = end ?? s.add({ minutes: 60 })
    form.value = {
        title: '', location: '', assignees: [], description: '', color: 'blue',
        startLocal: zdtToLocalInput(s), endLocal: zdtToLocalInput(e)
    }
}

function openEditDialog(evt: CalendarEvent) {
    dialog.value = { open: true, mode: 'edit', targetId: evt.id }
    const colorClass = ((evt as any)._options?.additionalClasses || []).find((c: string) => c.startsWith('tag-'))
    const color = colorClass ? colorClass.replace('tag-', '') : 'blue'
    form.value = {
        title: (evt.title as string) || '',
        location: (evt as any).location || '',
        assignees: Array.isArray((evt as any).assignees) ? (evt as any).assignees : [],
        description: (evt as any).description || '',
        color,
        startLocal: zdtToLocalInput(evt.start as Temporal.ZonedDateTime),
        endLocal: zdtToLocalInput(evt.end as Temporal.ZonedDateTime),
    }
}
// Removed erroneous block referencing undefined 'evt'

function closeDialog() { dialog.value.open = false }

function validateStart(v: string) { return !!v || 'Start required' }
function validateEnd(v: string) {
    if (!v) return 'End required'
    try {
        const s = localInputToZdt(form.value.startLocal)
        const e = localInputToZdt(v)
        return e.epochMilliseconds > s.epochMilliseconds || 'End must be after start'
    } catch { return 'Invalid date' }
}

async function saveEvent() {
    const ok = await formRef.value?.validate()
    if (!ok) return
    const payload: CalendarEvent = {
        id: dialog.value.mode === 'create' ? crypto.randomUUID() : (dialog.value.targetId as string),
        title: form.value.title,
        start: localInputToZdt(form.value.startLocal),
        end: localInputToZdt(form.value.endLocal),
        location: form.value.location,
        assignees: form.value.assignees,
        description: form.value.description,
        _options: { additionalClasses: [`tag-${form.value.color}`] },
    }
    if (dialog.value.mode === 'create') {
        eventsService.add(payload)
    } else {
        eventsService.update(payload)
    }
    closeDialog()
}

function removeEvent() {
    if (dialog.value.mode !== 'edit' || !dialog.value.targetId) return
    eventsService.remove(dialog.value.targetId)
    closeDialog()
}

function renderAssignees(ids: string[]) {
    return ids.map(id => users.find(u => u.id === id)?.name || id).join(', ')
}
</script>

<style scoped>
.calendar-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* calendar needs a height from its container */
:deep(.sx-vue-calendar-wrapper) {
    height: 78vh;
}

/* color tags */
:deep(.sx__event.tag-blue) {
    background: #3b82f6;
    color: white;
}

:deep(.sx__event.tag-green) {
    background: #10b981;
    color: white;
}

:deep(.sx__event.tag-amber) {
    background: #f59e0b;
    color: black;
}

:deep(.sx__event.tag-purple) {
    background: #8b5cf6;
    color: white;
}

:deep(.sx__event.tag-red) {
    background: #ef4444;
    color: white;
}

:deep(.sx__event.tag-gray) {
    background: #6b7280;
    color: white;
}

.sx-event-custom {
    width: 100%;
    height: 100%;
    padding: 2px 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 6px;
    cursor: pointer;
}

.sx-event-custom .title {
    font-weight: 600;
}

.sx-event-custom .assignees {
    opacity: 0.85;
    font-size: 0.85em;
}
</style>
