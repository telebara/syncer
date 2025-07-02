"use client"

import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { formatRoomCode } from "../../../utils";
import Avatar from "../../components/Avatar/Avatar";
import Navbar from "../../components/Navbar/Navbar";

const RoomPage = ({ params }: { params: { code: string } }) => {
  const router = useRouter();
  const roomCode = formatRoomCode(params.code);

  return (
    <div>
      <Navbar>
        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Назад
        </button>
        <div className={styles.roomCode}>{roomCode}</div>
        <Avatar size={48} />
      </Navbar>
      {/* Room content will go here */}
    </div>
  );
};

export default RoomPage;
