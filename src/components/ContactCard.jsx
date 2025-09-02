import { IoMdContact } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import useDisclouse from "../hooks/useDisclouse";
import ModalForm from "./ModalForm";
import { toast } from "react-toastify";

export const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  async function deleteContact(id) {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast("🗑️Contact deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-blue-light m-4 flex items-center justify-between rounded-lg p-2">
        <div className="flex items-center gap-4">
          <IoMdContact className="text-4xl text-white" />
          <div className="text-white">
            <h2 className="text-[16px] font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-3 text-white">
          <FaEdit className="cursor-pointer text-[20px]" onClick={onOpen} />
          <FaTrash
            className="cursor-pointer text-[20px]"
            onClick={() => deleteContact(contact.id)}
          />
        </div>
      </div>
      <ModalForm
        isUpdate
        contact={contact}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </>
  );
};
