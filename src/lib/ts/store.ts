import type { SupabaseClient } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export enum NavState {
    None = -1,
    Home = 0,
    About = 1,
    Contact = 2,
}

export const nav_state = writable(NavState.Home);
export const contact_json = writable("");
export const supabase: Writable<SupabaseClient> = writable();