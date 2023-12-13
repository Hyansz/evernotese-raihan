import { connectionDB } from "@/db/mongodb";
import User from "@/models/users";
import Note from "@/models/notes";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

connectionDB();

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: true, message: 'Salah method' });
        }

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({ error: true, message: 'Tidak ada token' });
        }

        const user = await User.findOne({ token });
        console.log('user: ', user);
        if (!user || !user.name) {
            deleteCookie('token', { req, res });
            return res.status(400).json({
                error: true,
                message: 'token tidak valid',
            });
        }

        const { title, note } = req.body;

        if (title.length < 3 || title.length >= 60) {
            return res.status(400).json({
                error: true,
                message: 'title harus diantar 3 sampai 60 karakter',
            });
        }

        if (note.length < 0 || note.length >= 2000) {
            return res.status(400).json({
                error: true,
                message: 'note tidak boleh lebih dari 2000 karakter',
            });
        }

        if (!title || !note) {
            return res.status(400).json({ error: true, message: 'Berkas yang anda kirimkan belum lengkap' });
        }

        const userId = uuidv4();

        const today = new Date();
        const formattedDate = format(today, 'yyyy-MM-dd HH:mm:ss');

        const data = {
            title,
            note,
            userId,
            date: formattedDate
        };

        const notes = new Note(data);
        await notes.save();

        return res.status(201).json({ message: 'Data sudah berhasil diinputkan' });

    } catch (err) {
        console.log('error: ', err)
        res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
    }
}
