# Lost & Found Platform
# 🔍 FindIt

## 👥 Team Members

* Sabyrkhanov Aldair  
* Zhazykbayeva Tomiris
* Bakhtybay Zhengis 

---

## 📌 Project Description

**FindIt** (Lost & Found Platform) is a web application that helps users publish announcements about **lost** or **found** items (phones, keys, documents, backpacks, clothes, etc.).

Other users can search for items by category, location, and date, and submit **claim requests** for return. After the owner confirms the claim, the item is marked as **returned**.

The platform demonstrates real-world usefulness: one user posts “I found something”, another instantly submits a claim — perfect for a live demo during project defense.

This project was developed as part of the **Web Development** course using **Angular** for the frontend and **Django REST Framework** for the backend.

---

## 📌 Project Goals

The main goal of this project is to build a complete full-stack web application that meets all course requirements and aims for **90%+** on the final defense:

* Frontend-backend communication via REST API  
* JWT-based user authentication  
* Full CRUD operations for main entities  
* Clean, responsive UI built with Angular  
* Minimum 5 Django models with ForeignKey relationships  
* All required Angular features (routing, services, forms, HTTP Interceptor, @if/@for, etc.)

---

## ⚙️ Tech Stack

### Frontend

* Angular (TypeScript)  
* HTML5, CSS3  
* Angular Router  
* HttpClient + HTTP Interceptor  
* Template-driven Forms  

### Backend

* Django  
* Django REST Framework (DRF)  

### Database

* SQLite (development)  
* PostgreSQL (optional for production)  

### Authentication

* JWT (JSON Web Token)  

---

## 🚀 Planned Features

### 🔐 Authentication

* User registration  
* User login / logout  
* JWT authentication (token stored in localStorage)  

### 🔍 Items

* Publish new item (Lost / Found)  
* Browse all active items with filters (category, status, location, date)  
* View detailed item page  
* Edit and delete **own** items  
* Image upload (ImageField + Pillow)  

### 📨 Claims

* Submit a claim request for a found item  
* View own claims  
* Owner can approve / reject claims  

### 💬 Messages

* Simple messaging between item owner and claim author  

### 📌 Additional Features

* Item statuses: `Lost`, `Found`, `Claimed`, `Returned`  
* Custom Model Manager (e.g. `Item.objects.active_found_items()`)  
* Full permission protection on all endpoints  

---

## 🔗 API Endpoints (Planned)

* **POST**   `/api/register/`  
* **POST**   `/api/login/`  
* **POST**   `/api/logout/`  

* **GET**    `/api/items/`  
* **POST**   `/api/items/`  
* **GET**    `/api/items/{id}/`  
* **PUT**    `/api/items/{id}/`  
* **DELETE** `/api/items/{id}/`  

* **GET**    `/api/claims/`  
* **POST**   `/api/claims/`  
* **PUT**    `/api/claims/{id}/` (approve/reject)  

* **GET**    `/api/messages/`  
* **POST**   `/api/messages/`  

---

## 🛠 Installation & Setup

### Frontend

```bash
cd frontend
npm install
ng serve
```

### Backend
```bash
pip install -r requirements.txt
```
