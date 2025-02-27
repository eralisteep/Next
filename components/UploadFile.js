import { useState } from "react";
import axios from "axios";

const TELEGRAM_BOT_TOKEN = "7629632078:AAFwGMwD36V1-NyDvLoPhc9ZMrxr2LD96GI";

const getFilePath = async (fileId) => {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
    return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${response.data.result.file_path}`;
  } catch (error) {
    console.error("Ошибка получения пути файла:", error);
    return null;
  }
};

export default function UploadFile({ fileId }) {
  const [filePath, setFilePath] = useState(null);

  const handleGetFile = async () => {
    const path = await getFilePath(fileId);
    setFilePath(path);
  };

  return (
    <div>
      {filePath ? (
        <>
          <p>
            <a href={filePath} target="_blank" rel="noopener noreferrer">
              📥 Скачать файл
            </a>
          </p>
          {filePath.match(/\.(jpeg|jpg|png|gif)$/i) && (
            <img src={filePath} alt="Uploaded File" style={{ maxWidth: "300px", marginTop: "10px" }} />
          )}
        </>
      ) : (
        <button onClick={handleGetFile}>🔍 Загрузить файл</button>
      )}
    </div>
  );
}
