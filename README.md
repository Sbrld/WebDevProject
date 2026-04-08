🔍 FindIt — Lost & Found Web Application
---
📌 Project Description
FindIt is a full-stack web application built with Angular (frontend) and Django + Django REST Framework (backend). The application allows users to post lost or found items, browse announcements, submit claims, and track the return process in real-time.
---
🚀 Features
---
👤 User Features

* User login and authentication (JWT)
* Browse lost and found items with filters
* Publish new lost/found announcements (with photo)
* Submit claims for found items
* View and manage own items and claims
* Track return status
---
🛠️ Management Features

* Create, update, and delete own announcements
* Approve or reject claims
* Mark items as returned
* View all active announcements
---
👥 Group Members

* Sabyrkhanov Aldair
* Zhazykbayeva Tomiris
* Bakhtybay Zhengis
---
🎯 Goal
The goal of this project is to build a fully functional lost & found platform that satisfies all course requirements and demonstrates practical skills in Angular and Django.
---
Detailed Description
Models (Django)

User — standard (author of ads and requests)

Item

title
description
category (phone / keys / document / clothes / other)
status (Lost / Found / Claimed / Returned)
location
date
image (ImageField + Pillow)
is_active

Claim

item (FK)
user (FK)
description (proof that the item is theirs)

Category (optional, if not choices)

Message (chat for the request)

claim (or item)
sender
text

Relationships:

Item → User
Claim → Item, User
Message → Claim / Item
(optional) Item → Category
A custom manager can be created (e.g.: lost_items(), found_items())
Backend (Django REST)
CRUD for Item
Item/Claim are automatically bound to request.user
JWT auth (login / register / logout)
Serializers:
2 regular (e.g., search / claim)
2 ModelSerializer (Item, Claim)
Views:
2 FBV (@api_view)
2 CBV (APIView)
CORS (for Angular)
Postman collection
Frontend (Angular)

Pages:

Home — list of ads + filters

Login / Register

Item Detail — info + Claim button

My Items / My Claims

Create Item

Forms (ngModel):

Login / Register
Create / Edit Item
Submit Claim

Actions (click → API):

Create ad
Submit claim
Confirm / Reject
Mark as returned
(additional) Search / Filter

Technical:

One service (HttpClient)
Interceptor (JWT)
Error handling
@if for roles/statuses
Basic responsive CSS
