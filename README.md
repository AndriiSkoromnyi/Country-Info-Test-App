# 🌍 Country Info 

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  

A modern **Angular application** for exploring **country information** and **public holidays** worldwide.  
Built with Angular 17+ standalone components and the **Nager.Date API**.

---

## ✨ Features

- 🔎 **Country Search** — instant search through all available countries
- 🎲 **Random Countries Widget** — discover 3 random countries with their next holiday
- 📅 **Holiday Explorer** — view public holidays for any year **(2020–2030)**
- 🌐 **Neighboring Countries** — navigate via clickable chips
- 🎨 **Light & Dark Theme** — minimalistic and responsive UI

---

## 🚀 Development server

Run the local dev server:

```bash
ng serve
```
Navigate to http://localhost:4200/

The app will auto-reload when you change any source files.

---

## ⚙️ Running Tests

Unit Tests
```bash 
ng test
```

End-to-End Tests
```bash 
ng e2e
```

---

## 🌐 Environment Variables
You can configure the API base URL (optional):

```bash 
window.__runtime_env__ = {
NAGER_BASE_URL: 'https://date.nager.at'
};
```

---

## 🗂️ Project Structure

```bash 
src/
├─ app/
│  ├─ home/                  # Home page component
│  ├─ country/               # Country page component
│  ├─ random-countries/      # Random countries widget
│  └─ services/              # API service
├─ styles.css                # Global styles and theming
```

---

## 📝 Usage

1.Search for a country on the Home page.

2.Click a country to view its holidays.

3.Switch years on the Country page.

4.Explore neighboring countries via chips.

5.Check 3 random countries’ next holiday in the Random Countries widget.

---
## 📄 License

This project is for educational/test purposes.

---
