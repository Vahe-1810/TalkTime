import { VIDEO_CALL_URL } from "@constants/common";
import { db } from "@fb";
import { IMeet } from "@tps/type";
import { doc, updateDoc } from "firebase/firestore";

export const joinToCall = async ({ meetId, id }: IMeet) => {
  const myid = meetId?.split(id)[0];

  const width = 800;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const options = `width=${width},height=${height},left=${left},top=${top}`;

  try {
    await fetch(VIDEO_CALL_URL + "id", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: meetId, type: "answer" }),
    }).then(r => {
      console.log("success to join!", r);
    });
  } catch (error) {
    console.log(error);
  }
  const wnd = window.open("https://video-call-a4a57.web.app/", "_blank", options);

  const clearCall = async () => {
    if (wnd && wnd.closed && id && myid) {
      await updateDoc(doc(db, "users", id), {
        calling: {
          isCall: false,
          meetId: null,
          type: null,
          caller: null,
        },
      });

      await updateDoc(doc(db, "users", myid), {
        calling: {
          isCall: false,
          meetId: null,
          type: null,
          caller: null,
        },
      });

      window.removeEventListener("message", clearCall);
    }
  };

  window.addEventListener("message", clearCall);
};
