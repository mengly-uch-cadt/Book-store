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
                { "id": "e1", "title": "Mission to Siem Reap", "start": "2025-09-01T15:00:00", "end": "2025-09-01T15:45:00", "extendedProps": { "userId": "p_d", "name": "Person D", "unit": "Engineering", "position": "Frontend Engineer", "profileUrl": "https://i.pravatar.cc/100?img=14" } },
                { "id": "e2", "title": "Mission to Koh Kong", "start": "2025-09-01T09:00:00", "end": "2025-09-01T10:00:00", "extendedProps": { "userId": "p_a", "name": "Person A", "unit": "Product", "position": "Product Manager", "profileUrl": "https://i.pravatar.cc/100?img=11" } },
                { "id": "e3", "title": "Release Retro", "start": "2025-09-01T10:30:00", "end": "2025-09-01T11:15:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e4", "title": "Meeting at Raffles", "start": "2025-09-01T13:30:00", "end": "2025-09-01T14:30:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e5", "title": "Meeting at Sun & Moon", "start": "2025-09-02T15:00:00", "end": "2025-09-02T15:45:00", "extendedProps": { "userId": "p_p", "name": "Person P", "unit": "Business Dev", "position": "Partnerships Lead", "profileUrl": "https://i.pravatar.cc/100?img=26" } },
                { "id": "e6", "title": "Mision to Tokyo", "start": "2025-09-02T09:00:00", "end": "2025-09-02T10:00:00", "extendedProps": { "userId": "p_l", "name": "Person L", "unit": "Marketing", "position": "PR Lead", "profileUrl": "https://i.pravatar.cc/100?img=22" } },
                { "id": "e7", "title": "Meeting at Head Office", "start": "2025-09-02T10:30:00", "end": "2025-09-02T11:15:00", "extendedProps": { "userId": "p_e", "name": "Person E", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=15" } },
                { "id": "e8", "title": "Vendor Negotiation", "start": "2025-09-02T13:30:00", "end": "2025-09-02T14:30:00", "extendedProps": { "userId": "p_b", "name": "Person B", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=12" } },
                { "id": "e9", "title": "Meeting at Online", "start": "2025-09-03T15:00:00", "end": "2025-09-03T15:45:00", "extendedProps": { "userId": "p_h", "name": "Person H", "unit": "Marketing", "position": "Growth Marketer", "profileUrl": "https://i.pravatar.cc/100?img=18" } },
                { "id": "e10", "title": "Contract Review", "start": "2025-09-03T09:00:00", "end": "2025-09-03T10:00:00", "extendedProps": { "userId": "p_m", "name": "Person M", "unit": "Support", "position": "Support Lead", "profileUrl": "https://i.pravatar.cc/100?img=23" } },
                { "id": "e11", "title": "Meeting at Sun & Moon", "start": "2025-09-03T10:30:00", "end": "2025-09-03T11:15:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e12", "title": "Meeting at Online", "start": "2025-09-03T13:30:00", "end": "2025-09-03T14:30:00", "extendedProps": { "userId": "p_s", "name": "Person S", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=29" } },
                { "id": "e13", "title": "Meeting at Online", "start": "2025-09-04T15:00:00", "end": "2025-09-04T15:45:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e14", "title": "Mission to Hong Kong", "start": "2025-09-04T09:00:00", "end": "2025-09-04T10:00:00", "extendedProps": { "userId": "p_e", "name": "Person E", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=15" } },
                { "id": "e15", "title": "Meeting at Online", "start": "2025-09-04T10:30:00", "end": "2025-09-04T11:15:00", "extendedProps": { "userId": "p_a", "name": "Person A", "unit": "Product", "position": "Product Manager", "profileUrl": "https://i.pravatar.cc/100?img=11" } },
                { "id": "e16", "title": "Mission to Singapore", "start": "2025-09-04T13:30:00", "end": "2025-09-10T14:30:00", "extendedProps": { "userId": "p_r", "name": "Person R", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=28" } },
                { "id": "e17", "title": "Meeting at Hyatt", "start": "2025-09-05T15:00:00", "end": "2025-09-05T15:45:00", "extendedProps": { "userId": "p_o", "name": "Person O", "unit": "Customer Success", "position": "CSM", "profileUrl": "https://i.pravatar.cc/100?img=25" } },
                { "id": "e18", "title": "Meeting at Head Office", "start": "2025-09-05T09:00:00", "end": "2025-09-05T10:00:00", "extendedProps": { "userId": "p_f", "name": "Person F", "unit": "Engineering", "position": "DevOps Engineer", "profileUrl": "https://i.pravatar.cc/100?img=16" } },
                { "id": "e19", "title": "Meeting at Head Office", "start": "2025-09-05T10:30:00", "end": "2025-09-05T11:15:00", "extendedProps": { "userId": "p_n", "name": "Person N", "unit": "Leadership", "position": "CFO", "profileUrl": "https://i.pravatar.cc/100?img=24" } },
                { "id": "e20", "title": "Meeting at Online", "start": "2025-09-05T13:30:00", "end": "2025-09-05T14:30:00", "extendedProps": { "userId": "p_p", "name": "Person P", "unit": "Business Dev", "position": "Partnerships Lead", "profileUrl": "https://i.pravatar.cc/100?img=26" } },
                { "id": "e21", "title": "Meeting at Online", "start": "2025-09-06T15:00:00", "end": "2025-09-06T15:45:00", "extendedProps": { "userId": "p_r", "name": "Person R", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=28" } },
                { "id": "e22", "title": "Mission to Battambang", "start": "2025-09-06T09:00:00", "end": "2025-09-06T10:00:00", "extendedProps": { "userId": "p_g", "name": "Person G", "unit": "Data", "position": "Data Engineer", "profileUrl": "https://i.pravatar.cc/100?img=17" } },
                { "id": "e23", "title": "Meeting at Online", "start": "2025-09-06T10:30:00", "end": "2025-09-06T11:15:00", "extendedProps": { "userId": "p_f", "name": "Person F", "unit": "Engineering", "position": "DevOps Engineer", "profileUrl": "https://i.pravatar.cc/100?img=16" } },
                { "id": "e24", "title": "Meeting at Head Office", "start": "2025-09-06T13:30:00", "end": "2025-09-06T14:30:00", "extendedProps": { "userId": "p_h", "name": "Person H", "unit": "Marketing", "position": "Growth Marketer", "profileUrl": "https://i.pravatar.cc/100?img=18" } },
                { "id": "e25", "title": "Meeting at Sun & Moon", "start": "2025-09-07T15:00:00", "end": "2025-09-07T15:45:00", "extendedProps": { "userId": "p_o", "name": "Person O", "unit": "Customer Success", "position": "CSM", "profileUrl": "https://i.pravatar.cc/100?img=25" } },
                { "id": "e26", "title": "Meeting at Hyatt", "start": "2025-09-07T09:00:00", "end": "2025-09-07T10:00:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e27", "title": "Mission to Pursat", "start": "2025-09-07T10:30:00", "end": "2025-09-07T11:15:00", "extendedProps": { "userId": "p_s", "name": "Person S", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=29" } },
                { "id": "e28", "title": "Mission to Kampot", "start": "2025-09-07T13:30:00", "end": "2025-09-07T14:30:00", "extendedProps": { "userId": "p_k", "name": "Person K", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=21" } },
                { "id": "e29", "title": "Meeting at Sun & Moon", "start": "2025-09-08T15:00:00", "end": "2025-09-08T15:45:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e30", "title": "Mission to Prey Veng", "start": "2025-09-08T09:00:00", "end": "2025-09-08T10:00:00", "extendedProps": { "userId": "p_g", "name": "Person G", "unit": "Data", "position": "Data Engineer", "profileUrl": "https://i.pravatar.cc/100?img=17" } },
                { "id": "e31", "title": "Meeting at Raffles", "start": "2025-09-08T10:30:00", "end": "2025-09-08T11:15:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e32", "title": "Meeting at Raffles", "start": "2025-09-08T13:30:00", "end": "2025-09-08T14:30:00", "extendedProps": { "userId": "p_a", "name": "Person A", "unit": "Product", "position": "Product Manager", "profileUrl": "https://i.pravatar.cc/100?img=11" } },
                { "id": "e33", "title": "Meeting at Head Office", "start": "2025-09-09T15:00:00", "end": "2025-09-09T15:45:00", "extendedProps": { "userId": "p_g", "name": "Person G", "unit": "Data", "position": "Data Engineer", "profileUrl": "https://i.pravatar.cc/100?img=17" } },
                { "id": "e34", "title": "Mission to Siem Reap", "start": "2025-09-09T09:00:00", "end": "2025-09-09T10:00:00", "extendedProps": { "userId": "p_e", "name": "Person E", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=15" } },
                { "id": "e35", "title": "Meeting at Head Office", "start": "2025-09-09T10:30:00", "end": "2025-09-09T11:15:00", "extendedProps": { "userId": "p_a", "name": "Person A", "unit": "Product", "position": "Product Manager", "profileUrl": "https://i.pravatar.cc/100?img=11" } },
                { "id": "e36", "title": "Meeting at Sun & Moon", "start": "2025-09-09T13:30:00", "end": "2025-09-09T14:30:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e37", "title": "Meeting at Head Office", "start": "2025-09-10T15:00:00", "end": "2025-09-10T15:45:00", "extendedProps": { "userId": "p_p", "name": "Person P", "unit": "Business Dev", "position": "Partnerships Lead", "profileUrl": "https://i.pravatar.cc/100?img=26" } },
                { "id": "e38", "title": "Mission to Kampot", "start": "2025-09-10T09:00:00", "end": "2025-09-10T10:00:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e39", "title": "Meeting at Sun & Moon", "start": "2025-09-10T10:30:00", "end": "2025-09-10T11:15:00", "extendedProps": { "userId": "p_b", "name": "Person B", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=12" } },
                { "id": "e40", "title": "Meeting at Online", "start": "2025-09-10T13:30:00", "end": "2025-09-10T14:30:00", "extendedProps": { "userId": "p_e", "name": "Person E", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=15" } },
                { "id": "e41", "title": "Meeting at Raffles", "start": "2025-09-11T15:00:00", "end": "2025-09-13T15:45:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e42", "title": "Meeting at Hyatt", "start": "2025-09-11T09:00:00", "end": "2025-09-11T10:00:00", "extendedProps": { "userId": "p_f", "name": "Person F", "unit": "Engineering", "position": "DevOps Engineer", "profileUrl": "https://i.pravatar.cc/100?img=16" } },
                { "id": "e43", "title": "Meeting at Head Office", "start": "2025-09-11T10:30:00", "end": "2025-09-11T11:15:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e44", "title": "Meeting at Online", "start": "2025-09-11T13:30:00", "end": "2025-09-11T14:30:00", "extendedProps": { "userId": "p_o", "name": "Person O", "unit": "Customer Success", "position": "CSM", "profileUrl": "https://i.pravatar.cc/100?img=25" } },
                { "id": "e45", "title": "Meeting at Sofitel", "start": "2025-09-12T15:00:00", "end": "2025-09-12T15:45:00", "extendedProps": { "userId": "p_o", "name": "Person O", "unit": "Customer Success", "position": "CSM", "profileUrl": "https://i.pravatar.cc/100?img=25" } },
                { "id": "e46", "title": "Meeting at Online", "start": "2025-09-12T09:00:00", "end": "2025-09-12T10:00:00", "extendedProps": { "userId": "p_b", "name": "Person B", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=12" } },
                { "id": "e47", "title": "Meeting at Online", "start": "2025-09-12T10:30:00", "end": "2025-09-12T11:15:00", "extendedProps": { "userId": "p_s", "name": "Person S", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=29" } },
                { "id": "e48", "title": "Meeting at Online", "start": "2025-09-12T13:30:00", "end": "2025-09-12T14:30:00", "extendedProps": { "userId": "p_c", "name": "Person C", "unit": "Engineering", "position": "Backend Engineer", "profileUrl": "https://i.pravatar.cc/100?img=13" } },
                { "id": "e49", "title": "Meeting at Raffles", "start": "2025-09-13T15:00:00", "end": "2025-09-13T15:45:00", "extendedProps": { "userId": "p_n", "name": "Person N", "unit": "Leadership", "position": "CFO", "profileUrl": "https://i.pravatar.cc/100?img=24" } },
                { "id": "e50", "title": "Meeting at Online", "start": "2025-09-13T09:00:00", "end": "2025-09-13T10:00:00", "extendedProps": { "userId": "p_g", "name": "Person G", "unit": "Data", "position": "Data Engineer", "profileUrl": "https://i.pravatar.cc/100?img=17" } },
                { "id": "e51", "title": "Meeting at Head Office", "start": "2025-09-13T10:30:00", "end": "2025-09-13T11:15:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e52", "title": "Meeting at Raffles", "start": "2025-09-13T13:30:00", "end": "2025-09-13T14:30:00", "extendedProps": { "userId": "p_m", "name": "Person M", "unit": "Support", "position": "Support Lead", "profileUrl": "https://i.pravatar.cc/100?img=23" } },
                { "id": "e53", "title": "Meeting at Sun & Moon", "start": "2025-09-14T15:00:00", "end": "2025-09-19T15:45:00", "extendedProps": { "userId": "p_b", "name": "Person B", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=12" } },
                { "id": "e54", "title": "Meeting at Online", "start": "2025-09-14T09:00:00", "end": "2025-09-14T10:00:00", "extendedProps": { "userId": "p_a", "name": "Person A", "unit": "Product", "position": "Product Manager", "profileUrl": "https://i.pravatar.cc/100?img=11" } },
                { "id": "e55", "title": "Meeting at Raffles", "start": "2025-09-14T10:30:00", "end": "2025-09-14T11:15:00", "extendedProps": { "userId": "p_p", "name": "Person P", "unit": "Business Dev", "position": "Partnerships Lead", "profileUrl": "https://i.pravatar.cc/100?img=26" } },
                { "id": "e56", "title": "Meeting at Online", "start": "2025-09-14T13:30:00", "end": "2025-09-14T14:30:00", "extendedProps": { "userId": "p_k", "name": "Person K", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=21" } },
                { "id": "e57", "title": "Meeting at Online", "start": "2025-09-15T15:00:00", "end": "2025-09-15T15:45:00", "extendedProps": { "userId": "p_p", "name": "Person P", "unit": "Business Dev", "position": "Partnerships Lead", "profileUrl": "https://i.pravatar.cc/100?img=26" } },
                { "id": "e58", "title": "Meeting at Online", "start": "2025-09-15T09:00:00", "end": "2025-09-15T10:00:00", "extendedProps": { "userId": "p_k", "name": "Person K", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=21" } },
                { "id": "e59", "title": "Meeting at Online", "start": "2025-09-15T10:30:00", "end": "2025-09-15T11:15:00", "extendedProps": { "userId": "p_i", "name": "Person I", "unit": "Comms", "position": "Comms Manager", "profileUrl": "https://i.pravatar.cc/100?img=19" } },
                { "id": "e60", "title": "Meeting at Sun & Moon", "start": "2025-09-15T13:30:00", "end": "2025-09-15T14:30:00", "extendedProps": { "userId": "p_d", "name": "Person D", "unit": "Engineering", "position": "Frontend Engineer", "profileUrl": "https://i.pravatar.cc/100?img=14" } },
                { "id": "e61", "title": "Meeting at Head Office", "start": "2025-09-16T15:00:00", "end": "2025-09-16T15:45:00", "extendedProps": { "userId": "p_b", "name": "Person B", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=12" } },
                { "id": "e62", "title": "Meeting at Head Office", "start": "2025-09-16T09:00:00", "end": "2025-09-16T10:00:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e63", "title": "Meeting at Raffles", "start": "2025-09-16T10:30:00", "end": "2025-09-16T11:15:00", "extendedProps": { "userId": "p_o", "name": "Person O", "unit": "Customer Success", "position": "CSM", "profileUrl": "https://i.pravatar.cc/100?img=25" } },
                { "id": "e64", "title": "Meeting at Head Office", "start": "2025-09-16T13:30:00", "end": "2025-09-16T14:30:00", "extendedProps": { "userId": "p_m", "name": "Person M", "unit": "Support", "position": "Support Lead", "profileUrl": "https://i.pravatar.cc/100?img=23" } },
                { "id": "e65", "title": "Meeting at Online", "start": "2025-09-17T15:00:00", "end": "2025-09-17T15:45:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e66", "title": "Meeting at Head Office", "start": "2025-09-17T09:00:00", "end": "2025-09-17T10:00:00", "extendedProps": { "userId": "p_n", "name": "Person N", "unit": "Leadership", "position": "CFO", "profileUrl": "https://i.pravatar.cc/100?img=24" } },
                { "id": "e67", "title": "Meeting at Raffles", "start": "2025-09-17T10:30:00", "end": "2025-09-17T11:15:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e68", "title": "Meeting at Head Office", "start": "2025-09-17T13:30:00", "end": "2025-09-17T14:30:00", "extendedProps": { "userId": "p_d", "name": "Person D", "unit": "Engineering", "position": "Frontend Engineer", "profileUrl": "https://i.pravatar.cc/100?img=14" } },
                { "id": "e69", "title": "Meeting at Head Office", "start": "2025-09-18T15:00:00", "end": "2025-09-18T15:45:00", "extendedProps": { "userId": "p_n", "name": "Person N", "unit": "Leadership", "position": "CFO", "profileUrl": "https://i.pravatar.cc/100?img=24" } },
                { "id": "e70", "title": "Meeting at Sun & Moon", "start": "2025-09-18T09:00:00", "end": "2025-09-18T10:00:00", "extendedProps": { "userId": "p_s", "name": "Person S", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=29" } },
                { "id": "e71", "title": "Meeting at Online", "start": "2025-09-18T10:30:00", "end": "2025-09-18T11:15:00", "extendedProps": { "userId": "p_i", "name": "Person I", "unit": "Comms", "position": "Comms Manager", "profileUrl": "https://i.pravatar.cc/100?img=19" } },
                { "id": "e72", "title": "Meeting at Raffles", "start": "2025-09-18T13:30:00", "end": "2025-09-18T14:30:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e73", "title": "Meeting at Head Office", "start": "2025-09-19T15:00:00", "end": "2025-09-19T15:45:00", "extendedProps": { "userId": "p_r", "name": "Person R", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=28" } },
                { "id": "e74", "title": "Meeting at Online", "start": "2025-09-19T09:00:00", "end": "2025-09-19T10:00:00", "extendedProps": { "userId": "p_d", "name": "Person D", "unit": "Engineering", "position": "Frontend Engineer", "profileUrl": "https://i.pravatar.cc/100?img=14" } },
                { "id": "e75", "title": "Meeting at Online", "start": "2025-09-19T10:30:00", "end": "2025-09-19T11:15:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e76", "title": "Meeting at Head Office", "start": "2025-09-19T13:30:00", "end": "2025-09-19T14:30:00", "extendedProps": { "userId": "p_b", "name": "Person B", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=12" } },
                { "id": "e77", "title": "Meeting at Sofitel", "start": "2025-09-20T15:00:00", "end": "2025-09-20T15:45:00", "extendedProps": { "userId": "p_r", "name": "Person R", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=28" } },
                { "id": "e78", "title": "Meeting at Head Office", "start": "2025-09-20T09:00:00", "end": "2025-09-20T10:00:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e79", "title": "Meeting at Sun & Moon", "start": "2025-09-20T10:30:00", "end": "2025-09-20T11:15:00", "extendedProps": { "userId": "p_p", "name": "Person P", "unit": "Business Dev", "position": "Partnerships Lead", "profileUrl": "https://i.pravatar.cc/100?img=26" } },
                { "id": "e80", "title": "Meeting at Head Office", "start": "2025-09-20T13:30:00", "end": "2025-09-20T14:30:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e81", "title": "Meeting at Sun & Moon", "start": "2025-09-21T15:00:00", "end": "2025-09-21T15:45:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e82", "title": "Meeting at Sun & Moon", "start": "2025-09-21T09:00:00", "end": "2025-09-21T10:00:00", "extendedProps": { "userId": "p_i", "name": "Person I", "unit": "Comms", "position": "Comms Manager", "profileUrl": "https://i.pravatar.cc/100?img=19" } },
                { "id": "e83", "title": "Meeting at Online", "start": "2025-09-21T10:30:00", "end": "2025-09-21T11:15:00", "extendedProps": { "userId": "p_b", "name": "Person B", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=12" } },
                { "id": "e84", "title": "Meeting at Head Office", "start": "2025-09-21T13:30:00", "end": "2025-09-21T14:30:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e85", "title": "Meeting at Online", "start": "2025-09-22T15:00:00", "end": "2025-09-22T15:45:00", "extendedProps": { "userId": "p_d", "name": "Person D", "unit": "Engineering", "position": "Frontend Engineer", "profileUrl": "https://i.pravatar.cc/100?img=14" } },
                { "id": "e86", "title": "Meeting at Sun & Moon", "start": "2025-09-22T09:00:00", "end": "2025-09-22T10:00:00", "extendedProps": { "userId": "p_o", "name": "Person O", "unit": "Customer Success", "position": "CSM", "profileUrl": "https://i.pravatar.cc/100?img=25" } },
                { "id": "e87", "title": "Meeting at Online", "start": "2025-09-22T10:30:00", "end": "2025-09-22T11:15:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e88", "title": "Meeting at Online", "start": "2025-09-22T13:30:00", "end": "2025-09-22T14:30:00", "extendedProps": { "userId": "p_s", "name": "Person S", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=29" } },
                { "id": "e89", "title": "Meeting at Head Office", "start": "2025-09-23T15:00:00", "end": "2025-09-23T15:45:00", "extendedProps": { "userId": "p_d", "name": "Person D", "unit": "Engineering", "position": "Frontend Engineer", "profileUrl": "https://i.pravatar.cc/100?img=14" } },
                { "id": "e90", "title": "Meeting at Head Office", "start": "2025-09-23T09:00:00", "end": "2025-09-23T10:00:00", "extendedProps": { "userId": "p_g", "name": "Person G", "unit": "Data", "position": "Data Engineer", "profileUrl": "https://i.pravatar.cc/100?img=17" } },
                { "id": "e91", "title": "Meeting at Online", "start": "2025-09-23T10:30:00", "end": "2025-09-23T11:15:00", "extendedProps": { "userId": "p_q", "name": "Person Q", "unit": "Security", "position": "Security Analyst", "profileUrl": "https://i.pravatar.cc/100?img=27" } },
                { "id": "e92", "title": "Meeting at Head Office", "start": "2025-09-23T13:30:00", "end": "2025-09-23T14:30:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e93", "title": "Meeting at Head Office", "start": "2025-09-24T15:00:00", "end": "2025-09-24T15:45:00", "extendedProps": { "userId": "p_l", "name": "Person L", "unit": "Marketing", "position": "PR Lead", "profileUrl": "https://i.pravatar.cc/100?img=22" } },
                { "id": "e94", "title": "Mission to Battambang", "start": "2025-09-24T09:00:00", "end": "2025-09-24T10:00:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e95", "title": "Meeting at Raffles", "start": "2025-09-24T10:30:00", "end": "2025-09-24T11:15:00", "extendedProps": { "userId": "p_r", "name": "Person R", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=28" } },
                { "id": "e96", "title": "Meeting at Sun & Moon", "start": "2025-09-24T13:30:00", "end": "2025-09-24T14:30:00", "extendedProps": { "userId": "p_m", "name": "Person M", "unit": "Support", "position": "Support Lead", "profileUrl": "https://i.pravatar.cc/100?img=23" } },
                { "id": "e97", "title": "Meeting at Hyatt", "start": "2025-09-25T15:00:00", "end": "2025-09-25T15:45:00", "extendedProps": { "userId": "p_t", "name": "Person T", "unit": "IT", "position": "SysAdmin", "profileUrl": "https://i.pravatar.cc/100?img=30" } },
                { "id": "e98", "title": "Meeting at Online", "start": "2025-09-25T09:00:00", "end": "2025-09-25T10:00:00", "extendedProps": { "userId": "p_j", "name": "Person J", "unit": "Finance", "position": "Accountant", "profileUrl": "https://i.pravatar.cc/100?img=20" } },
                { "id": "e99", "title": "Meeting at Online", "start": "2025-09-25T10:30:00", "end": "2025-09-25T11:15:00", "extendedProps": { "userId": "p_e", "name": "Person E", "unit": "Design", "position": "UX Designer", "profileUrl": "https://i.pravatar.cc/100?img=15" } },
                { "id": "e100", "title": "Mission to Siem Reap", "start": "2025-09-25T10:30:00", "end": "2025-09-27T11:15:00", "extendedProps": { "userId": "p_l", "name": "Person L", "unit": "Marketing", "position": "PR Lead", "profileUrl": "https://i.pravatar.cc/100?img=22" } }
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
