import type { SupabaseClient } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';
import type { CalendarEvent } from './types';

export const contact_json = writable("");
export const supabase: Writable<SupabaseClient> = writable();