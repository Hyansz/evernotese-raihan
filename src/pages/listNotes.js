import styles from "@/styles/reglog.module.css";
import { getCookie } from 'cookies-next';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  
import { getDataApi, postDataApi } from '@/utils/api';

export default function dashboard() {
  const router = useRouter();
  const [notes, SetNotes] = useState({title:'',note:''});
  const [allUsers, setAllUsers] = useState([]);

  const handleRegistration = async () => {
          let myToken = '';
          if (localStorage.getItem('keepLogin') === 'true') {
            myToken = getCookie('token');
          } else {
            sessionStorage.setItem('token', '');
            router.push('/login');
            return;
          }
          if (myToken) {
            const data = { token: myToken };
            await postDataApi(
              '/api/logout',
              data,
              (successData) => {
                router.push('/login');
              },
              (failData) => {
                console.error('Gagal melakukan permintaan:', failData);
                alert('terjadi kesalahan koneksi ' + failData);
              }
            );
          } else {
            router.push('/login');
          }
  }

  useEffect(() => {
    const run = async () => {
      try {
        let myToken = '';
        if (localStorage.getItem('keepLogin') === 'true') {
          myToken = getCookie('token');
        } else {
          myToken = sessionStorage.getItem('token');
        }

        if (myToken) {
          const data = { token: myToken };
          await postDataApi(
            '/api/cekToken',
            data
          );
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log('error: ', error);
      }
    };

    run();
  }, [router]);

  return (
    <div className={styles.font}
      style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        gap:"40px",
        minHeight: "80vh"
      }}
    >

        <div>
        </div>

        <div>
        <span style={{ fontWeight: '700', fontSize: '28px' }}>
            {notes.title}({notes.note})
          </span>
        </div>
        
    </div>
  );
}
