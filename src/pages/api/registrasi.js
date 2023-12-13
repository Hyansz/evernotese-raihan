import User from "@/models/users"
import {connectionDB} from "@/db/mongodb"

connectionDB();

export default async function handler(req, res) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: true, message: 'mehtod tidak diijinkan' });
      }

      const { name, username, password } = req.body;

      if (!name) {
        return res.status(400).json({ error: true, message: 'tidak ada Nama' });
      }

      if (!username) {
        return res.status(400).json({ error: true, message: 'tidak ada username' });
      }

      if (!password) {
        return res.status(400).json({ error: true, message: 'tidak ada Password' });
      }

      // lengkapi data yg kurang

      const data = { name, username, password };

      // jika sudah sesuai simpan
      const Users = new User(data);
      await Users.save();

      // kasih tahu client (hanya data yg diperbolehkan)
      return res.status(201).json({ name: Users.name });
    } catch (error) {
      console.log('error:', error);
      res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
    }
}