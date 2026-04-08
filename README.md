🔍 FindIt — Lost & Found Web Application
📌 Project Description
-----------------------
FindIt is a full-stack web application (Angular + Django REST) ​​where users post lost/found items, search for them, submit requests, and track returns.
-----------------------
🎯 Goal
-----------------------
To create a full-fledged Lost & Found platform that covers all course requirements (CRUD, auth, API, frontend) and demonstrates practical skills.
-----------------------
🚀 Features
-----------------------
👤 User
Registration / Login (JWT)
View Items (Filters, Search)
Publish Items (with Photos)
Submit a Claim
View your items and claims
Track Status (Lost / Found / Returned)
-----------------------
🛠️ Management
Edit / Delete your items
Approve / Reject claims
Mark an item as Returned
View Active Items
-----------------------
🧩 Models (Django)
-----------------------
User — Standard
-----------------------
Item

title
description
category (choices or FK)
status (Lost / Found / Claimed / Returned)
location
date
image
is_active
user (FK)
-----------------------
Claim

item (FK)
user (FK)
description
-----------------------
Category (optional)
-----------------------
Message

claim / item
sender
text
-----------------------
Relationships:

Item → User
Claim → Item, User
Message → Claim/Item
Item → Category (optional)
custom manager (lost_items, found_items)
⚙️ Backend (Django REST)
CRUD: Item
Claim creation + processing
Auto-binding to request.user
JWT auth
-----------------------
Serializers:

ItemSerializer(ModelSerializer)
ClaimSerializer(ModelSerializer)
SearchSerializer
SimpleClaimSerializer
-----------------------
Views:
-----------------------
FBV:
list of active items
creating a claim
CBV:
Item CRUD
Item detail
CORS
Postman collection
-----------------------
🌐 API Endpoints (plan)
🔐 Auth
POST /api/auth/register/ - registration
POST /api/auth/login/ - receiving JWT
POST /api/auth/logout/
📦 Items
GET /api/items/ — list (with filters: status, category, location)
POST /api/items/ — create a claim
GET /api/items/{id}/ — detail page
PUT /api/items/{id}/ — edit
DELETE /api/items/{id}/ — delete
🙋 Claims
POST /api/items/{id}/claim/ — submit a claim
GET /api/claims/ — my claims
GET /api/claims/{id}/ — details
✅ Claim Actions
POST /api/claims/{id}/approve/ — confirm
POST /api/claims/{id}/reject/ — reject
🔄 Item Status
POST /api/items/{id}/mark-returned/ — mark as Returned
💬 Messages (optional)
GET /api/claims/{id}/messages/
POST /api/claims/{id}/messages/
🖥️ Frontend (Angular)
-----------------------
Pages
Home (list + filters)
Login/Register
Item Detail
My Items / My Claims
Create/Edit Item
-----------------------
Forms (ngModel)
Auth
Item create/edit
Claim submission
-----------------------
Actions (click → API)
Create item
Submit claim
Approve/reject
Mark returned
Search / filter
-----------------------
Technical
One service (HttpClient)
JWT interceptor
Error handling
@if (roles, statuses)
Responsive UI
-----------------------
✨ Additional goals
Search + filters
Color statuses
Moderation (is_active)
Return history
-----------------------
