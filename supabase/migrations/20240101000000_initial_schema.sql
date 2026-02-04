-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create school_profile table
create table public.school_profile (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  address text,
  phone text,
  email text,
  logo_url text,
  vision text,
  mission text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create articles table
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  image_url text,
  author_id uuid references public.profiles(id),
  is_published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create announcements table
create table public.announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  importance_level text default 'medium' check (importance_level in ('low', 'medium', 'high')),
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create agendas table
create table public.agendas (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create modules table
create table public.modules (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon_name text,
  path text,
  min_role text default 'user',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.school_profile enable row level security;
alter table public.articles enable row level security;
alter table public.announcements enable row level security;
alter table public.agendas enable row level security;
alter table public.modules enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Policies for school_profile
create policy "School profile is viewable by everyone." on public.school_profile
  for select using (true);

-- Policies for articles
create policy "Published articles are viewable by everyone." on public.articles
  for select using (is_published = true);

create policy "Auth users can view all articles." on public.articles
  for select using (auth.role() = 'authenticated');

-- Policies for announcements
create policy "Active announcements are viewable by everyone." on public.announcements
  for select using (is_active = true);

-- Policies for agendas
create policy "Agendas are viewable by everyone." on public.agendas
  for select using (true);

-- Policies for modules
create policy "Modules are viewable by authenticated users." on public.modules
  for select using (auth.role() = 'authenticated');
