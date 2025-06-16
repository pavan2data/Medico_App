# 🩺 MediCare App — Medication Management Platform

Live Demo (UI Only): [https://meds-buddy-check.lovable.app](https://meds-buddy-check.lovable.app)

## 📌 Overview
MediCare App is a modern, full-stack medication management platform built with **React + TypeScript** for frontend and **Supabase** for backend services. It supports **role-based dashboards** (Patients & Caretakers) and is designed to improve medication adherence through scheduling, tracking, and proof-based logging.

This project was built as part of a 4–6 hour assessment with scalable, production-grade practices in mind.

---

## 🚀 Features

### ✅ Core Functionalities
- 🔐 **User Authentication** (Sign up & Login with Supabase Auth)
- 💊 **Medication Management CRUD** (Name, Dosage, Frequency)
- ✅ **Daily Medication Intake Logging**
- 📅 **Calendar View for Medication Logs**
- 📈 **Adherence Rate Tracker**
- 🔄 **Optimistic UI Updates with React Query**
- 📷 **Image Upload Interface (Planned via Supabase Storage)**
- 🧪 **Basic Testing with Vitest**

### 👥 Role-based Dashboards
- **Patient Dashboard**: Add meds, view logs, mark as taken.
- **Caretaker Dashboard**: (Planned) Real-time monitoring of dependents.

### 🛠️ Stack & Libraries
- React + TypeScript + Vite
- Supabase (Auth, Database, Storage)
- React Query for fetching & caching
- TailwindCSS (UI Styling)
- Vitest for unit testing

---

## 📁 Project Structure

```
├── src/
│   ├── lib/                 # Supabase client
│   ├── hooks/               # Custom React hooks (data fetching, mutations)
│   ├── types/               # Global TypeScript types
│   ├── pages/               # Auth and Dashboard pages
│   └── components/          # UI components
├── .env.example             # Sample env file
├── README.md                # You're here!
```

---

## ⚙️ Supabase Setup Instructions

### 1. Create Project
- Go to [Supabase](https://supabase.com)
- Create a new project
- Get the Project URL and anon key

### 2. Set Environment Variables
Create a `.env` file:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Create `medications` Table
Use SQL editor:
```sql
create table medications (
  id uuid primary key default gen_random_uuid(),
  name text,
  dosage text,
  frequency text,
  taken_dates date[],
  user_id uuid references auth.users(id)
);
```

### 4. Add RLS Policy
```sql
enable row level security on medications;

create policy "User can access own meds" on medications
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### 5. Add Supabase Function
To prevent duplicate dates:
```sql
create or replace function array_append_if_not_exists(arr date[], value date)
returns date[] as $$
begin
  if not value = any(arr) then
    return array_append(arr, value);
  else
    return arr;
  end if;
end;
$$ language plpgsql;
```

---

## 🧪 Testing (Vitest)
To run unit tests:
```bash
npm run test
```

Include basic tests under `src/__tests__/` for medication form and logic.

---

## 🧠 Architecture Choices
- 🔄 **React Query** for normalized cache, background syncing
- 🧩 **Modular Folder Structure** for feature isolation
- 🧼 **Full TypeScript Safety** — no `any`, all types declared
- ⚠️ **Error + Loading State Handling** for API and forms
- 🧠 **Optimistic Updates** to reduce wait time on UI

---

## 📦 Deployment
To deploy:
- Push to GitHub
- Go to [https://vercel.com](https://vercel.com)
- Import the repo
- Add `.env` variables in dashboard
- Deploy 🚀

---

## 💡 Future Improvements
- 👨‍⚕️ Caretaker-patient sync
- 📊 Weekly/Monthly adherence analytics
- 🛎️ Notification reminders
- 🧾 Medication proof uploads
- 🔍 Search & sort medications

---

## 🤝 Contributing
We welcome contributions! Just fork the repo, create a feature branch, and submit a PR.

---

## 👨‍🔬 Created By
- [Pavan Kumar](https://github.com/pavan2data)
- Built for a real-world React + Supabase use case.

---

## 📄 License
Free to use for educational or personal projects.
