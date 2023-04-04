import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

export default function DeleteDiscussion({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this Discussion?")) {
      try {
        await deleteDoc(doc(db, "Discussions", id));
        toast("Discussion deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting Discussion", { type: "error" });
        console.log(error);
      }
    }
  };
  return (
    <div>
      <i
        className="fa fa-times"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
