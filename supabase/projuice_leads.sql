create table if not exists public.projuice_leads (
  id text primary key,
  name text not null,
  email text not null,
  organisation text,
  segment text not null default 'General enquiry',
  flavour text not null default 'Mixed range',
  message text not null,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Qualified', 'Archived')),
  created_at timestamptz not null default now()
);

create index if not exists projuice_leads_created_at_idx on public.projuice_leads (created_at desc);
create index if not exists projuice_leads_status_idx on public.projuice_leads (status);
