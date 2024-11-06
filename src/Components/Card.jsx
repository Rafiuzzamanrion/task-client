import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import { SiBookstack } from "react-icons/si";
import { BsBookshelf } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Card = ({ title, color }) => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [attachmentCount, setAttachmentCount] = useState(0);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [isFileListModalOpen, setIsFileListModalOpen] = useState(false);

  useEffect(() => {
    const fetchAttachmentCount = async () => {
      try {
        const response = await axios.get(
          "https://seo-page1-task-server.vercel.app/api/attachments/count"
        );
        setAttachmentCount(response.data.count);
      } catch (error) {
        console.error("Error fetching attachment count:", error);
      }
    };

    const fetchUploadedFiles = async () => {
      try {
        const response = await axios.get(
          "https://seo-page1-task-server.vercel.app/api/attachments"
        );
        setUploadedFiles(response.data); // Store uploaded files to display in the list
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    fetchAttachmentCount();
    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      await axios.post(
        "https://seo-page1-task-server.vercel.app/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Attachment uploaded successfully!");
      setFiles([]);
      // Fetch updated count and list of files after upload
      const countResponse = await axios.get(
        "https://seo-page1-task-server.vercel.app/api/attachments/count"
      );
      setAttachmentCount(countResponse.data.count);
      const filesResponse = await axios.get(
        "https://seo-page1-task-server.vercel.app/api/attachments"
      );
      setUploadedFiles(filesResponse.data);
      setIsAttachmentModalOpen(false);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="space-y-4 bg-base-200 p-3">
      <Toaster />
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <h1
            className={`w-7 h-7 rounded-tl-full rounded-bl-full ${
              color ? `${color}` : "bg-blue-400"
            }`}
          ></h1>
          <h1>{title}</h1>
        </div>
        <h1 className="mx-2 m-1 px-2 p-1 bg-base-100 shadow-2xl">0</h1>
      </div>

      {/* Card */}
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="h-[170px] space-y-4 p-2 py-5 rounded-md bg-base-100"
          >
            <div className="flex justify-between text-sm">
              <div className="flex gap-2 items-center">
                <img src={image1} className="w-8 h-8 rounded-full" alt="" />
                <h1>Client Name</h1>
              </div>
              <div className="flex gap-2 items-center">
                <img src={image2} className="w-8 h-8 rounded-full" alt="" />
                <h1>Sadik Istiak</h1>
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <h1 className="flex gap-3 items-center">
                <SiBookstack /> Lorem ipsum dolor sit amet...
              </h1>
              <h1 className="flex gap-1 items-center rounded-md p-1 bg-base-200">
                <BsBookshelf /> 1/2
              </h1>
            </div>
            <div className="flex justify-between items-center text-sm">
              <img src={image1} className="w-6 h-6 rounded-full" alt="" />
              <img src={image2} className="w-6 h-6 rounded-full" alt="" />
              <h1 className="bg-base-200 p-1 rounded-full">12+</h1>
              <h1 className="flex items-center gap-1">
                <LuMessagesSquare />
                15
              </h1>
              <div className="flex items-center">
                <button
                  className="btn btn-ghost btn-xs tooltip"
                  data-tip="Click here to add an attachment"
                  onClick={() => setIsAttachmentModalOpen(true)}
                >
                  <FaLink />
                </button>
                <button
                  className="btn btn-ghost btn-xs tooltip"
                  data-tip="Click here to see attachment list"
                  onClick={() => setIsFileListModalOpen(true)}
                >
                  {attachmentCount}
                </button>
              </div>
              <h1 className="flex items-center gap-1">
                <SlCalender />
                30-12-2022
              </h1>
            </div>
          </div>
        ))}

      {/* Attachment Modal */}
      {isAttachmentModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsAttachmentModalOpen(false)}
            >
              ✕
            </button>
            <h1 className="my-3">
              Please select attachments (Multiple file allowed)
            </h1>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <div className="flex justify-end">
              <button onClick={handleUpload} className="btn btn-info">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
      {/* File List Modal */}
      {isFileListModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Attachment List</h3>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  {file.originalName} - Extension: {file.extension}
                </li>
              ))}
            </ul>
            <div className="modal-action">
              <button
                onClick={() => setIsFileListModalOpen(false)}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
