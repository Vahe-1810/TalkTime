import { VIDEO_CALL_URL } from "@constants/common";

type TypeData = {
  isCall: boolean;
  meetId: string;
};

export const joinToCall = async ({ meetId }: TypeData) => {
  console.log(meetId);
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

  window.open("https://video-call-a4a57.web.app/", "_blank", options);
};
