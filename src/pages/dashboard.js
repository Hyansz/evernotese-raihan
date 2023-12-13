import styles from "@/styles/reglog.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  

export default function login() {

  return (
    <div className={styles.font}>
    
      <div style={{
        display: "flex",
        gap: "20px",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
      }}>
        <div>
            <p>Buat notes</p>
            <a href="/createNotes">click</a>
        </div>

        <div>
            <p>Lihat semua notes</p>
            <a href="/listNotes">click</a>
        </div>

      </div>

    </div>
  );
}
