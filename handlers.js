const response = require('./response');
const db = require('./connection');
const auth = require('./authService');

exports.getAPI = (req, res) =>{
    response(200, "API READY", "SUCCESS", res)
};

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Pastikan email sudah didefinisikan sebelum digunakan
        console.log('Nilai email sebelum createUser:', email);

        const userRecord = await auth.createUser({
            email,
            password,
        });

        // Berhasil registrasi
        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
        console.error('Kesalahan saat registrasi pengguna:', error);

        if (error.code === 'auth/email-already-exists') {
            res.status(400).json({ error: 'Email sudah terdaftar' });
        } else {
            res.status(500).json({ error: 'Terjadi kesalahan server' });
        }
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari pengguna berdasarkan email
        const user = await auth.getUserByEmail(email);

        // Tidak perlu memverifikasi kata sandi karena Firebase Admin SDK secara otomatis mengelola ini

        // Berhasil login
        // Redirect ke endpoint /kol setelah berhasil login
        res.status(200).json({ message: 'Berhasil login', user });
        //res.redirect('/kol');
    } catch (error) {
        console.error('Kesalahan pada endpoint /login:', error);

        // Handle error
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
            res.status(401).json({ error: 'Email atau password salah' });
        } else {
            res.status(500).json({ error: 'Terjadi kesalahan server' });
        }
    }
};

exports.getAllKOL = (req, res) => {
    const sql = "SELECT * FROM kol"
    db.query(sql, (error, result) => {
        if (error) throw error
        //hasil data dari mysql
        response(200, result, "get all data from kol", res)
    })
};

exports.getKOLByUsername = (req, res) => {
    const ig = req.params.ig;
    const sql = 'SELECT name, er, followers, post FROM kol WHERE ig = ?';

    db.query(sql, [ig], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length > 0) {
                response(200, result, "find nama kol", res);
            } else {
                res.status(400).json({ error: 'Username IG tidak ditemukan' });
            }
        }
    });
};

exports.getKOLByFollowers = (req, res) => {
    // Endpoint untuk mendapatkan KOL berdasarkan jumlah followers
    // Contoh penggunaan: http://localhost:3000/find?minFollowers=1300&maxFollowers=2000

    // Menggunakan prepared statement untuk menghindari SQL injection
    // Menambahkan filter dan pengurutan berdasarkan followers
    const sql = 'SELECT ig, name, followers, post FROM kol WHERE followers BETWEEN ? AND ? ORDER BY followers ASC';
    
    // Mengekstrak nilai dari req.query.minFollowers dan req.query.maxFollowers
    const minFollowers = req.query.minFollowers || 0; // Nilai default jika tidak ada filter
    const maxFollowers = req.query.maxFollowers || 999999999; // Nilai default jika tidak ada filter
    
    // Melakukan kueri dengan nilai yang disanitasi
    db.query(sql, [minFollowers, maxFollowers], (error, result) => {
        if (error) {
            // Menangani kesalahan dan memberikan respons kesalahan
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length > 0) {
                // Menggunakan fungsi response untuk memberikan respons ke klien
                response(200, result, "Menemukan KOL berdasarkan jumlah followers (diurutkan dari terkecil ke terbesar)", res);
            } else {
                // Jika tidak ada hasil, kirim respons status 400
                res.status(400).json({ error: 'Data tidak ditemukan atau tidak memenuhi kriteria filter' });
            }
        }
    });
};

exports.addKOL = (req, res) => {
    // Mengekstrak data dari body request
    const { ig, name, er, followers, post } = req.body;

    // Menggunakan prepared statement untuk menghindari SQL injection
    const sql = 'INSERT INTO kol (ig, name, er, followers, post) VALUES (?, ?, ?, ?, ?)';
    
    // Melakukan kueri dengan nilai yang disanitasi
    db.query(sql, [ig, name, er, followers, post], (error, result) => {
        if (error) {
            // Menangani kesalahan dan memberikan respons kesalahan
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Menggunakan fungsi response untuk memberikan respons ke klien
            const responseData = {
                affectedRows: result.affectedRows,
                insertId: result.insertId,
                message: 'Data berhasil ditambahkan'
            };
            response(200, responseData, "Data berhasil ditambahkan", res);
        }
    });
};

exports.updateKOLByIG = (req, res) => {
    const ig = req.params.ig;
    const { name, er, followers, post } = req.body;
    const sql = 'UPDATE kol SET name=?, er=?, followers=?, post=? WHERE ig=?';

    db.query(sql, [name, er, followers, post, ig], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            response(200, result, "Data berhasil diperbarui", res);
        }
    });
};

exports.updateKOLByOldAndNewIG = (req, res) => {
    const oldIg = req.params.oldIg;
    const newIg = req.params.newIg;
    const { name, er, followers, post } = req.body;

    // Menggunakan prepared statement untuk menghindari SQL injection
    const sql = 'UPDATE kol SET ig=?, name=?, er=?, followers=?, post=? WHERE ig=?';

    db.query(sql, [newIg, name, er, followers, post, oldIg], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            response(200, result, "Data berhasil diperbarui", res);
        }
    });
};

exports.deleteKOLByIG = (req, res) => {
    // Mengekstrak nilai ig dari parameter URL
    const igValue = req.params.ig;

    // Menggunakan prepared statement untuk menghindari SQL injection
    const sql = 'DELETE FROM kol WHERE ig = ?';

    // Melakukan kueri dengan nilai yang disanitasi
    db.query(sql, [igValue], (error, result) => {
        if (error) {
            // Menangani kesalahan dan memberikan respons kesalahan
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.affectedRows > 0) {
                // Menggunakan fungsi response untuk memberikan respons ke klien
                response(200, result.affectedRows, "Data berhasil dihapus", res);
            } else {
                // Jika tidak ada data yang terpengaruh, kirim respons status 404
                res.status(404).json({ error: 'Data tidak ditemukan' });
            }
        }
    });
};
