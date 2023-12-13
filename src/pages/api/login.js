import { generateRandomToken } from "@/utils/randomToken";
import {connectionDB} from "@/db/mongodb"
import User from "@/models/users"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

connectionDB();

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405) .json({ error: true, message: 'mehtod tidak diijinkan' });
    }
    
    const { name,password,isKeepLogin } = req.body;

    if (!name) {
      return res.status(400).json({ error: true, message: 'tidak ada name' });
    }

    if (!password) {
      return res.status(400).json({ error: true, message: 'tidak ada Password' });
    }

    // cek apakah user ada
    const user = await User.findOne({ name, password });

    console.log('user: ', user);

    if (!user || !user.name) {
      return res.status(400).json({
        error: true,
        message: 'user tidak ditemukan',
      });
    }

    // lengkapi data yg kurang
    const token = generateRandomToken(10);

    if (isKeepLogin) {
      setCookie('token', token, { req, res, maxAge: 60 * 60 * 24 * 30 }); // 1 bulan
    }

    // jika sudah sesuai simpan
    const users = await User.findOneAndUpdate(
      { name, password },
      { token },
      { new: true }
    );
    console.log('users after update: ', users);

    // kasih tahu client (hanya data yg diperbolehkan)
    return res.status(200).json({ token, isKeepLogin: !!isKeepLogin });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
  }
}