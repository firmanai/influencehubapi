note :
url bisa di sesuaikan
db di connections

GET /:
Deskripsi: Endpoint utama.
Contoh Penggunaan: http://localhost:3000/

POST /register
Deskripsi: Register User.
Contoh Penggunaan: http://localhost:3000/register
Body Request:
json
Copy code
{
  "email": "ikhsanafatur11232r@gmail.com",
  "password": "firman"
}

POST /login
Deskripsi: Register User.
Contoh Penggunaan: http://localhost:3000/login
Body Request:
json
Copy code
{
  "email": "ikhsanafatur11232r@gmail.com",
  "password": "firman"
}

GET /kol:
Deskripsi: Mendapatkan daftar semua kol (influencer).
Contoh Penggunaan: http://localhost:3000/kol

GET /kol/:ig:
Deskripsi: Mencari kol berdasarkan ig.
Contoh Penggunaan: http://localhost:3000/kol/firman.ai

GET /find:
Deskripsi: Mencari kol berdasarkan range followers.
Contoh Penggunaan: http://localhost:3000/find?minFollowers=100&maxFollowers=2000

POST /kol:
Deskripsi: Menambahkan kol baru.
Contoh Penggunaan: http://localhost:3000/kol/
Body Request:
json
Copy code
{
    "ig": "test",
    "name": "test test",
    "er": 2,
    "followers": 100000,
    "post": 500
}

PUT /kol/:ig:
Deskripsi: Mengedit data kol tanpa mengganti ig.
Contoh Penggunaan: http://localhost:3000/kol/test
Body Request:
json
Copy code
{
    "name": "Nama Baru",
    "er": 4,
    "followers": 150000,
    "post": 500
}

PUT /kol/:oldIg/:newIg:
Deskripsi: Mengedit data kol beserta ig-nya.
Contoh Penggunaan: http://localhost:3000/kol/test/newigtest
Body Request:
json
Copy code
{
    "name": "Nama Baru",
    "er": 0.002,
    "followers": 120000,
    "post": 150
}

DELETE /kol/:ig:
Deskripsi: Menghapus kol.
Contoh Penggunaan: http://localhost:3000/kol/test# test
# test
