import {connectionDB} from "@/db/mongodb"
import User from "@/models/users"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

connectionDB();

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
          return res.status(405).json({ error: true, message: 'mehtod tidak diijinkan' });
        }
    
        const { token } = req.body;
        
        if (!token) {
          return res.status(400).json({ error: true, message: 'tidak ada token' });
        }
    
        const user = await User.findOne({ token });
        console.log('user: ', user);
    
        if (!user || !user.name) {
          deleteCookie('token', {req,res})
          return res.status(400).json({
            error: true,
            message: 'token tidak valid',
          });
        }
    
        // kasih tahu client (hanya data yg diperbolehkan)
        return res.status(200).json({ name:user.name, username:user.username });
      } catch (error) {
        console.log('error:', error);
        res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
      }
}